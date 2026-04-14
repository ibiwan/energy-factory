import useHeatStore from '../store/heatStore'
import usePowerStore from '../store/powerStore'
import useUpgradeStore from '../store/upgradeStore'

const NEIGHBORS = [[0, 0], [-1, 0], [1, 0], [0, -1], [0, 1]]
const ORTHOGONAL = [[-1, 0], [1, 0], [0, -1], [0, 1]]

function parseId(id) {
  const [x, y] = id.split('-').map(Number)
  return [x, y]
}

function countPulses(id, entities) {
  const [x, y] = parseId(id)
  let total = 0
  for (const [dx, dy] of NEIGHBORS) {
    const nid = `${x + dx}-${y + dy}`
    const neighbor = entities[nid]
    if (!neighbor || !neighbor.life || neighbor.life <= 0 || !neighbor.pulses) continue
    const isSelf = dx === 0 && dy === 0
    total += isSelf ? (neighbor.selfPulses ?? neighbor.pulses) : neighbor.pulses
  }
  return total
}

function countAdjacentReflectors(id, entities) {
  const [x, y] = parseId(id)
  let count = 0
  for (const [dx, dy] of ORTHOGONAL) {
    const n = entities[`${x + dx}-${y + dy}`]
    if (n && n.type === 'reflector' && n.life > 0) count++
  }
  return count
}

function countIncomingPulses(id, entities) {
  // Total pulses arriving at this tile from orthogonal neighbors only
  const [x, y] = parseId(id)
  let total = 0
  for (const [dx, dy] of ORTHOGONAL) {
    const n = entities[`${x + dx}-${y + dy}`]
    if (n && n.life > 0 && n.pulses) total += n.pulses
  }
  return total
}

export function tickEntities(entities) {
  // Pass 1: count pulses for all living canisters, and reflector bonuses
  const pulseCounts = {}
  const reflectorBonuses = {} // canister id → additive power bonus multiplier
  for (const id of Object.keys(entities)) {
    const entity = entities[id]
    if (entity.type === 'canister' && entity.life > 0) {
      pulseCounts[id] = countPulses(id, entities)
      const adjReflectors = countAdjacentReflectors(id, entities)
      reflectorBonuses[id] = adjReflectors * 0.10
    }
  }

  // Snapshot heat before any changes this tick (for Forceful Fission bonus)
  const heatSnapshot = useHeatStore.getState().heat
  const powerMultiplier = useUpgradeStore.getState().getForcefulFissionMultiplier(heatSnapshot)

  // Pass 2: apply canister effects (power + heat generation); drain reflector life
  const updated = {}
  let totalHeatProduced = 0
  let totalPowerActual = 0

  // First drain reflectors by total pulses received this tick
  const reflectorPulsesReceived = {}
  for (const id of Object.keys(entities)) {
    if (entities[id].type === 'reflector' && entities[id].life > 0) {
      reflectorPulsesReceived[id] = countIncomingPulses(id, entities)
    }
  }

  for (const [id, entity] of Object.entries(entities)) {
    if (entity.type === 'canister') {
      if (!entity.life || entity.life <= 0) {
        updated[id] = entity
        continue
      }
      const n = pulseCounts[id] || 0
      const heatProduced = n * n * (entity.heat || 1)
      const reflectorBonus = 1 + (reflectorBonuses[id] || 0)
      const powerProduced = n * entity.power * powerMultiplier * reflectorBonus
      useHeatStore.getState().addHeat(heatProduced)
      const powerActual = usePowerStore.getState().addPower(powerProduced)
      totalHeatProduced += heatProduced
      totalPowerActual += powerActual
      updated[id] = { ...entity, life: entity.life - 1 }
    } else if (entity.type === 'reflector') {
      if (!entity.life || entity.life <= 0) {
        updated[id] = entity
        continue
      }
      const pulsesIn = reflectorPulsesReceived[id] || 0
      const newLife = entity.life - pulsesIn
      updated[id] = newLife <= 0
        ? { type: 'explosion', placedAt: Date.now() }
        : { ...entity, life: newLife }
    } else if (entity.type === 'heatVent') {
      const dissipated = Math.min(entity.currentHeat || 0, entity.dissipation || 0)
      updated[id] = { ...entity, currentHeat: (entity.currentHeat || 0) - dissipated }
    } else {
      updated[id] = entity
    }
  }

  // Pass 3: overage rejection → distribute evenly to capacitors
  let rejection = 0
  const { heat, maxHeat } = useHeatStore.getState()
  if (heat > maxHeat) {
    const overage = heat - maxHeat
    rejection = overage * 0.05
    useHeatStore.getState().addHeat(-rejection)

    const heatAcceptorIds = Object.keys(updated).filter(id => updated[id].heatCapacity != null)
    if (heatAcceptorIds.length > 0) {
      const heatEach = rejection / heatAcceptorIds.length
      for (const id of heatAcceptorIds) {
        const acceptor = updated[id]
        const newHeat = (acceptor.currentHeat || 0) + heatEach
        if (newHeat >= acceptor.heatCapacity) {
          updated[id] = { type: 'explosion', placedAt: Date.now() }
          if (acceptor.powerCapacity) {
            usePowerStore.getState().setMaxPower(
              usePowerStore.getState().maxPower - acceptor.powerCapacity
            )
          }
        } else {
          updated[id] = { ...acceptor, currentHeat: newHeat }
        }
      }
    }
    // else: rejection already subtracted from reactor heat, dissipates
  }

  // Pass 4: heat exchanger equalization among neighbors
  for (const id of Object.keys(entities)) {
    if (entities[id].type !== 'heatExchanger') continue
    if (updated[id]?.type === 'explosion') continue

    const [x, y] = parseId(id)
    const pool = []
    for (const [dx, dy] of ORTHOGONAL) {
      const nid = `${x + dx}-${y + dy}`
      const n = updated[nid]
      if (n && n.heatCapacity != null && n.type !== 'explosion') {
        pool.push({ id: nid, currentHeat: n.currentHeat || 0, heatCapacity: n.heatCapacity, powerCapacity: n.powerCapacity })
      }
    }

    if (pool.length < 2) continue

    const mean = pool.reduce((s, p) => s + p.currentHeat / p.heatCapacity, 0) / pool.length

    const givers = []
    const receivers = []
    for (const p of pool) {
      const pct = p.currentHeat / p.heatCapacity
      if (pct > mean) givers.push({ ...p, surplus: (pct - mean) * p.heatCapacity })
      else if (pct < mean) receivers.push({ ...p, deficit: (mean - pct) * p.heatCapacity })
    }

    if (!givers.length || !receivers.length) continue

    const totalSurplus = givers.reduce((s, p) => s + p.surplus, 0)
    const totalDeficit = receivers.reduce((s, p) => s + p.deficit, 0)
    const heatToMove = Math.min(updated[id].maxDelta || 0, totalSurplus)

    for (const p of givers) {
      const take = (p.surplus / totalSurplus) * heatToMove
      updated[p.id] = { ...updated[p.id], currentHeat: Math.max(0, p.currentHeat - take) }
    }

    for (const p of receivers) {
      const give = (p.deficit / totalDeficit) * heatToMove
      const newHeat = p.currentHeat + give
      if (newHeat >= p.heatCapacity) {
        if (p.powerCapacity) {
          usePowerStore.getState().setMaxPower(
            usePowerStore.getState().maxPower - p.powerCapacity
          )
        }
        updated[p.id] = { type: 'explosion', placedAt: Date.now() }
      } else {
        updated[p.id] = { ...updated[p.id], currentHeat: newHeat }
      }
    }
  }

  // Pass 4b: heat outlet — reactor → each heat-accepting neighbor
  for (const id of Object.keys(entities)) {
    if (entities[id].type !== 'heatOutlet') continue
    const [x, y] = parseId(id)
    const delta = updated[id]?.delta || 16
    for (const [dx, dy] of ORTHOGONAL) {
      const nid = `${x + dx}-${y + dy}`
      const n = updated[nid]
      if (!n || n.heatCapacity == null || n.type === 'explosion') continue
      const transfer = Math.min(delta, useHeatStore.getState().heat)
      if (transfer <= 0) continue
      useHeatStore.getState().addHeat(-transfer)
      const newHeat = (n.currentHeat || 0) + transfer
      if (newHeat >= n.heatCapacity) {
        if (n.powerCapacity) {
          usePowerStore.getState().setMaxPower(
            usePowerStore.getState().maxPower - n.powerCapacity
          )
        }
        updated[nid] = { type: 'explosion', placedAt: Date.now() }
      } else {
        updated[nid] = { ...updated[nid], currentHeat: newHeat }
      }
    }
  }

  // Pass 4c: heat inlet — each heat-accepting neighbor → reactor
  for (const id of Object.keys(entities)) {
    if (entities[id].type !== 'heatInlet') continue
    const [x, y] = parseId(id)
    const delta = updated[id]?.delta || 16
    for (const [dx, dy] of ORTHOGONAL) {
      const nid = `${x + dx}-${y + dy}`
      const n = updated[nid]
      if (!n || n.heatCapacity == null || n.type === 'explosion') continue
      const transfer = Math.min(delta, n.currentHeat || 0)
      if (transfer <= 0) continue
      useHeatStore.getState().addHeat(transfer)
      updated[nid] = { ...updated[nid], currentHeat: (n.currentHeat || 0) - transfer }
    }
  }

  useHeatStore.getState().recordTick(totalHeatProduced, rejection)
  usePowerStore.getState().recordTick(totalPowerActual)

  return updated
}

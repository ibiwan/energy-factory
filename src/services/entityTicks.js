import useHeatStore from '../store/heatStore'
import usePowerStore from '../store/powerStore'

const ORTHOGONAL = [[-1, 0], [1, 0], [0, -1], [0, 1]]
const NEIGHBORS = [[0, 0], ...ORTHOGONAL]

function parseId(id) {
  const [x, y] = id.split('-').map(Number)
  return [x, y]
}

function countPulses(id, entities) {
  const [x, y] = parseId(id)
  let total = 0
  for (const [dx, dy] of NEIGHBORS) {
    const neighbor = entities[`${x + dx}-${y + dy}`]
    if (neighbor && neighbor.life > 0 && neighbor.pulses) {
      total += neighbor.pulses
    }
  }
  return total
}

function countAdjacentLivingCanisters(id, entities) {
  const [x, y] = parseId(id)
  let count = 0
  for (const [dx, dy] of ORTHOGONAL) {
    const neighbor = entities[`${x + dx}-${y + dy}`]
    if (neighbor && neighbor.type === 'canister' && neighbor.life > 0) {
      count++
    }
  }
  return count
}

export function tickEntities(entities) {
  // Pass 1: count received pulses per canister, neighbor heat for batteries
  const pulseCounts = {}
  const batteryNeighborCounts = {}
  for (const id of Object.keys(entities)) {
    const entity = entities[id]
    if (entity.type === 'canister' && entity.life > 0) {
      pulseCounts[id] = countPulses(id, entities)
    }
    if (entity.type === 'battery') {
      batteryNeighborCounts[id] = countAdjacentLivingCanisters(id, entities)
    }
  }

  // Pass 2: apply effects and age
  const updated = {}
  let totalHeatProduced = 0
  let totalPowerActual = 0

  for (const [id, entity] of Object.entries(entities)) {
    // Battery: absorb heat from neighbors
    if (entity.type === 'battery') {
      const adjacentHeat = (batteryNeighborCounts[id] || 0) * 0.5
      const newHeat = (entity.currentHeat || 0) + adjacentHeat
      if (newHeat >= entity.heatCapacity) {
        updated[id] = { type: 'explosion' }
        usePowerStore.getState().setMaxPower(
          usePowerStore.getState().maxPower - (entity.powerCapacity || 0)
        )
      } else {
        updated[id] = { ...entity, currentHeat: newHeat }
      }
      continue
    }

    if (!entity.life || entity.life <= 0) {
      updated[id] = entity
      continue
    }

    const n = pulseCounts[id] || 0
    const heatProduced = n * n * entity.heat
    const powerProduced = n * entity.power

    useHeatStore.getState().addHeat(heatProduced)
    const powerActual = usePowerStore.getState().addPower(powerProduced)

    totalHeatProduced += heatProduced
    totalPowerActual += powerActual

    updated[id] = { ...entity, life: entity.life - 1 }
  }

  useHeatStore.getState().recordTick(totalHeatProduced)
  usePowerStore.getState().recordTick(totalPowerActual)

  return updated
}

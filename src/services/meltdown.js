import useHeatStore from '../store/heatStore'
import usePowerStore from '../store/powerStore'
import useUiStore from '../store/uiStore'

export function dissipateHeat() {
  const heatState = useHeatStore.getState()
  if (heatState.heat > 0) {
    heatState.addHeat(-heatState.dissipationRate)
  }
}

export function applyMeltdown(entities) {
  const { heat, maxHeat, buffer } = useHeatStore.getState()
  if (heat <= maxHeat + buffer) return entities

  let excess = Math.floor(heat - maxHeat - buffer)
  const updated = { ...entities }
  const targetIds = Object.keys(updated).filter(
    (id) => updated[id].type !== 'explosion'
  )

  // Shuffle so destruction is spread around
  for (let i = targetIds.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
      ;[targetIds[i], targetIds[j]] = [targetIds[j], targetIds[i]]
  }

  let heatSpent = 0
  let destroyed = 0
  for (const id of targetIds) {
    if (excess <= 0) break
    const ent = updated[id]
    if (ent.type === 'battery') {
      const newHeat = (ent.currentHeat || 0) + 1
      if (newHeat >= ent.heatCapacity) {
        updated[id] = { type: 'explosion' }
        usePowerStore.getState().setMaxPower(
          usePowerStore.getState().maxPower - (ent.powerCapacity || 0)
        )
        destroyed++
      } else {
        updated[id] = { ...ent, currentHeat: newHeat }
      }
    } else {
      updated[id] = { type: 'explosion' }
      destroyed++
    }
    excess--
    heatSpent++
  }

  if (heatSpent > 0) {
    useHeatStore.getState().addHeat(-heatSpent)
  }

  if (excess > 0 && destroyed >= targetIds.length) {
    useUiStore.getState().triggerMeltdown()
    setTimeout(() => useUiStore.getState().resetMeltdown(), 400)
  }

  return updated
}

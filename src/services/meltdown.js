import useHeatStore from '../store/heatStore'
import useUiStore from '../store/uiStore'
import usePowerStore from '../store/powerStore'

export function dissipateHeat() {
  const heatState = useHeatStore.getState()
  if (heatState.heat > 0) {
    heatState.addHeat(-heatState.dissipationRate)
  }
}

export function applyMeltdown() {
  const { heat, maxHeat } = useHeatStore.getState()
  if (heat > maxHeat * 2) {
    useUiStore.getState().triggerMeltdown()
    setTimeout(() => useUiStore.getState().resetMeltdown(), 400)
    usePowerStore.getState().setMaxPower(100)
    return true
  }
  return false
}

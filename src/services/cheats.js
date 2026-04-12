import useCheatStore, { BASE_DISSIPATION } from '../store/cheatStore'
import useCashStore from '../store/cashStore'
import useHeatStore from '../store/heatStore'

export function applyCheats() {
  const { startCash, fastDissipate } = useCheatStore.getState()

  if (startCash) {
    useCashStore.getState().add(10000)
  }

  if (fastDissipate) {
    useHeatStore.setState({ dissipationRate: BASE_DISSIPATION * 100 })
  }
}

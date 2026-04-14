import { create } from 'zustand'
import useCashStore from './cashStore'

const useUpgradeStore = create((set, get) => ({
  forcefulFission: 0,

  getForcefulFissionCost: () => 10000 * Math.pow(10, get().forcefulFission),

  buyForcefulFission: () => {
    const cost = get().getForcefulFissionCost()
    const { cash, spend } = useCashStore.getState()
    if (cash < cost) {
      useCashStore.getState().flashInsufficient()
      return
    }
    spend(cost)
    set((state) => ({ forcefulFission: state.forcefulFission + 1 }))
  },

  // Returns the power multiplier for current heat level
  getForcefulFissionMultiplier: (heat) => {
    const level = get().forcefulFission
    if (level === 0 || heat < 1) return 1
    return 1 + (level * Math.log10(heat)) / 3 / 100
  },
}))

export default useUpgradeStore

import { create } from 'zustand'

const WINDOW = 4

const useHeatStore = create((set, get) => ({
  heat: 0,
  maxHeat: 1000,
  buffer: 1000,
  delta: 0,
  dissipationRate: 0.1,
  _history: [],

  setHeat: (heat) => set({ heat }),
  setMaxHeat: (maxHeat) => set({ maxHeat }),
  addHeat: (amount) =>
    set((state) => ({
      heat: Math.max(0, state.heat + amount),
    })),
  recordTick: (actual) => {
    const history = [...get()._history, actual].slice(-WINDOW)
    const delta = history.reduce((s, v) => s + v, 0) / history.length
    set({ _history: history, delta })
  },
}))

export default useHeatStore

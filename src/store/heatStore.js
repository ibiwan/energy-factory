import { create } from 'zustand'

const WINDOW = 4

const useHeatStore = create((set, get) => ({
  heat: 0,
  maxHeat: 1000,
  buffer: 1000,
  delta: 0,
  lastRejection: 0,
  dissipationRate: 0.1,
  _history: [],

  setHeat: (heat) => set({ heat }),
  setMaxHeat: (maxHeat) => set({ maxHeat }),
  addHeat: (amount) =>
    set((state) => ({
      heat: Math.max(0, state.heat + amount),
    })),
  recordTick: (heatProduced, rejection = 0) => {
    const { dissipationRate, _history } = get()
    const net = heatProduced - rejection - dissipationRate
    const history = [..._history, net].slice(-WINDOW)
    const delta = history.reduce((s, v) => s + v, 0) / history.length
    set({ _history: history, delta, lastRejection: rejection })
  },
}))

export default useHeatStore

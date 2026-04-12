import { create } from 'zustand'

const WINDOW = 4

const usePowerStore = create((set, get) => ({
  power: 0,
  maxPower: 100,
  delta: 0,
  _history: [],

  setPower: (power) => set({ power }),
  setMaxPower: (maxPower) => set({ maxPower }),
  addPower: (amount) => {
    const state = get()
    const prev = state.power
    const next = Math.min(state.maxPower, Math.max(0, prev + amount))
    set({ power: next })
    return next - prev
  },
  recordTick: (actual) => {
    const history = [...get()._history, actual].slice(-WINDOW)
    const delta = history.reduce((s, v) => s + v, 0) / history.length
    set({ _history: history, delta })
  },
}))

export default usePowerStore

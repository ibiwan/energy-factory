import { create } from 'zustand'

const useTickStore = create((set, get) => ({
  tick: 0,
  running: false,

  increment: () => set((state) => ({ tick: state.tick + 1 })),
  setRunning: (running) => set({ running }),
  reset: () => set({ tick: 0 }),
}))

export default useTickStore

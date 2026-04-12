import { create } from 'zustand'

export const SPEEDS = [
  { label: 'pause', tps: 0 },
  { label: 'play', tps: 1 },
  { label: 'fast', tps: 2 },
  { label: 'fastest', tps: 3 },
]

const useSpeedStore = create((set) => ({
  speedIndex: 1,

  setSpeed: (index) => set({ speedIndex: index }),
}))

export default useSpeedStore

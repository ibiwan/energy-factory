import { create } from 'zustand'
import useHeatStore from './heatStore'

const STORAGE_KEY = 'energy-factory-cheats'
export const BASE_DISSIPATION = 0.1

function loadCheats() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? JSON.parse(saved) : {}
  } catch {
    return {}
  }
}

function saveCheats(state) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({
    startCash: state.startCash,
    fastDissipate: state.fastDissipate,
  }))
}

const defaults = loadCheats()

const useCheatStore = create((set, get) => ({
  startCash: defaults.startCash ?? false,
  fastDissipate: defaults.fastDissipate ?? false,

  toggle: (key) => {
    set((state) => ({ [key]: !state[key] }))
    const state = get()
    saveCheats(state)

    // Apply dissipation change immediately
    if (key === 'fastDissipate') {
      useHeatStore.setState({
        dissipationRate: state.fastDissipate ? BASE_DISSIPATION * 100 : BASE_DISSIPATION,
      })
    }
  },
}))

export default useCheatStore

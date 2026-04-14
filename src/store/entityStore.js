import { create } from 'zustand'
import { tickEntities } from '../services/entityTicks'
import { dissipateHeat, applyMeltdown } from '../services/meltdown'
import useHeatStore from './heatStore'

const useEntityStore = create((set, get) => ({
  entities: {},

  add: (id, entity) =>
    set((state) => ({
      entities: { ...state.entities, [id]: entity },
    })),

  update: (id, updates) =>
    set((state) => ({
      entities: {
        ...state.entities,
        [id]: { ...state.entities[id], ...updates },
      },
    })),

  remove: (id) =>
    set((state) => {
      const { [id]: _, ...rest } = state.entities
      return { entities: rest }
    }),

  tickAll: (tick) => {
    const { entities } = get()
    dissipateHeat()
    const updated = tickEntities(entities)
    const melted = applyMeltdown()

    let next
    if (melted) {
      const now = Date.now()
      next = {}
      for (const id of Object.keys(updated)) {
        next[id] = { type: 'explosion', placedAt: now }
      }
    } else {
      next = updated
    }

    const expiry = Date.now()
    const final = Object.fromEntries(
      Object.entries(next).filter(([, entity]) =>
        !(entity.type === 'explosion' && entity.placedAt && expiry - entity.placedAt >= 5000)
      )
    )

    set({ entities: final })
  },
}))

export default useEntityStore

import { create } from 'zustand'
import { tickEntities } from '../services/entityTicks'
import { dissipateHeat, applyMeltdown } from '../services/meltdown'

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
    let updated = tickEntities(entities)
    updated = applyMeltdown(updated)
    set({ entities: updated })
  },
}))

export default useEntityStore

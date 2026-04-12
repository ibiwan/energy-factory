import { create } from 'zustand'
import { tickEntities } from './entityTicks'
import useHeatStore from './heatStore'
import usePowerStore from './powerStore'
import useUiStore from './uiStore'

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

    // Auto-dissipate heat
    const heatState = useHeatStore.getState()
    if (heatState.heat > 0) {
      heatState.addHeat(-heatState.dissipationRate)
    }

    let updated = tickEntities(entities)

    // Meltdown: excess heat destroys elements
    const { heat, maxHeat, buffer } = useHeatStore.getState()
    if (heat > maxHeat + buffer) {
      let excess = Math.floor(heat - maxHeat - buffer)
      const targetIds = Object.keys(updated).filter(
        (id) => updated[id].type !== 'explosion'
      )

      // Shuffle so destruction is spread around
      for (let i = targetIds.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[targetIds[i], targetIds[j]] = [targetIds[j], targetIds[i]]
      }

      let heatSpent = 0
      let destroyed = 0
      for (const id of targetIds) {
        if (excess <= 0) break
        const ent = updated[id]
        if (ent.type === 'battery') {
          const newHeat = (ent.currentHeat || 0) + 1
          if (newHeat >= ent.heatCapacity) {
            updated[id] = { type: 'explosion' }
            usePowerStore.getState().setMaxPower(
              usePowerStore.getState().maxPower - (ent.powerCapacity || 0)
            )
            destroyed++
          } else {
            updated[id] = { ...ent, currentHeat: newHeat }
          }
        } else {
          updated[id] = { type: 'explosion' }
          destroyed++
        }
        excess--
        heatSpent++
      }

      // Remove spent heat
      if (heatSpent > 0) {
        useHeatStore.getState().addHeat(-heatSpent)
      }

      // If excess remains after destroying all elements, full meltdown
      if (excess > 0 && destroyed >= targetIds.length) {
        useUiStore.getState().triggerMeltdown()
        setTimeout(() => useUiStore.getState().resetMeltdown(), 400)
      }
    }

    set({ entities: updated })
  },
}))

export default useEntityStore

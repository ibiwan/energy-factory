import { create } from 'zustand'

const useUiStore = create((set) => ({
  selectedEntityId: null,
  selectedTool: null,
  overlay: null,
  meltdown: false,

  selectEntity: (id) => set({ selectedEntityId: id }),
  clearSelection: () => set({ selectedEntityId: null }),
  selectTool: (tool) => set({ selectedTool: tool }),
  clearTool: () => set({ selectedTool: null }),
  showOverlay: (overlay) => set({ overlay }),
  closeOverlay: () => set({ overlay: null }),
  triggerMeltdown: () => set({ meltdown: true }),
  resetMeltdown: () => set({ meltdown: false }),
}))

export default useUiStore

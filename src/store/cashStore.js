import { create } from 'zustand'

const useCashStore = create((set) => ({
  cash: 0,
  flash: false,

  add: (amount) => set((state) => ({ cash: state.cash + amount })),
  spend: (amount) => set((state) => ({ cash: state.cash - amount })),
  set: (amount) => set({ cash: amount }),
  flashInsufficient: () => {
    set({ flash: true })
    setTimeout(() => set({ flash: false }), 400)
  },
}))

export default useCashStore

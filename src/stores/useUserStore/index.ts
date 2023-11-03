import create from 'zustand'

type ActionType = 'CLEAR' | 'INCREMENT'

export type UserStore = {
  isAdmin: boolean
  pubKey: string
  setIsAdmin: (val: boolean) => void
  setPubKey: (val: string) => void
  budget: number | null
  setBudget: (val: number | null) => void
  nodeCount: number
  setNodeCount: (action: ActionType) => void
}

const defaultData: Omit<UserStore, 'setIsAdmin' | 'setPubKey' | 'setBudget' | 'setNodeCount'> = {
  isAdmin: false,
  pubKey: '',
  budget: 0,
  nodeCount: 0,
}

export const useUserStore = create<UserStore>((set) => ({
  ...defaultData,
  setIsAdmin: (isAdmin) => set({ isAdmin }),
  setPubKey: (pubKey) => set({ pubKey }),
  setBudget: (budget) => set({ budget }),
  setNodeCount: (action: ActionType) =>
    set((state) => {
      if (action === 'INCREMENT') {
        return { nodeCount: state.nodeCount + 1 }
      }

      return { nodeCount: 0 }
    }),
}))

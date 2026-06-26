import { create } from 'zustand'

interface SuggestionState {
  isLoading: boolean
  setLoading: (loading: boolean) => void
}

export const useSuggestionStore = create<SuggestionState>((set) => ({
  isLoading: false,
  setLoading: (loading) => set({ isLoading: loading }),
}))
import { create } from "zustand";

type SearchState = {
  query: string;
  setQuery: (query: string) => void;
};

// query is what the user searched for.
// an empty text means "show my own IP address"
export const useSearchStore = create<SearchState>()((set) => ({
  query: "",
  setQuery: (query) => set({ query }),
}));
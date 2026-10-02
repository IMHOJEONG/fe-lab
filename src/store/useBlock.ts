import { create } from "zustand";

export const useBlockStore = create<{
  count: number;
}>((set) => ({
  count: 1,
  decrease: () => set((state) => ({ count: state.count + 1 })),
}));

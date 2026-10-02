import { create } from "zustand";

export const useTimeStore = create<{
  time: number;
}>((set) => ({
  time: 10,
  decrease: () => set((state) => ({ time: state.time - 1 })),
}));

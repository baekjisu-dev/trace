import { create } from "zustand";
import { combine, devtools } from "zustand/middleware";

const initialState = {
  isOpen: false,
};

const useBooksSearchModalStore = create(
  devtools(
    combine(initialState, (set) => ({
      actions: {
        open: () => set({ isOpen: true }),
        close: () => set({ isOpen: false }),
      },
    })),
    {
      name: "booksSearchModalStore",
    },
  ),
);

export const useOpenBooksSearchModal = () => {
  const open = useBooksSearchModalStore((state) => state.actions.open);

  return open;
};

export const useBooksSearchModal = () => {
  const store = useBooksSearchModalStore();

  return store;
};

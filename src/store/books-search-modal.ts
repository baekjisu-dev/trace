import type { Book } from "@/types";
import { create } from "zustand";
import { combine, devtools } from "zustand/middleware";

type State = {
  isOpen: boolean;
  book: Book | null;
};

const initialState: State = {
  isOpen: false,
  book: null,
};

const useBooksSearchModalStore = create(
  devtools(
    combine(initialState, (set) => ({
      actions: {
        setBook: (book: Book | null) => set({ book }),
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

export const useBookInfo = () => {
  const book = useBooksSearchModalStore((state) => state.book);

  return book;
};

export const useBooksSearchModal = () => {
  const store = useBooksSearchModalStore();

  return store;
};

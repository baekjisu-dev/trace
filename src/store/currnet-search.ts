import { create } from "zustand";
import { combine, devtools, persist } from "zustand/middleware";

type State = {
  currentSearchTexts: string[];
};

const initialState: State = {
  currentSearchTexts: [],
};

const useCurrentSearch = create(
  devtools(
    persist(
      combine(initialState, (set) => ({
        actions: {
          addSearchText: (texts: string[]) =>
            set(() => ({
              currentSearchTexts: [...texts],
            })),
          removeSearchText: (text: string) =>
            set((state) => ({
              currentSearchTexts: state.currentSearchTexts.filter(
                (t) => t !== text
              ),
            })),
          clearSearchTexts: () =>
            set(() => ({
              currentSearchTexts: [],
            })),
        },
      })),
      {
        name: "current-search",
        partialize: (state) => ({
          currentSearchTexts: state.currentSearchTexts,
        }),
      }
    ),
    {
      name: "current-search",
    }
  )
);

export const useCurrentSearchStore = () => {
  const store = useCurrentSearch();

  return store;
};

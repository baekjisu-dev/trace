import { create } from "zustand";
import { combine, devtools } from "zustand/middleware";

type State = {
  isOpen: boolean;
  currentIndex: number;
  imageUrls: {
    src: string;
    alt: string;
  }[];
};

const initialState: State = {
  isOpen: false,
  currentIndex: 0,
  imageUrls: [],
};

const useImageLightboxModal = create(
  devtools(
    combine(initialState, (set) => ({
      actions: {
        open: (
          imageUrls: { src: string; alt: string }[],
          currentIndex: number,
        ) => set({ isOpen: true, imageUrls, currentIndex }),
        close: () => set({ isOpen: false, currentIndex: 0, imageUrls: [] }),
        setCurrentIndex: (index: number) => set({ currentIndex: index }),
      },
    })),
    {
      name: "image-lightbox-modal",
    },
  ),
);

export const useOpenImageLightboxModal = () => {
  const open = useImageLightboxModal((state) => state.actions.open);

  return open;
};

export const useImageLightboxModalStore = () => {
  const store = useImageLightboxModal();

  return store as typeof store & State;
};

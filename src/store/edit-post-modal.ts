import type { PostContent } from "@/types";
import { create } from "zustand";
import { combine, devtools } from "zustand/middleware";

type State = {
  isOpen: boolean;
  postId: number | null;
  content: PostContent | null;
};

const initialState: State = {
  isOpen: false,
  postId: null,
  content: null,
};

const useEditPostModal = create(
  devtools(
    combine(initialState, (set) => ({
      actions: {
        open: (postId: number, content: PostContent) =>
          set({ isOpen: true, postId, content }),
        close: () => set({ isOpen: false, postId: null, content: null }),
      },
    })),
    { name: "editPostModal" }
  )
);

export const useOpenEditPostModal = () => {
  const open = useEditPostModal((state) => state.actions.open);
  return open;
};

export const useEditPostModalStore = () => {
  const store = useEditPostModal();

  return store;
};

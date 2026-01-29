import { create } from "zustand";
import { useShallow } from "zustand/react/shallow";
import { combine, devtools } from "zustand/middleware";

type State = {
  isOpen: boolean;
  message: string;
};

const initialState: State = {
  isOpen: false,
  message: "",
};

const useMessageLoaderStore = create<
  State & { actions: { show: (message: string) => void; hide: () => void } }
>()(
  devtools(
    combine(initialState, (set) => ({
      actions: {
        show: (message) => set({ isOpen: true, message }),
        hide: () => set({ isOpen: false, message: "" }),
      },
    })),
    { name: "messageLoaderStore" },
  ),
);

export const useShowMessageLoader = () =>
  useMessageLoaderStore((s) => s.actions.show);
export const useHideMessageLoader = () =>
  useMessageLoaderStore((s) => s.actions.hide);
export const useMessageLoader = () =>
  useMessageLoaderStore(
    useShallow((s) => ({ isOpen: s.isOpen, message: s.message })),
  );

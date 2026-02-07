import { createMessage } from "@/api/dm";
import type { UseMutationCallback } from "@/types";
import { useMutation } from "@tanstack/react-query";

export const useCreateMessage = (callbacks?: UseMutationCallback) => {
  return useMutation({
    mutationFn: createMessage,
    onSuccess: () => {
      callbacks?.onSuccess?.();
    },
    onError: (error) => {
      callbacks?.onError?.(error);
    },
    onMutate: () => {
      callbacks?.onMutate?.();
    },
    onSettled: () => {
      callbacks?.onSettled?.();
    },
  });
};

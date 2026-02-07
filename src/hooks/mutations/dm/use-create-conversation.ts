import { fetchOrCreateDm } from "@/api/dm";
import type { UseMutationCallback } from "@/types";
import { useMutation } from "@tanstack/react-query";

export const useCreateConversation = (callbacks?: UseMutationCallback) => {
  return useMutation({
    mutationFn: fetchOrCreateDm,
    onSuccess: (data) => {
      callbacks?.onSuccess?.(data);
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

import { signOut } from "@/api/auth";
import type { UseMutationCallback } from "@/types";
import { useMutation } from "@tanstack/react-query";

export const useSignOut = (callbacks?: UseMutationCallback) => {
  return useMutation({
    mutationFn: signOut,
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

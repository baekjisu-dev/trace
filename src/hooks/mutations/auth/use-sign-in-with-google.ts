import { signInWithGoogle } from "@/api/auth";
import type { UseMutationCallback } from "@/types";
import { useMutation } from "@tanstack/react-query";

export const useSignInWithGoogle = (callbacks?: UseMutationCallback) => {
  return useMutation({
    mutationFn: signInWithGoogle,
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

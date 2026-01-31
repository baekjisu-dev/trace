import { signInWithKakao } from "@/api/auth";
import type { UseMutationCallback } from "@/types";
import { useMutation } from "@tanstack/react-query";

export const useSignInWithKakao = (callbacks?: UseMutationCallback) => {
  return useMutation({
    mutationFn: signInWithKakao,
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

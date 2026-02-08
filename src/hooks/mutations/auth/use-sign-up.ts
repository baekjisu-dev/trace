import { signUp } from "@/api/auth";
import type { UseMutationCallback } from "@/types";
import { useMutation } from "@tanstack/react-query";

/** -----------------------------
 * @description 회원가입 뮤테이션
 * @param callbacks 콜백
 * @returns 회원가입 뮤테이션
 * ----------------------------- */
export const useSignUp = (callbacks?: UseMutationCallback) => {
  return useMutation({
    mutationFn: signUp,
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

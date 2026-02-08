import { signIn } from "@/api/auth";
import type { UseMutationCallback } from "@/types";
import { useMutation } from "@tanstack/react-query";

/** -----------------------------
 * @description 비밀번호 로그인 뮤테이션
 * @param callbacks 콜백
 * @returns 비밀번호 로그인 뮤테이션
 * ----------------------------- */
export const useSignInWithPassword = (callbacks?: UseMutationCallback) => {
  return useMutation({
    mutationFn: signIn,
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

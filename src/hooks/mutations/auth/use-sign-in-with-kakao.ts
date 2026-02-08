import { signInWithKakao } from "@/api/auth";
import type { UseMutationCallback } from "@/types";
import { useMutation } from "@tanstack/react-query";

/** -----------------------------
 * @description Kakao 로그인 뮤테이션
 * @param callbacks 콜백
 * @returns Kakao 로그인 뮤테이션
 * ----------------------------- */
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

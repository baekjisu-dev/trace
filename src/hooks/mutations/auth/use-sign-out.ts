import { signOut } from "@/api/auth";
import type { UseMutationCallback } from "@/types";
import { useMutation } from "@tanstack/react-query";

/** -----------------------------
 * @description 로그아웃 뮤테이션
 * @param callbacks 콜백
 * @returns 로그아웃 뮤테이션
 * ----------------------------- */
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

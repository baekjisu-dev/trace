import { signOut } from "@/api/auth";
import type { UseMutationCallback } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

/** -----------------------------
 * @description 로그아웃 뮤테이션
 * @param callbacks 콜백
 * @returns 로그아웃 뮤테이션
 * ----------------------------- */
export const useSignOut = (callbacks?: UseMutationCallback) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: signOut,
    onSuccess: () => {
      // * 로그아웃 시 모든 캐시 데이터 초기화
      queryClient.clear();
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

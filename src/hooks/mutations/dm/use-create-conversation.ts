import { fetchOrCreateDm } from "@/api/dm";
import type { UseMutationCallback } from "@/types";
import { useMutation } from "@tanstack/react-query";

/** -----------------------------
 * @description 대화방 생성 뮤테이션
 * @param callbacks 콜백
 * @returns 대화방 생성 뮤테이션
 * ----------------------------- */
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

import { createMessage } from "@/api/dm";
import type { UseMutationCallback } from "@/types";
import { useMutation } from "@tanstack/react-query";

/** -----------------------------
 * @description DM 메시지 생성 뮤테이션
 * @param callbacks 콜백
 * @returns DM 메시지 생성 뮤테이션
 * ----------------------------- */
export const useCreateMessage = (callbacks?: UseMutationCallback) => {
  return useMutation({
    mutationFn: createMessage,
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

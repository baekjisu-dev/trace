import { markDmAsRead } from "@/api/dm";
import { QUERY_KEYS } from "@/lib/constants";
import type { DmHeader, UseMutationCallback } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

/** -----------------------------
 * @description DM 메시지 읽음 처리 뮤테이션
 * @param callbacks 콜백
 * @returns DM 메시지 읽음 처리 뮤테이션
 * ----------------------------- */
export const useReadMessage = (callbacks?: UseMutationCallback) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: markDmAsRead,
    onSuccess: (updatedDm) => {
      callbacks?.onSuccess?.();

      // * 대화방 데이터 업데이트
      queryClient.setQueryData(
        QUERY_KEYS.dm.byId(updatedDm.conversation_id),
        (prev: DmHeader) => {
          if (!prev) return prev;

          return {
            ...prev,
            my_last_read_at: updatedDm.last_read_at,
            unread_count: 0,
          };
        }
      );
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

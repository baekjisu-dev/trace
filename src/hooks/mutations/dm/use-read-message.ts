import { markDmAsRead } from "@/api/dm";
import { QUERY_KEYS } from "@/lib/constants";
import type { DmHeader, UseMutationCallback } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useReadMessage = (callbacks?: UseMutationCallback) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: markDmAsRead,
    onSuccess: (updatedDm) => {
      callbacks?.onSuccess?.();

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

import { markNotificationAsRead } from "@/api/notification";
import { QUERY_KEYS } from "@/lib/constants";
import { useSession } from "@/store/session";
import type { UseMutationCallback } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useReadNotification = (callbacks?: UseMutationCallback) => {
  const session = useSession();
  const userId = session?.user.id;

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: markNotificationAsRead,
    onSuccess: () => {
      callbacks?.onSuccess?.();

      queryClient.setQueryData<number>(
        QUERY_KEYS.notification.count(userId!),
        (prevCount) => {
          if (!prevCount) return 0;

          return prevCount - 1;
        }
      );

      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.notification.list(userId!),
      });
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

import { markAllNotificationsAsRead } from "@/api/notification";
import { QUERY_KEYS } from "@/lib/constants";
import { useSession } from "@/store/session";
import type { Notification, PostCursor, UseMutationCallback } from "@/types";
import {
  useMutation,
  useQueryClient,
  type InfiniteData,
} from "@tanstack/react-query";

/** -----------------------------
 * @description 모든 알림 읽음 처리 뮤테이션
 * @param callbacks 콜백
 * @returns 모든 알림 읽음 처리 뮤테이션
 * ----------------------------- */
export const useReadAllNotifications = (callbacks?: UseMutationCallback) => {
  const session = useSession();
  const userId = session?.user.id;
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: markAllNotificationsAsRead,
    onSuccess: () => {
      callbacks?.onSuccess?.();

      // * 알림 개수 초기화
      queryClient.setQueryData<number>(
        QUERY_KEYS.notification.count(userId!),
        () => {
          return 0;
        }
      );

      // * 알림 목록 업데이트
      queryClient.setQueryData<
        InfiniteData<{ notifications: Notification[]; nextCursor: PostCursor }>
      >(QUERY_KEYS.notification.list(userId!), (prevNotifications) => {
        if (!prevNotifications) throw new Error("알림이 존재하지 않습니다.");

        return {
          ...prevNotifications,
          pages: prevNotifications.pages.map((page) => {
            return {
              ...page,
              notifications: page.notifications.map(
                (notification: Notification) => {
                  return {
                    ...notification,
                    is_read: true,
                  };
                }
              ),
            };
          }),
        };
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

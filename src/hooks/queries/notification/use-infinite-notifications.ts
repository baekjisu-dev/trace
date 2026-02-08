import { fetchNotifications } from "@/api/notification";
import { QUERY_KEYS } from "@/lib/constants";
import { useSession } from "@/store/session";
import type { PostCursor } from "@/types";
import { useInfiniteQuery } from "@tanstack/react-query";

/** -----------------------------
 * @description 알림 리스트 조회
 * @returns 알림 리스트 조회
 * ----------------------------- */
export const useInfiniteNotifications = () => {
  const session = useSession();
  const userId = session?.user.id;

  return useInfiniteQuery({
    queryKey: QUERY_KEYS.notification.list(userId!),
    queryFn: async ({ pageParam }: { pageParam: PostCursor }) => {
      const notifications = await fetchNotifications({
        cursor: pageParam,
        userId: userId!,
      });

      return {
        nextCursor: notifications.nextCursor,
        notifications: notifications.items,
      };
    },
    enabled: !!userId,
    initialPageParam: null,
    getNextPageParam: (lastPage) => lastPage.nextCursor,

    staleTime: 60_000,
  });
};

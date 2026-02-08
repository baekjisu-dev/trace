import { fetchNotificationsCount } from "@/api/notification";
import { QUERY_KEYS } from "@/lib/constants";
import { useSession } from "@/store/session";
import { useQuery } from "@tanstack/react-query";

/** -----------------------------
 * @description 알림 개수 조회
 * @returns 알림 개수 조회
 * ----------------------------- */
export const useNotificationCount = () => {
  const session = useSession();
  const userId = session?.user.id;

  return useQuery({
    queryKey: QUERY_KEYS.notification.count(userId!),
    queryFn: () => fetchNotificationsCount(userId!),
    enabled: !!userId,
  });
};

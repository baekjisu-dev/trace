import { fetchHasUnreadDm } from "@/api/dm";
import { QUERY_KEYS } from "@/lib/constants";
import { useQuery } from "@tanstack/react-query";

/** -----------------------------
 * @description 안 읽은 DM 존재 여부 조회
 * @returns 안 읽은 DM 존재 여부
 * ----------------------------- */
export const useDmUnreadData = () => {
  return useQuery({
    queryKey: QUERY_KEYS.dm.hasUnread,
    queryFn: fetchHasUnreadDm,
  });
};

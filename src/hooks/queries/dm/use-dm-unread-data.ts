import { fetchHasUnreadDm } from "@/api/dm";
import { QUERY_KEYS } from "@/lib/constants";
import { useQuery } from "@tanstack/react-query";

export const useDmUnreadData = () => {
  return useQuery({
    queryKey: QUERY_KEYS.dm.hasUnread,
    queryFn: fetchHasUnreadDm,
  });
};

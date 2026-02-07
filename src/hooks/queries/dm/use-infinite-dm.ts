import { fetchDmList } from "@/api/dm";
import { QUERY_KEYS } from "@/lib/constants";
import type { DmCursor } from "@/types";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";

export const useInfiniteDm = () => {
  const queryClient = useQueryClient();

  return useInfiniteQuery({
    queryKey: QUERY_KEYS.dm.list,
    queryFn: async ({ pageParam }: { pageParam: DmCursor }) => {
      const dmList = await fetchDmList({ cursor: pageParam });

      dmList.forEach((dm) => {
        queryClient.setQueryData(QUERY_KEYS.dm.byId(dm.conversation_id), dm);
      });

      const lastDm = dmList[dmList.length - 1];

      return {
        nextCursor: lastDm
          ? {
              lastMessageAt: lastDm.last_message_at ?? lastDm.created_at,
              conversationId: lastDm.conversation_id,
            }
          : undefined,
        dmList: dmList.map((dm) => dm.conversation_id),
      };
    },
    initialPageParam: null,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });
};

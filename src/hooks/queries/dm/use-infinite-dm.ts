import { fetchDmList } from "@/api/dm";
import { QUERY_KEYS } from "@/lib/constants";
import type { DmCursor } from "@/types";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";

/** -----------------------------
 * @description 대화방 리스트 조회
 * ----------------------------- */
export const useInfiniteDm = () => {
  const queryClient = useQueryClient();

  return useInfiniteQuery({
    queryKey: QUERY_KEYS.dm.list,
    queryFn: async ({ pageParam }: { pageParam: DmCursor }) => {
      const dmList = await fetchDmList({ cursor: pageParam });

      // * 정규화를 위한 상세 데이터 저장
      dmList.forEach((dm) => {
        queryClient.setQueryData(QUERY_KEYS.dm.byId(dm.conversation_id), dm);
      });

      const lastDm = dmList[dmList.length - 1];

      // * 다음 커서 계산
      return {
        nextCursor: lastDm
          ? {
              lastMessageAt: lastDm.last_message_at ?? lastDm.created_at,
              conversationId: lastDm.conversation_id,
            }
          : undefined,
        // * 대화방 리스트 반환 (id만, 상세 데이터는 useConversationData 쿼리에서 조회)
        dmList: dmList.map((dm) => dm.conversation_id),
      };
    },
    initialPageParam: null,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });
};

import { fetchDmHeader } from "@/api/dm";
import { QUERY_KEYS } from "@/lib/constants";
import { useQuery } from "@tanstack/react-query";

/** -----------------------------
 * @description 대화방 데이터 조회 - DM의 메타 정보
 * @param conversationId 대화방 ID
 * @returns 대화방 데이터 조회
 * ----------------------------- */
export const useConversationData = ({
  conversationId,
}: {
  conversationId: number;
}) => {
  return useQuery({
    queryKey: QUERY_KEYS.dm.byId(conversationId),
    queryFn: async () => {
      const header = await fetchDmHeader(conversationId);

      return header;
    },
    enabled: !!conversationId,
    staleTime: 60_000,
  });
};

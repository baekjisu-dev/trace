import { fetchDmHeader } from "@/api/dm";
import { QUERY_KEYS } from "@/lib/constants";
import { useQuery } from "@tanstack/react-query";

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

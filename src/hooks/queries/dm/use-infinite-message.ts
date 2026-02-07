import { fetchMessages } from "@/api/dm";
import { QUERY_KEYS } from "@/lib/constants";
import type { PostCursor } from "@/types";
import { useInfiniteQuery } from "@tanstack/react-query";

export const useInfiniteMessages = (conversationId: number) => {
  return useInfiniteQuery({
    queryKey: QUERY_KEYS.dm.conversation(conversationId),
    queryFn: async ({ pageParam }: { pageParam: PostCursor }) => {
      const messages = await fetchMessages({
        cursor: pageParam,
        conversationId,
      });

      const oldest = messages[messages.length - 1];

      return {
        items: messages,
        nextCursor: oldest
          ? {
              createdAt: oldest.created_at,
              id: oldest.id,
            }
          : null,
      };
    },
    initialPageParam: null,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    staleTime: 60_000,
  });
};

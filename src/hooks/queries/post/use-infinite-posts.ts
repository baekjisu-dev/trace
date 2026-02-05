import { fetchPosts } from "@/api/post";
import { QUERY_KEYS } from "@/lib/constants";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import type { PostCursor } from "@/types";
import { useSession } from "@/store/session";

export const useInfinitePosts = ({
  filters,
  type,
}: {
  filters: {
    authorId?: string;
    searchText?: string;
  };
  type: "SEARCH" | "FEED" | "PROFILE";
}) => {
  const queryClient = useQueryClient();
  const session = useSession();

  return useInfiniteQuery({
    queryKey:
      type === "SEARCH" || type === "PROFILE"
        ? QUERY_KEYS.post.listWithFilters(filters)
        : QUERY_KEYS.post.list,
    queryFn: async ({ pageParam }: { pageParam: PostCursor }) => {
      const posts = await fetchPosts({
        cursor: pageParam,
        userId: session!.user.id,
        authorId: filters?.authorId,
        searchText: filters?.searchText,
      });

      posts.items.forEach((post) => {
        queryClient.setQueryData(QUERY_KEYS.post.byId(post.id), post);
      });

      return {
        nextCursor: posts.nextCursor,
        posts: posts.items.map((post) => post.id),
      };
    },
    enabled: filters === undefined || filters.searchText !== "",
    initialPageParam: null,
    getNextPageParam: (lastPage) => lastPage.nextCursor,

    staleTime: 60_000,
  });
};

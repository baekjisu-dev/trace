import { fetchPosts } from "@/api/post";
import { QUERY_KEYS } from "@/lib/constants";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import type { PostCursor } from "@/types";

export const useInfinitePosts = (userId?: string) => {
  const queryClient = useQueryClient();

  return useInfiniteQuery({
    queryKey: userId ? QUERY_KEYS.post.userList(userId) : QUERY_KEYS.post.list,
    queryFn: async ({ pageParam }: { pageParam: PostCursor }) => {
      const posts = await fetchPosts(pageParam, userId);

      posts.items.forEach((post) => {
        queryClient.setQueryData(QUERY_KEYS.post.byId(post.id), post);
      });

      return {
        nextCursor: posts.nextCursor,
        posts: posts.items.map((post) => post.id),
      };
    },
    initialPageParam: null,
    getNextPageParam: (lastPage) => lastPage.nextCursor,

    staleTime: 60_000,
  });
};

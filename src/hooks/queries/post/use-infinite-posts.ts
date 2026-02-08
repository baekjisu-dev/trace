import { fetchPosts } from "@/api/post";
import { QUERY_KEYS } from "@/lib/constants";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import type { PostCursor } from "@/types";
import { useSession } from "@/store/session";

/** -----------------------------
 * @description 포스트 리스트 조회
 * @param filters 필터
 * @param type 타입
 * @returns 포스트 리스트 조회
 * ----------------------------- */
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
    // * 포스트 리스트 조회 키 (검색 조건이 있을 때와 없을 때로 나뉨)
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

      // * 정규화를 위한 상세 데이터 저장
      posts.items.forEach((post) => {
        queryClient.setQueryData(QUERY_KEYS.post.byId(post.id), post);
      });

      return {
        nextCursor: posts.nextCursor,
        // * 포스트 리스트 반환 (id만, 상세 데이터는 usePostByIdData 쿼리에서 조회)
        posts: posts.items.map((post) => post.id),
      };
    },
    enabled: filters === undefined || filters.searchText !== "",
    initialPageParam: null,
    getNextPageParam: (lastPage) => lastPage.nextCursor,

    staleTime: 60_000,
  });
};

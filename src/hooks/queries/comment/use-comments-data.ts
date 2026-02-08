import { fetchComments } from "@/api/comment";
import { QUERY_KEYS } from "@/lib/constants";
import { useQuery } from "@tanstack/react-query";

/** -----------------------------
 * @description 댓글 데이터 조회
 * @param postId 포스트 ID
 * @returns 댓글 데이터 조회
 * ----------------------------- */
export const useCommentsData = (postId: number) => {
  return useQuery({
    queryKey: QUERY_KEYS.comment.post(postId),
    queryFn: () => fetchComments(postId),
    staleTime: 60_000,
  });
};

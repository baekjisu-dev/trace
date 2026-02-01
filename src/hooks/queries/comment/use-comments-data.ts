import { fetchComments } from "@/api/comment";
import { QUERY_KEYS } from "@/lib/constants";
import { useQuery } from "@tanstack/react-query";

export const useCommentsData = (postId: number) => {
  return useQuery({
    queryKey: QUERY_KEYS.comment.post(postId),
    queryFn: () => fetchComments(postId),
    staleTime: 60_000,
  });
};

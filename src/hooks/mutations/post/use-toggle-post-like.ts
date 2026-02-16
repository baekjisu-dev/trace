import { togglePostLike } from "@/api/post";
import { QUERY_KEYS } from "@/lib/constants";
import type { Post, UseMutationCallback } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

/** -----------------------------
 * @description 포스트 좋아요 토글 뮤테이션
 * @param callbacks 콜백
 * @returns 포스트 좋아요 토글 뮤테이션
 * ----------------------------- */
export const useTogglePostLike = (callbacks?: UseMutationCallback) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: togglePostLike,
    onSuccess: () => {
      callbacks?.onSuccess?.();
    },
    onMutate: async ({ postId }) => {
      callbacks?.onMutate?.();

      await queryClient.cancelQueries({
        queryKey: QUERY_KEYS.post.byId(postId),
      });

      // * 이전 포스트 데이터 조회
      const prevPost = queryClient.getQueryData<Post>(
        QUERY_KEYS.post.byId(postId)
      );

      // * 포스트 데이터 업데이트
      queryClient.setQueryData<Post>(QUERY_KEYS.post.byId(postId), (post) => {
        if (!post) throw new Error("포스트가 존재하지 않습니다.");

        return {
          ...post,
          isLiked: !post.isLiked,
          like_count: post.isLiked ? post.like_count - 1 : post.like_count + 1,
        };
      });

      return { prevPost };
    },
    onError: (error, _, context) => {
      callbacks?.onError?.(error);

      // * 에러 발생 시 이전 포스트 데이터 복구
      if (context && context.prevPost) {
        queryClient.setQueryData(
          QUERY_KEYS.post.byId(context.prevPost.id),
          context.prevPost
        );
      }
      if (callbacks?.onError) callbacks.onError(error);
    },
    onSettled: () => {
      callbacks?.onSettled?.();
    },
  });
};

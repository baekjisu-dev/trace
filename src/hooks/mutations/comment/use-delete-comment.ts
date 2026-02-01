import { deleteComment } from "@/api/comment";
import { QUERY_KEYS } from "@/lib/constants";
import type { Comment, Post, UseMutationCallback } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteComment = (callbacks?: UseMutationCallback) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteComment,
    onSuccess: (deletedComment) => {
      callbacks?.onSuccess?.();

      queryClient.setQueryData<Post>(
        QUERY_KEYS.post.byId(deletedComment.post_id),
        (post) => {
          if (!post) throw new Error("포스트가 존재하지 않습니다.");

          return {
            ...post,
            commentCount: post.commentCount - 1,
          };
        }
      );

      queryClient.setQueryData<Comment[]>(
        QUERY_KEYS.comment.post(deletedComment.post_id),
        (comments) => {
          if (!comments) throw new Error("댓글이 존재하지 않습니다.");

          return comments.filter((comment) => comment.id !== deletedComment.id);
        }
      );
    },
    onError: (error) => {
      callbacks?.onError?.(error);
    },
    onMutate: () => {
      callbacks?.onMutate?.();
    },
    onSettled: () => {
      callbacks?.onSettled?.();
    },
  });
};

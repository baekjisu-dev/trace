import { updateComment } from "@/api/comment";
import { QUERY_KEYS } from "@/lib/constants";
import type { Comment, UseMutationCallback } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

/** -----------------------------
 * @description 댓글 수정 뮤테이션
 * @param callbacks 콜백
 * @returns 댓글 수정 뮤테이션
 * ----------------------------- */
export const useUpdateComment = (callbacks?: UseMutationCallback) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateComment,
    onSuccess: (updatedComment) => {
      callbacks?.onSuccess?.();

      // * 포스트 댓글 목록 수정
      queryClient.setQueryData<Comment[]>(
        QUERY_KEYS.comment.post(updatedComment.post_id),
        (comments) => {
          if (!comments) throw new Error("댓글이 존재하지 않습니다.");

          return comments.map((comment) => {
            if (comment.id === updatedComment.id) {
              return { ...comment, ...updatedComment };
            }

            return comment;
          });
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

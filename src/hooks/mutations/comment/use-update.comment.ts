import { updateComment } from "@/api/comment";
import { QUERY_KEYS } from "@/lib/constants";
import type { Comment, UseMutationCallback } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateComment = (callbacks?: UseMutationCallback) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateComment,
    onSuccess: (updatedComment) => {
      callbacks?.onSuccess?.();

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

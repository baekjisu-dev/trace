import { createComment } from "@/api/comment";
import { useProfileData } from "@/hooks/queries/profile/use-profile-data";
import { QUERY_KEYS } from "@/lib/constants";
import { useSession } from "@/store/session";
import type { Comment, Post, UseMutationCallback } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

/** -----------------------------
 * @description 댓글 생성 뮤테이션
 * @param callbacks 콜백
 * @returns 댓글 생성 뮤테이션
 * ----------------------------- */
export const useCreateComment = (callbacks?: UseMutationCallback) => {
  const queryClient = useQueryClient();
  const session = useSession();

  const { data: profile } = useProfileData(session?.user.id);

  return useMutation({
    mutationFn: createComment,
    onSuccess: (newComment) => {
      callbacks?.onSuccess?.();

      // * 포스트 댓글 수 증가
      queryClient.setQueryData<Post>(
        QUERY_KEYS.post.byId(newComment.post_id),
        (post) => {
          if (!post) throw new Error("포스트가 존재하지 않습니다.");

          return {
            ...post,
            commentCount: post.commentCount + 1,
          };
        }
      );

      // * 포스트 댓글 목록 추가
      queryClient.setQueryData<Comment[]>(
        QUERY_KEYS.comment.post(newComment.post_id),
        (comments) => {
          if (!comments) throw new Error("댓글이 존재하지 않습니다.");

          if (!profile) throw new Error("프로필이 존재하지 않습니다.");

          return [...comments, { ...newComment, author: profile }];
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

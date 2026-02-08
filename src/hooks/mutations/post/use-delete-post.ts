import { deleteImagesInPath } from "@/api/image";
import { deletePost } from "@/api/post";
import { QUERY_KEYS } from "@/lib/constants";
import type { PostCursor, UseMutationCallback } from "@/types";
import {
  useMutation,
  useQueryClient,
  type InfiniteData,
} from "@tanstack/react-query";

type Page = { nextCursor: PostCursor; posts: number[] };

const removePostFromInfinite = (
  prev: InfiniteData<Page> | undefined,
  deletedId: number
): InfiniteData<Page> | undefined => {
  if (!prev) return prev;

  return {
    ...prev,
    pages: prev.pages.map((page) => ({
      ...page,
      posts: page.posts.filter((id) => id !== deletedId),
    })),
  };
};

/** -----------------------------
 * @description 포스트 삭제 뮤테이션
 * @param callbacks 콜백
 * @returns 포스트 삭제 뮤테이션
 * ----------------------------- */
export const useDeletePost = (
  callbacks?: UseMutationCallback,
  userId?: string
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deletePost,
    onSuccess: async (deletedPost) => {
      callbacks?.onSuccess?.();

      // * 이미지 삭제
      if (deletedPost.image_urls && deletedPost.image_urls.length > 0) {
        await deleteImagesInPath(`${deletedPost.author_id}/${deletedPost.id}`);
      }

      // 1) 전체 list
      queryClient.setQueryData<InfiniteData<Page>>(
        QUERY_KEYS.post.list,
        (prev) => removePostFromInfinite(prev, deletedPost.id)
      );

      // 2) user list (프로필)
      if (userId) {
        queryClient.setQueryData<InfiniteData<Page>>(
          QUERY_KEYS.post.userList(userId),
          (prev) => removePostFromInfinite(prev, deletedPost.id)
        );
      }

      // * 포스트 데이터 삭제
      queryClient.removeQueries({
        queryKey: QUERY_KEYS.post.byId(deletedPost.id),
      });
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

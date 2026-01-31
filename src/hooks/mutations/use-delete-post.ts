import { deleteImagesInPath } from "@/api/image";
import { deletePost } from "@/api/post";
import { QUERY_KEYS } from "@/lib/constants";
import type { PostCursor, UseMutationCallback } from "@/types";
import {
  useMutation,
  useQueryClient,
  type InfiniteData,
} from "@tanstack/react-query";

export const useDeletePost = (callbacks?: UseMutationCallback) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deletePost,
    onSuccess: async (deletedPost) => {
      callbacks?.onSuccess?.();

      if (deletedPost.image_urls && deletedPost.image_urls.length > 0) {
        await deleteImagesInPath(`${deletedPost.author_id}/${deletedPost.id}`);
      }

      queryClient.setQueryData<
        InfiniteData<{ nexCursor: PostCursor; posts: number[] }>
      >(QUERY_KEYS.post.list, (prev) => {
        if (!prev) {
          throw new Error("이전 캐시 데이터를 찾을 수 없습니다.");
        }

        return {
          ...prev,
          pages: prev.pages.map(
            (page: { nexCursor: PostCursor; posts: number[] }) => {
              return {
                ...page,
                posts: page.posts.filter((post) => post !== deletedPost.id),
              };
            }
          ),
        };
      });

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

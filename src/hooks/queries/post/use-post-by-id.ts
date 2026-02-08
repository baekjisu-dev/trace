import { fetchPostById } from "@/api/post";
import { QUERY_KEYS } from "@/lib/constants";
import { useSession } from "@/store/session";
import { useQuery } from "@tanstack/react-query";

/** -----------------------------
 * @description 포스트 데이터 조회
 * @param postId 포스트 ID
 * @param type 포스트 타입
 * @returns 포스트 데이터 조회
 * ----------------------------- */
export const usePostByIdData = ({
  postId,
  type,
}: {
  postId: number;
  type: "FEED" | "DETAIL";
}) => {
  const session = useSession();

  return useQuery({
    queryKey: QUERY_KEYS.post.byId(postId),
    queryFn: () =>
      fetchPostById({
        postId,
        userId: session!.user.id,
      }),
    enabled: type === "FEED" ? false : true,
  });
};

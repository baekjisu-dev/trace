import supabase from "@/lib/supabase";

/** -----------------------------
 * @description 댓글 관련 API
 * - 댓글 조회
 * - 댓글 생성
 * - 댓글 삭제
 * - 댓글 수정
 * ----------------------------- */

/** -----------------------------
 * @description 댓글 조회
 * @param postId 포스트 ID
 * @returns 댓글 조회 결과
 * ----------------------------- */
export const fetchComments = async (postId: number) => {
  const { data, error } = await supabase
    .from("comment")
    .select("*, author: profile!author_id (*)")
    .eq("post_id", postId)
    .order("created_at", { ascending: true });

  if (error) throw error;
  return data;
};

/** -----------------------------
 * @description 댓글 생성
 * @param postId 포스트 ID
 * @param content 댓글 내용
 * @param parentCommentId 부모 댓글 ID
 * @param rootCommentId 루트 댓글 ID
 * @returns 댓글 생성 결과
 * ----------------------------- */
export const createComment = async ({
  postId,
  content,
  parentCommentId,
  rootCommentId,
}: {
  postId: number;
  content: string;
  parentCommentId?: number | null;
  rootCommentId?: number | null;
}) => {
  const { data, error } = await supabase
    .from("comment")
    .insert({
      post_id: postId,
      content: content,
      parent_comment_id: parentCommentId,
      root_comment_id: rootCommentId,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
};

/** -----------------------------
 * @description 댓글 삭제
 * @param commentId 댓글 ID
 * @returns 댓글 삭제 결과
 * ----------------------------- */
export const deleteComment = async (commentId: number) => {
  const { data, error } = await supabase
    .from("comment")
    .delete()
    .eq("id", commentId)
    .select()
    .single();

  if (error) throw error;
  return data;
};

/** -----------------------------
 * @description 댓글 수정
 * @param commentId 댓글 ID
 * @param content 댓글 내용
 * @returns 댓글 수정 결과
 * ----------------------------- */
export const updateComment = async ({
  commentId,
  content,
}: {
  commentId: number;
  content: string;
}) => {
  const { data, error } = await supabase
    .from("comment")
    .update({ content })
    .eq("id", commentId)
    .select()
    .single();

  if (error) throw error;
  return data;
};

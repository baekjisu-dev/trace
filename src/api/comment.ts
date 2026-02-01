import supabase from "@/lib/supabase";

export const fetchComments = async (postId: number) => {
  const { data, error } = await supabase
    .from("comment")
    .select("*, author: profile!author_id (*)")
    .eq("post_id", postId)
    .order("created_at", { ascending: true });

  if (error) throw error;
  return data;
};

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

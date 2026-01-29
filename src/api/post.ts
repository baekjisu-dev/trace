import supabase from "@/lib/supabase";
import type { PostEntity } from "@/types";
import type { DocumentType, NodeType, TextType } from "@tiptap/core";
import { uploadImage } from "./image";

type PostContent = DocumentType<
  Record<string, any> | undefined,
  NodeType<
    string,
    undefined | Record<string, any>,
    any,
    (NodeType | TextType)[]
  >[]
>;

export const createPost = async (content: PostContent) => {
  const { data, error } = await supabase
    .from("post")
    .insert({
      content,
    })
    .select()
    .single();

  if (error) throw error;

  return data;
};

export const createPostWithImages = async ({
  content,
  images,
  userId,
}: {
  content: PostContent;
  images: File[];
  userId: string;
}) => {
  // * 1. 새로운 포스트 생성
  const post = await createPost(content);
  if (images.length === 0) return post;

  try {
    // * 2. 이미지 업로드
    const imagesUrls = await Promise.all(
      images.map((image) => {
        const fileExtension = image.name.split(".").pop() || "webp";
        const fileName = `${Date.now()}-${crypto.randomUUID()}.${fileExtension}`;
        const filePath = `${userId}/${post.id}/${fileName}`;

        return uploadImage({ file: image, filePath });
      }),
    );

    // * 3. 포스트 테이블 업데이트
    const updatedPost = await updatePost({
      id: post.id,
      image_urls: imagesUrls,
    });

    return updatedPost;
  } catch (error) {
    await deletePost(post.id);
    throw error;
  }
};

export const updatePost = async (
  post: Partial<PostEntity> & { id: number },
) => {
  const { data, error } = await supabase
    .from("post")
    .update(post)
    .eq("id", post.id)
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const deletePost = async (id: number) => {
  const { data, error } = await supabase
    .from("post")
    .delete()
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;

  return data;
};

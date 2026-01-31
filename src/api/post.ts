import supabase from "@/lib/supabase";
import type { BookEntity, PostCursor, PostEntity } from "@/types";
import type { DocumentType, NodeType, TextType } from "@tiptap/core";
import { uploadImage } from "./image";
import { createBook, fetchBookByIsbn } from "./book";

const PAGE_SIZE = 10;

type PostContent = DocumentType<
  Record<string, any> | undefined,
  NodeType<
    string,
    undefined | Record<string, any>,
    any,
    (NodeType | TextType)[]
  >[]
>;

export const fetchPosts = async (cursor: PostCursor) => {
  let query = supabase
    .from("post")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(PAGE_SIZE);

  if (cursor) {
    query = query.or(
      `created_at.lt.${cursor.createdAt},and(created_at.eq.${cursor.createdAt},id.lt.${cursor.id})`
    );
  }

  const { data, error } = await query;
  if (error) throw error;

  return {
    items: data,
    nextCursor:
      data.length === PAGE_SIZE
        ? {
            createdAt: data[data.length - 1].created_at,
            id: data[data.length - 1].id,
          }
        : null,
  };
};

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
  book,
}: {
  content: PostContent;
  images: File[];
  userId: string;
  book?: BookEntity | null;
}) => {
  // * 1. 새로운 포스트 생성
  const post = await createPost(content);

  try {
    if (images.length > 0 || book) {
      let imagesUrls: string[] = [];

      if (images.length > 0) {
        // * 2. 이미지 업로드
        imagesUrls = await Promise.all(
          images.map((image) => {
            const fileExtension = image.name.split(".").pop() || "webp";
            const fileName = `${Date.now()}-${crypto.randomUUID()}.${fileExtension}`;
            const filePath = `${userId}/${post.id}/${fileName}`;

            return uploadImage({ file: image, filePath });
          })
        );
      }

      if (book) {
        // * 4. 책 정보 업데이트
        const bookData = await fetchBookByIsbn(book.isbn);
        console.log(bookData);

        if (!bookData) {
          // * 5. 책 정보 생성
          await createBook(book);
        }
      }

      // * 3. 포스트 테이블 업데이트
      const updatedPost = await updatePost({
        id: post.id,
        ...(images.length > 0 && { image_urls: imagesUrls }),
        ...(book && { book_isbn: book.isbn }),
      });

      return updatedPost;
    }
  } catch (error) {
    await deletePost(post.id);
    throw error;
  }
};

export const updatePost = async (
  post: Partial<PostEntity> & { id: number }
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

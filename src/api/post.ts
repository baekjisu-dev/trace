import supabase from "@/lib/supabase";
import type { BookEntity, PostContent, PostCursor, PostEntity } from "@/types";
import { uploadImage } from "./image";
import { createBook, fetchBookByIsbn } from "./book";

const PAGE_SIZE = 15;

/** -----------------------------
 * @description 포스트 관련 API
 * - 포스트 조회
 * - 포스트 생성
 * - 포스트 수정
 * - 포스트 삭제
 * - 포스트 좋아요 토글
 * ----------------------------- */

/** -----------------------------
 * @description 포스트 조회
 * @param cursor 커서
 * @param userId 유저 ID
 * @param authorId 작성자 ID
 * @param searchText 검색어
 * @returns 포스트 조회 결과
 * ----------------------------- */
export const fetchPosts = async ({
  cursor,
  userId,
  authorId,
  searchText,
}: {
  cursor: PostCursor;
  userId: string;
  authorId?: string;
  searchText?: string;
}) => {
  let query = supabase
    .from("post")
    .select(
      "*, author: profile!author_id (*), book: book!book_isbn (*), myLiked: like!post_id (*), commentCount: comment!post_id (count)"
    )
    .eq("like.user_id", userId)
    .order("created_at", { ascending: false })
    .limit(PAGE_SIZE);

  if (cursor) {
    query = query.or(
      `created_at.lt.${cursor.createdAt},and(created_at.eq.${cursor.createdAt},id.lt.${cursor.id})`
    );
  }

  if (searchText) {
    query = query.ilike("content_text", `%${searchText}%`);
  }

  if (authorId) {
    query = query.eq("author_id", authorId);
  }

  const { data, error } = await query;
  if (error) throw error;

  return {
    items: data.map((post) => ({
      ...post,
      commentCount: post.commentCount[0].count,
      isLiked: post.myLiked && post.myLiked.length > 0,
    })),
    nextCursor:
      data.length === PAGE_SIZE
        ? {
            createdAt: data[data.length - 1].created_at,
            id: data[data.length - 1].id,
          }
        : null,
  };
};

/** -----------------------------
 * @description 포스트 상세 정보 조회
 * @param postId 포스트 ID
 * @param userId 유저 ID
 * @returns 포스트 상세 정보 조회 결과
 * ----------------------------- */
export const fetchPostById = async ({
  postId,
  userId,
}: {
  postId: number;
  userId: string;
}) => {
  const { data, error } = await supabase
    .from("post")
    .select(
      "*, author: profile!author_id (*), book: book!book_isbn (*), myLiked: like!post_id (*), commentCount: comment!post_id (count)"
    )
    .eq("like.user_id", userId)
    .eq("id", postId)
    .single();

  if (error) throw error;
  return {
    ...data,
    commentCount: data.commentCount[0].count,
    isLiked: data.myLiked && data.myLiked.length > 0,
  };
};

/** -----------------------------
 * @description 포스트 생성
 * @param content 포스트 내용
 * @param contentText 포스트 내용 텍스트
 * @returns 포스트 생성 결과
 * ----------------------------- */
export const createPost = async (content: PostContent, contentText: string) => {
  const { data, error } = await supabase
    .from("post")
    .insert({
      content,
      content_text: contentText,
    })
    .select()
    .single();

  if (error) throw error;

  return data;
};

/** -----------------------------
 * @description 포스트 생성 - 이미지 업로드 포함
 * @param content 포스트 내용
 * @param contentText 포스트 내용 텍스트
 * @param images 이미지 파일
 * @param userId 유저 ID
 * @param book 책 정보
 * @returns 포스트 생성 결과
 * ----------------------------- */
export const createPostWithImages = async ({
  content,
  contentText,
  images,
  userId,
  book,
}: {
  content: PostContent;
  contentText: string;
  images: File[];
  userId: string;
  book?: BookEntity | null;
}) => {
  // * 1. 새로운 포스트 생성
  const post = await createPost(content, contentText);

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

/** -----------------------------
 * @description 포스트 수정
 * @param post 포스트 정보
 * @returns 포스트 수정 결과
 * ----------------------------- */
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

/** -----------------------------
 * @description 포스트 삭제
 * @param id 포스트 ID
 * @returns 포스트 삭제 결과
 * ----------------------------- */
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

/** -----------------------------
 * @description 포스트 좋아요 토글
 * @param postId 포스트 ID
 * @param userId 유저 ID
 * @returns 포스트 좋아요 토글 결과
 * ----------------------------- */
export const togglePostLike = async ({
  postId,
  userId,
}: {
  postId: number;
  userId: string;
}) => {
  const { data, error } = await supabase.rpc("toggle_post_like", {
    p_post_id: postId,
    p_user_id: userId,
  });

  if (error) throw error;
  return data;
};

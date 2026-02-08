import supabase from "@/lib/supabase";
import type { BookEntity } from "@/types";

/** -----------------------------
 * @description 책 검색 API
 * - 책 검색
 * - 책 상세 정보 조회
 * - 책 생성
 * ----------------------------- */

/** -----------------------------
 * @description 책 검색
 * @param page 페이지
 * @param size 페이지 크기
 * @param query 검색어
 * @returns 책 검색 결과
 * ----------------------------- */
export const fetchBooks = async ({
  page,
  size,
  query,
}: {
  page: number;
  size: number;
  query: string;
}) => {
  // * 카카오 책 검색 API 호출
  const books = await fetch(
    `https://dapi.kakao.com/v3/search/book?page=${page}&size=${size}&query=${query}`,
    {
      method: "GET",
      headers: {
        Authorization: `KakaoAK ${import.meta.env.VITE_KAKAO_REST_API_KEY}`,
      },
    }
  );
  if (!books.ok) {
    throw new Error("Failed to fetch books");
  }

  return books.json();
};

/** -----------------------------
 * @description 책 상세 정보 조회 - DB에서 책 정보 조회
 * @param isbn 책 ISBN
 * @returns 책 상세 정보
 * ----------------------------- */
export const fetchBookByIsbn = async (isbn: string) => {
  const { data, error } = await supabase
    .from("book")
    .select()
    .eq("isbn", isbn)
    .maybeSingle();

  if (error) throw error;
  return data;
};

/** -----------------------------
 * @description 책 생성 - DB에 책 정보 생성
 * @param book 책 정보
 * @returns 책 생성 결과
 * ----------------------------- */
export const createBook = async (book: BookEntity) => {
  const { data, error } = await supabase
    .from("book")
    .insert(book)
    .select()
    .single();

  if (error) throw error;

  return data;
};

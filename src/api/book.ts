import supabase from "@/lib/supabase";
import type { BookEntity } from "@/types";

export const fetchBooks = async ({
  page,
  size,
  query,
}: {
  page: number;
  size: number;
  query: string;
}) => {
  const books = await fetch(
    `https://dapi.kakao.com/v3/search/book?page=${page}&size=${size}&query=${query}`,
    {
      method: "GET",
      headers: {
        Authorization: `KakaoAK ${import.meta.env.VITE_KAKAO_REST_API_KEY}`,
      },
    },
  );
  if (!books.ok) {
    throw new Error("Failed to fetch books");
  }

  return books.json();
};

export const fetchBookByIsbn = async (isbn: string) => {
  const { data, error } = await supabase
    .from("book")
    .select()
    .eq("isbn", isbn)
    .maybeSingle();

  if (error) throw error;
  return data;
};

export const createBook = async (book: BookEntity) => {
  const { data, error } = await supabase
    .from("book")
    .insert(book)
    .select()
    .single();

  if (error) throw error;

  return data;
};

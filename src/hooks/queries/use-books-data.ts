import { fetchBooks } from "@/api/book";
import { QUERY_KEYS } from "@/lib/constants";
import { useQuery } from "@tanstack/react-query";

const PAGE_SIZE = 5;

export const useBooksData = (query: string, page: number) => {
  return useQuery({
    queryKey: QUERY_KEYS.book.list(query, page),
    queryFn: async () => {
      const books = await fetchBooks({ page, size: PAGE_SIZE, query });

      return books;
    },
    placeholderData: (prev) => prev,
  });
};

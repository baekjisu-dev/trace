import { fetchBooks } from "@/api/book";
import { QUERY_KEYS } from "@/lib/constants";
import { useInfiniteQuery } from "@tanstack/react-query";

const PAGE_SIZE = 5;

export const useInfiniteBooksData = (query: string) => {
  return useInfiniteQuery({
    queryKey: QUERY_KEYS.book.list(query),
    queryFn: async ({pageParam}) => {
      const books = await fetchBooks({page: pageParam, size: PAGE_SIZE, query});

      return books;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.documents.length < PAGE_SIZE) return undefined;
      return allPages.length + 1;
    },
    enabled: !!query
  });
};
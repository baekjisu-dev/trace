import { useBooksSearchModal } from "@/store/books-search-modal";
import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";
import { useEffect, useState } from "react";
import { useBooksData } from "@/hooks/queries/use-books-data";
import { useDebounce } from "@/hooks/useDebounce";
import { Input } from "../ui/input";
import type { BookEntity } from "@/types";
import BookItem from "../book/book-item";
import { Button } from "../ui/button";

const BooksSearchModal = () => {
  const [page, setPage] = useState(1);
  const [isEnd, setIsEnd] = useState(false);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 300);

  const { data, isLoading, isFetching } = useBooksData(debouncedSearch, page);

  const {
    isOpen,
    actions: { close, setBook },
  } = useBooksSearchModal();

  const isDisabled = isLoading || isFetching || !search.trim();

  const handleBookClick = (book: BookEntity) => {
    setBook(book);
    close();
  };

  useEffect(() => {
    if (!isOpen) setSearch("");
  }, [isOpen]);

  useEffect(() => {
    if (!data || data.documents.length === 0) {
      setIsEnd(true);
      return;
    }

    if (data.meta.is_end) setIsEnd(true);
    else setIsEnd(false);
  }, [data]);

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent>
        <DialogTitle>도서 검색</DialogTitle>
        <Input
          placeholder="검색어를 입력해 주세요"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="flex flex-col gap-2 max-h-[50vh] overflow-auto">
          {data && data.documents.length > 0 ? (
            data?.documents.map((book: BookEntity) => (
              <BookItem
                key={book.isbn}
                book={book}
                onClick={() => handleBookClick(book)}
              />
            ))
          ) : (
            <div className="flex items-center justify-center h-[500px] text-gray-500">
              {search.trim()
                ? "검색 결과가 없습니다."
                : "검색어를 입력해 주세요."}
            </div>
          )}
        </div>
        <div className="flex justify-end gap-2">
          <Button
            onClick={() => setPage(page - 1)}
            disabled={page === 1 || isDisabled}
            size="sm"
          >
            이전
          </Button>
          <Button
            onClick={() => setPage(page + 1)}
            disabled={isEnd || isDisabled}
            size="sm"
          >
            다음
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BooksSearchModal;

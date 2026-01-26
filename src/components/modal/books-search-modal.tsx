import { useBooksSearchModal } from "@/store/books-search-modal";
import { Dialog, DialogContent, DialogTitle } from "../ui/dialog"
import { useState } from "react";
import { useInfiniteBooksData } from "@/hooks/queries/use-infinite-books-data";
import { useDebounce } from "@/hooks/useDebounce";
import { Input } from "../ui/input";
import type { Book } from "@/types";

const BooksSearchModal = () => {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 300);

  const { data, isLoading, isFetching, hasNextPage, fetchNextPage } = useInfiniteBooksData(debouncedSearch);


  const {
    isOpen,
    actions: { close }
  } = useBooksSearchModal();

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent>
        <DialogTitle></DialogTitle>
        <Input value={search} onChange={(e) => setSearch(e.target.value)} />
        {
          data?.pages.map((page) => (
            page.documents.map((book: Book) => (
              <div key={book.isbn}>
                {book.title}
              </div>
            ))
          ))
        }
      </DialogContent>
    </Dialog>
  )
}

export default BooksSearchModal
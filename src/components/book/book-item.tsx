import type { Book } from "@/types";
import { BookIcon } from "lucide-react";

interface BookItemProps {
  book: Book;
}

const BookItem = ({ book }: BookItemProps) => {
  return (
    <div
      key={book.isbn}
      className="flex gap-2 items-center border p-1.5 rounded-md hover:bg-gray-100 cursor-pointer"
    >
      {book.thumbnail ? (
        <img
          src={book.thumbnail}
          alt={book.title}
          className="h-20 w-14 object-cover rounded-md"
        />
      ) : (
        <div className="h-20 w-14 bg-gray-100 rounded-md flex items-center justify-center">
          <BookIcon className="size-4 text-gray-500" />
        </div>
      )}
      <div className="flex flex-col gap-1 flex-1 min-w-0">
        <div>
          <p className="text-md font-bold line-clamp-1">{book.title}</p>
          <p className="text-sm text-gray-500 line-clamp-1">
            {book.authors.join(", ")}
          </p>
        </div>
        <p className="text-xs text-gray-500 line-clamp-2">{book.contents}</p>
      </div>
    </div>
  );
};

export default BookItem;

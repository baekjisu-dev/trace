import { cn } from "@/lib/utils";
import type { Book } from "@/types";
import { BookIcon, XIcon } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";

interface BookItemProps {
  book: Book;
  asCard?: boolean;
  onClick?: () => void;
  onDelete?: () => void;
}

const BookItem = ({
  book,
  asCard = false,
  onClick,
  onDelete,
}: BookItemProps) => {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <div
      key={book.isbn}
      className={cn(
        "flex gap-2 items-center border p-1.5 rounded-md relative",
        !asCard && "hover:bg-primary-foreground cursor-pointer",
      )}
      onClick={onClick}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {book.thumbnail ? (
        <img
          src={book.thumbnail}
          alt={book.title}
          className="h-20 w-14 object-cover rounded-md"
        />
      ) : (
        <div className="h-20 w-14 bg-primary-foreground rounded-md flex items-center justify-center">
          <BookIcon className="size-4 text-primary" />
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
      {onDelete && isHovering && (
        <Button
          className="absolute top-2 right-2 bg-muted-foreground/30 hover:bg-muted-foreground/60 cursor-pointer rounded-full"
          variant="secondary"
          size="icon-sm"
          onClick={onDelete}
        >
          <XIcon className="size-4" />
        </Button>
      )}
    </div>
  );
};

export default BookItem;

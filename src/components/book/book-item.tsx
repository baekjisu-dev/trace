import { cn } from "@/lib/utils";
import type { BookEntity } from "@/types";
import { BookIcon, XIcon } from "lucide-react";
import { Button } from "../ui/button";

interface BookItemProps {
  book: BookEntity;
  asCard?: boolean;
  onClick?: () => void;
  onDelete?: () => void;
}

/** -----------------------------
 * @description 책 아이템
 * @param book 책 정보
 * @param asCard 카드 형식 여부 - 포스트 내에서 단순 view 역할만 할 때 true
 * @param onClick 클릭 시 콜백
 * @param onDelete 삭제 시 콜백
 * @returns 책 아이템 컴포넌트
 * ----------------------------- */
const BookItem = ({
  book,
  asCard = false,
  onClick,
  onDelete,
}: BookItemProps) => {
  return (
    <div
      key={book.isbn}
      className={cn(
        "flex gap-2 items-center border p-1.5 rounded-md relative group",
        !asCard && "hover:bg-primary-foreground cursor-pointer"
      )}
      onClick={onClick}
    >
      {/** 책 썸네일 */}
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

      {/** 책 정보 (제목, 저자, 소개) */}
      <div className="flex flex-col gap-1 flex-1 min-w-0">
        <div>
          <p className="text-md font-bold line-clamp-1">{book.title}</p>
          <p className="text-sm text-gray-500 line-clamp-1">
            {book.authors.join(", ")}
          </p>
        </div>
        <p className="text-xs text-gray-500 line-clamp-2">{book.contents}</p>
      </div>

      {/** 삭제 버튼 */}
      {onDelete && (
        <Button
          className="absolute top-2 right-2 md:hidden md:group-hover:inline-flex bg-muted-foreground/30 hover:bg-muted-foreground/60 cursor-pointer rounded-full"
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

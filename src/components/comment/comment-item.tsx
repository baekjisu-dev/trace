import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { UserIcon } from "lucide-react";
import type { Comment } from "@/types";
import { formatTimeAgo } from "@/lib/time";

interface CommentItemProps {
  comment: Comment;
}

const CommentItem = ({ comment }: CommentItemProps) => {
  const { author } = comment;

  return (
    <div className="w-full flex gap-2 p-2.5 border-t">
      <Avatar className="size-6">
        <AvatarImage src={author.avatar_url ?? ""} className="size-full" />
        <AvatarFallback>
          <UserIcon className="size-full" />
        </AvatarFallback>
      </Avatar>
      <div className="flex flex-col gap-2 w-[calc(100%-32px)]">
        <p className="text-sm font-bold line-clamp-1">{author.nickname}</p>
        <p className="text-sm">{comment.content}</p>
        <div className="flex justify-between">
          <div className="flex gap-2">
            <p className="text-xs text-muted-foreground">답글</p>
            <p className="text-xs text-muted-foreground">|</p>
            <p className="text-xs text-muted-foreground">
              {formatTimeAgo(comment.created_at)}
            </p>
          </div>
          <div className="flex gap-2">
            <p className="text-xs text-muted-foreground">수정</p>
            <p className="text-xs text-muted-foreground">|</p>
            <p className="text-xs text-muted-foreground">삭제</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentItem;

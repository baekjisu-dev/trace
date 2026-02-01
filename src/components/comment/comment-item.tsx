import { Avatar } from "@radix-ui/react-avatar";
import { AvatarFallback } from "../ui/avatar";
import { UserIcon } from "lucide-react";

const CommentItem = () => {
  return (
    <div className="w-full flex gap-2 p-2.5 not-last:border-b">
      <Avatar className="size-6">
        <AvatarFallback>
          <UserIcon className="size-full" />
        </AvatarFallback>
      </Avatar>
      <div className="flex flex-col gap-2 w-[calc(100%-32px)]">
        <p className="text-sm font-bold line-clamp-1">
          닉네임닉네임닉네임닉네임닉네임닉네임닉네임닉네임닉네임닉네임닉네임닉네임닉네임닉네임닉네임닉네임닉네임닉네임닉네임닉네임닉네임닉네임닉네임닉네임닉네임닉네임닉네임닉네임닉네임닉네임닉네임닉네임닉네임닉네임닉네임닉네임
        </p>
        <p className="text-sm">내용쓰</p>
        <div className="flex justify-between">
          <div className="flex gap-2">
            <p className="text-xs text-muted-foreground">답글</p>
            <p className="text-xs text-muted-foreground">|</p>
            <p className="text-xs text-muted-foreground">2026-01-01</p>
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

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { UserIcon } from "lucide-react";
import type { Comment } from "@/types";
import { formatTimeAgo } from "@/lib/time";
import { useDeleteComment } from "@/hooks/mutations/comment/use-delete-comment";
import { toast } from "sonner";
import { Button } from "../ui/button";

interface CommentItemProps {
  comment: Comment;
}

const CommentItem = ({ comment }: CommentItemProps) => {
  const { author } = comment;

  const { mutate: deleteComment, isPending: isDeletingComment } =
    useDeleteComment({
      onSuccess: () => {
        toast.success("댓글을 삭제했어요.", {
          position: "top-center",
        });
      },
      onError: () => {
        toast.error("댓글 삭제에 실패했습니다. 잠시 후 다시 시도해 주세요.", {
          position: "top-center",
        });
      },
    });

  const handleDeleteComment = () => {
    deleteComment(comment.id);
  };

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
          <div className="flex items-center gap-1">
            <Button
              variant="link"
              size="sm"
              className="text-xs text-muted-foreground p-0"
              disabled={isDeletingComment}
            >
              답글
            </Button>
            <p className="text-xs text-muted-foreground">|</p>
            <p className="text-xs text-muted-foreground">
              {formatTimeAgo(comment.created_at)}
            </p>
          </div>
          <div className="flex items-center gap-1">
            <Button
              variant="link"
              size="sm"
              className="text-xs text-muted-foreground p-0"
              disabled={isDeletingComment}
            >
              수정
            </Button>
            <p className="text-xs text-muted-foreground">|</p>
            <Button
              variant="link"
              size="sm"
              className="text-xs text-muted-foreground p-0"
              onClick={handleDeleteComment}
              disabled={isDeletingComment}
            >
              삭제
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentItem;

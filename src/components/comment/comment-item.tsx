import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { UserIcon } from "lucide-react";
import type { NestedComment } from "@/types";
import { formatTimeAgo } from "@/lib/time";
import { useDeleteComment } from "@/hooks/mutations/comment/use-delete-comment";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { useSession } from "@/store/session";
import { useState } from "react";
import CommentEditor from "./comment-editor";
import { cn } from "@/lib/tiptap-utils";
import { useOpenAlertModal } from "@/store/alert-modal";

interface CommentItemProps {
  comment: NestedComment;
}

const CommentItem = ({ comment }: CommentItemProps) => {
  const session = useSession();
  const openAlertModal = useOpenAlertModal();
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

  const [isEditing, setIsEditing] = useState(false);
  const [isReplying, setIsReplying] = useState(false);

  const handleDeleteComment = () => {
    openAlertModal({
      title: "댓글 삭제",
      description: "댓글을 정말 삭제하시겠어요?",
      onPositive: () => {
        deleteComment(comment.id);
      },
    });
  };

  const isOwner = session?.user.id === author.id;
  const isRootComment = comment.parentComment === undefined;
  const isOverTwoLevels = comment.parent_comment_id !== comment.root_comment_id;

  return (
    <div
      className={cn(
        "w-full flex flex-col gap-2",
        isRootComment ? "border-t" : "pl-6"
      )}
    >
      <div className="w-full flex gap-2 p-2.5">
        <Avatar className="size-6">
          <AvatarImage src={author.avatar_url ?? ""} className="size-full" />
          <AvatarFallback>
            <UserIcon className="size-full" />
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-2 w-[calc(100%-32px)]">
          <div className="flex items-center justify-between w-full">
            <p className="text-sm font-bold line-clamp-1 flex-1">
              {author.nickname}
            </p>
            <p className="text-xs text-muted-foreground">
              {formatTimeAgo(comment.created_at)}
            </p>
          </div>
          {isEditing ? (
            <CommentEditor
              type="EDIT"
              commentId={comment.id}
              initialContent={comment.content}
              onClose={() => setIsEditing(false)}
            />
          ) : (
            <p className="text-sm whitespace-pre-wrap break-all">
              {isOverTwoLevels && (
                <span className="font-bold text-blue-500">
                  @{comment.parentComment?.author.nickname}&nbsp;
                </span>
              )}
              {comment.content}
            </p>
          )}
          {!isEditing && !isReplying && (
            <div className="flex justify-between">
              <div className="flex items-center gap-1">
                <Button
                  variant="link"
                  size="sm"
                  className="text-xs text-muted-foreground p-0"
                  disabled={isDeletingComment}
                  onClick={() => setIsReplying(true)}
                >
                  답글
                </Button>
              </div>
              {isOwner && (
                <div className="flex items-center gap-1">
                  <Button
                    variant="link"
                    size="sm"
                    className="text-xs text-muted-foreground p-0"
                    disabled={isDeletingComment}
                    onClick={() => setIsEditing(true)}
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
              )}
            </div>
          )}
        </div>
      </div>
      {isReplying && (
        <CommentEditor
          type="REPLY"
          postId={comment.post_id}
          parentCommentId={comment.id}
          rootCommentId={comment.root_comment_id ?? comment.id}
          onClose={() => setIsReplying(false)}
        />
      )}
      {comment.children.map((child) => (
        <CommentItem key={child.id} comment={child} />
      ))}
    </div>
  );
};

export default CommentItem;

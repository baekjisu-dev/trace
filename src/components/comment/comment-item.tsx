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

/** -----------------------------
 * @description 댓글 아이템
 * @param comment 댓글 정보
 * @returns 댓글 아이템 컴포넌트
 * ----------------------------- */
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

  // * 댓글 소유자 여부 체크
  const isOwner = session?.user.id === author.id;

  // * 댓글 루트 여부 체크 (대댓글이 아닌 댓글)
  const isRootComment = comment.parentComment === undefined;

  // * 댓글 두 번째 레벨 이상 여부 체크 (대댓글의 대댓글)
  const isOverTwoLevels = comment.parent_comment_id !== comment.root_comment_id;

  return (
    <div
      className={cn(
        "w-full flex flex-col gap-2",
        isRootComment ? "border-t" : "pl-6"
      )}
    >
      <div className="w-full flex gap-2 p-2.5">
        {/** 댓글 작성자 아바타 */}
        <Avatar className="size-6">
          <AvatarImage src={author.avatar_url ?? ""} className="size-full" />
          <AvatarFallback>
            <UserIcon className="size-full" />
          </AvatarFallback>
        </Avatar>
        {/** 댓글 작성자 정보 및 댓글 내용 */}
        <div className="flex flex-col gap-2 w-[calc(100%-32px)]">
          <div className="flex items-center justify-between w-full">
            <p className="text-sm font-bold line-clamp-1 flex-1">
              {author.nickname}
            </p>
            <p className="text-xs text-muted-foreground">
              {formatTimeAgo(comment.created_at)}
            </p>
          </div>
          {/** 댓글 내용 - 수정 시 editor로 변경 */}
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

          {/** 댓글 수정, 삭제, 답글 버튼 - 수정 중이거나 답글 작성 중일 떄는 보이지 않음 */}
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

      {/** 답글 작성 모드 시 답글 작성 컴포넌트 */}
      {isReplying && (
        <CommentEditor
          type="REPLY"
          postId={comment.post_id}
          parentCommentId={comment.id}
          rootCommentId={comment.root_comment_id ?? comment.id}
          onClose={() => setIsReplying(false)}
        />
      )}

      {/** 자식 댓글 리스트 */}
      {comment.children.map((child) => (
        <CommentItem key={child.id} comment={child} />
      ))}
    </div>
  );
};

export default CommentItem;

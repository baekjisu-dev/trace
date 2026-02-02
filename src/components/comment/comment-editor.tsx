import { useEffect, useState } from "react";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { useCreateComment } from "@/hooks/mutations/comment/use-create-comment";
import { toast } from "sonner";
import { useUpdateComment } from "@/hooks/mutations/comment/use-update.comment";
import { cn } from "@/lib/utils";

type CreateMode = {
  type: "CREATE";
  postId: number;
  onSuccess: () => void;
};

type EditMode = {
  type: "EDIT";
  commentId: number;
  initialContent: string;
  onClose: () => void;
};

type ReplyMode = {
  type: "REPLY";
  postId: number;
  parentCommentId: number;
  rootCommentId: number;
  onClose: () => void;
};

type Props = CreateMode | EditMode | ReplyMode;

const CommentEditor = (props: Props) => {
  const [comment, setComment] = useState("");

  const { mutate: createComment, isPending: isCreatingComment } =
    useCreateComment({
      onSuccess: () => {
        setComment("");
        toast.success("댓글을 작성했어요.", {
          position: "top-center",
        });

        if (props.type === "CREATE") {
          props.onSuccess();
        } else if (props.type === "REPLY") {
          props.onClose();
        }
      },
      onError: (error) => {
        console.error(error);
        toast.error("댓글 작성에 실패했습니다. 잠시 후 다시 시도해 주세요.", {
          position: "top-center",
        });
      },
    });

  const { mutate: updateComment, isPending: isUpdatingComment } =
    useUpdateComment({
      onSuccess: () => {
        setComment("");
        toast.success("댓글을 수정했어요.", {
          position: "top-center",
        });

        if (props.type === "EDIT") {
          props.onClose();
        }
      },
      onError: (error) => {
        console.error(error);
        toast.error("댓글 수정에 실패했습니다. 잠시 후 다시 시도해 주세요.", {
          position: "top-center",
        });
      },
    });

  const handleCreateComment = () => {
    if (props.type === "CREATE") {
      createComment({
        postId: props.postId,
        content: comment,
      });
    } else if (props.type === "EDIT") {
      updateComment({
        commentId: props.commentId,
        content: comment,
      });
    } else if (props.type === "REPLY") {
      createComment({
        postId: props.postId,
        content: comment,
        parentCommentId: props.parentCommentId,
        rootCommentId: props.rootCommentId,
      });
    }
  };

  useEffect(() => {
    if (props.type === "EDIT") {
      setComment(props.initialContent);
    }
  }, []);

  return (
    <div
      className={cn(
        "w-full flex flex-col items-end gap-2",
        props.type === "REPLY" && "pl-6 pb-2.5"
      )}
    >
      <Textarea
        className="resize-none h-24"
        value={comment}
        placeholder="자유롭게 의견을 공유해 보세요."
        onChange={(e) => setComment(e.target.value)}
        disabled={isCreatingComment}
      />
      <div className="flex gap-2">
        {(props.type === "EDIT" || props.type === "REPLY") && (
          <Button
            variant="outline"
            size="sm"
            onClick={props.onClose}
            disabled={isUpdatingComment}
          >
            취소
          </Button>
        )}
        <Button
          variant="default"
          size="sm"
          disabled={!comment.trim() || isCreatingComment || isUpdatingComment}
          onClick={handleCreateComment}
        >
          {props.type === "CREATE" || props.type === "REPLY" ? "작성" : "수정"}
        </Button>
      </div>
    </div>
  );
};

export default CommentEditor;

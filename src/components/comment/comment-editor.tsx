import { useState } from "react";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { useCreateComment } from "@/hooks/mutations/comment/use-create-comment";
import { toast } from "sonner";

type CreateMode = {
  type: "CREATE";
  postId: number;
};

type Props = CreateMode;

const CommentEditor = (props: Props) => {
  const [comment, setComment] = useState("");

  const { mutate: createComment, isPending: isCreatingComment } =
    useCreateComment({
      onSuccess: () => {
        setComment("");
        toast.success("댓글을 작성했어요.", {
          position: "top-center",
        });
      },
      onError: (error) => {
        console.error(error);
        toast.error("댓글 작성에 실패했습니다. 잠시 후 다시 시도해 주세요.", {
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
    }
  };
  return (
    <div className="w-full flex flex-col items-end gap-2">
      <Textarea
        className="resize-none h-24"
        value={comment}
        placeholder="자유롭게 의견을 공유해 보세요."
        onChange={(e) => setComment(e.target.value)}
        disabled={isCreatingComment}
      />
      <Button
        variant="default"
        size="sm"
        disabled={!comment.trim() || isCreatingComment}
        onClick={handleCreateComment}
      >
        작성
      </Button>
    </div>
  );
};

export default CommentEditor;

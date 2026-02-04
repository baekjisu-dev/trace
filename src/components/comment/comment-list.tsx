import CommentItem from "./comment-item";
import CommentEditor from "./comment-editor";
import { useCommentsData } from "@/hooks/queries/comment/use-comments-data";
import Loader from "../loader";
import Fallback from "../fallback";
import { useRef } from "react";
import type { Comment, NestedComment } from "@/types";

interface CommentListProps {
  postId: number;
  scrollToBottom: () => void;
}

const toNestedComments = (comments: Comment[]): NestedComment[] => {
  const result: NestedComment[] = [];

  comments.forEach((comment) => {
    if (!comment.root_comment_id) {
      result.push({ ...comment, children: [] });
    } else {
      const rootCommentIndex = result.findIndex(
        (c) => c.id === comment.root_comment_id
      );

      const parentComment = comments.find(
        (item) => item.id === comment.parent_comment_id
      );

      if (rootCommentIndex === -1) return;
      if (!parentComment) return;

      result[rootCommentIndex].children.push({
        ...comment,
        children: [],
        parentComment,
      });
    }
  });

  return result;
};

const CommentList = ({ postId, scrollToBottom }: CommentListProps) => {
  const {
    data: comments,
    isPending: isCommentsPending,
    isError: isErrorComments,
  } = useCommentsData(postId);

  const listRef = useRef<HTMLDivElement>(null);

  if (isCommentsPending) return <Loader />;
  if (isErrorComments) return <Fallback />;

  const nestedComments = toNestedComments(comments || []);

  return (
    <div className="w-full border-t pt-4" ref={listRef}>
      <CommentEditor type="CREATE" postId={postId} onSuccess={scrollToBottom} />
      <div className="w-full mt-2.5">
        {nestedComments.map((comment) => (
          <CommentItem key={comment.id} comment={comment} />
        ))}
      </div>
    </div>
  );
};

export default CommentList;

import CommentItem from "./comment-item";
import CommentEditor from "./comment-editor";
import { useCommentsData } from "@/hooks/queries/comment/use-comments-data";
import Loader from "../loader";
import Fallback from "../fallback";
import { useRef } from "react";

interface CommentListProps {
  postId: number;
}

const CommentList = ({ postId }: CommentListProps) => {
  const {
    data: comments,
    isLoading: isLoadingComments,
    isError: isErrorComments,
  } = useCommentsData(postId);

  const listRef = useRef<HTMLDivElement>(null);

  if (isLoadingComments) return <Loader />;
  if (isErrorComments) return <Fallback />;

  return (
    <div className="w-full border-t pt-4" ref={listRef}>
      <CommentEditor type="CREATE" postId={postId} />
      <div className="w-full mt-2.5">
        {comments?.map((comment) => (
          <CommentItem key={comment.id} comment={comment} />
        ))}
      </div>
    </div>
  );
};

export default CommentList;

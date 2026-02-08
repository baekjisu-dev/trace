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

/** -----------------------------
 * @description 댓글 리스트를 대댓글 계층 구조로 변환 (원래는 1차 배열)
 * @param comments 댓글 리스트
 * @returns 대댓글 계층 구조 댓글 리스트
 * ----------------------------- */
const toNestedComments = (comments: Comment[]): NestedComment[] => {
  const result: NestedComment[] = [];

  comments.forEach((comment) => {
    if (!comment.root_comment_id) {
      // * 루트 댓글인 경우 (상위 댓글이 없는 경우)
      result.push({ ...comment, children: [] });
    } else {
      // * 가장 상위의 root comment 찾기
      const rootCommentIndex = result.findIndex(
        (c) => c.id === comment.root_comment_id
      );

      // * 바로 위의 부모 comment 찾기
      const parentComment = comments.find(
        (item) => item.id === comment.parent_comment_id
      );

      if (rootCommentIndex === -1) return;
      if (!parentComment) return;

      // * 루트 댓글의 자식 댓글 리스트에 추가
      // * 부모 댓글이 있고, 그 부모 댓글이 루트 댓글과 다르다면 대댓글의 대댓글임
      result[rootCommentIndex].children.push({
        ...comment,
        children: [],
        parentComment,
      });
    }
  });

  return result;
};

/** -----------------------------
 * @description 댓글 리스트
 * @param postId 포스트 ID
 * @param scrollToBottom 스크롤 하단으로 이동 핸들러
 * @returns 댓글 리스트 컴포넌트
 * ----------------------------- */
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

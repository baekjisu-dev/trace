import { useState } from "react";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import CommentItem from "./comment-item";

const CommentList = () => {
  const [comment, setComment] = useState("");

  return (
    <div className="w-full border-t pt-4">
      <div className="w-full pb-4">
        <CommentItem />
        <CommentItem />
      </div>
      <div className="w-full flex flex-col items-end gap-2">
        <Textarea
          className="resize-none h-24"
          value={comment}
          placeholder="자유롭게 의견을 공유해 보세요."
          onChange={(e) => setComment(e.target.value)}
        />
        <Button variant="default" size="sm">
          작성
        </Button>
      </div>
    </div>
  );
};

export default CommentList;

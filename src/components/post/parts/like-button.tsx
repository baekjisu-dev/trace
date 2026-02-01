import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { HeartIcon } from "lucide-react";

interface LikeButtonProps {
  postId: number;
  likeCount: number;
  isLiked: boolean;
}

const LikeButton = ({ postId, likeCount, isLiked }: LikeButtonProps) => {
  return (
    <Button variant="ghost" size="sm">
      <HeartIcon className={cn("size-4", isLiked && "fill-foreground")} />
      <span>{likeCount}</span>
    </Button>
  );
};

export default LikeButton;

import { Button } from "@/components/ui/button";
import { useTogglePostLike } from "@/hooks/mutations/post/use-toggle-post-like";
import { cn } from "@/lib/utils";
import { useSession } from "@/store/session";
import { HeartIcon } from "lucide-react";

interface LikeButtonProps {
  postId: number;
  likeCount: number;
  isLiked: boolean;
}

const LikeButton = ({ postId, likeCount, isLiked }: LikeButtonProps) => {
  const session = useSession();
  const { mutate: togglePostLike, isPending } = useTogglePostLike();

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => togglePostLike({ postId, userId: session!.user.id })}
      disabled={isPending}
    >
      <HeartIcon className={cn("size-4", isLiked && "fill-foreground")} />
      <span>{likeCount}</span>
    </Button>
  );
};

export default LikeButton;

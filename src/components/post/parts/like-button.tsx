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

/** -----------------------------
 * @description 좋아요 버튼
 * @param postId 포스트 ID
 * @param likeCount 좋아요 수
 * @param isLiked 좋아요 여부
 * @returns 좋아요 버튼 컴포넌트
 * ----------------------------- */
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

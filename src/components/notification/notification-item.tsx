import type {
  CommentNotification,
  LikeNotification,
  ReplyNotification,
} from "@/types";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { UserIcon } from "lucide-react";
import { useMemo } from "react";
import {
  isCommentNotification,
  isLikeNotification,
  isReplyNotification,
} from "@/lib/type-guard";
import { formatTimeAgo } from "@/lib/time";
import { useNavigate } from "react-router";
import { PRIVATE_PAGE_PATHS } from "@/lib/pages";
import { cn } from "@/lib/utils";
import { useReadNotification } from "@/hooks/mutations/notification/use-read-notification";

interface NotificationItemProps {
  notification: LikeNotification | CommentNotification | ReplyNotification;
}

const COMMON_CLASS_NAME =
  "text-sm flex-1 line-clamp-2 hover:underline cursor-pointer";

const NotificationItem = ({ notification }: NotificationItemProps) => {
  const navigate = useNavigate();

  const { mutate: readNotification } = useReadNotification();

  const handleNavigate = () => {
    if (!notification.is_read) readNotification(notification.id);

    navigate(PRIVATE_PAGE_PATHS.POST.getPath(notification.context.postId));
  };

  const contentRenderer = useMemo(() => {
    if (isLikeNotification(notification)) {
      return (
        <div
          className={cn(
            COMMON_CLASS_NAME,
            notification.is_read && "text-muted-foreground"
          )}
        >
          <span className="font-bold">{notification.actor.nickname}</span>
          님이 회원님의 포스트에 좋아요를 눌렀어요.
        </div>
      );
    } else if (isCommentNotification(notification)) {
      return (
        <div
          className={cn(
            COMMON_CLASS_NAME,
            notification.is_read && "text-muted-foreground"
          )}
        >
          <span className="font-bold">{notification.actor.nickname}</span>
          님이 회원님의 포스트에 댓글을 남겼어요.
        </div>
      );
    } else if (isReplyNotification(notification)) {
      return (
        <div
          className={cn(
            COMMON_CLASS_NAME,
            notification.is_read && "text-muted-foreground"
          )}
        >
          <span className="font-bold">{notification.actor.nickname}</span>
          님이 댓글에 답글을 남겼어요.
        </div>
      );
    } else {
      return null;
    }
  }, [notification]);

  return (
    <div
      className="w-full p-2.5 border rounded-md flex gap-2 items-center"
      onClick={handleNavigate}
    >
      <div className="flex items-center gap-2">
        <Avatar className="size-6">
          <AvatarImage src={notification.actor.avatar_url ?? ""} />
          <AvatarFallback>
            <UserIcon className="size-4" />
          </AvatarFallback>
        </Avatar>
      </div>
      {contentRenderer}
      <p className="text-xs text-muted-foreground">
        {formatTimeAgo(notification.created_at)}
      </p>
    </div>
  );
};

export default NotificationItem;

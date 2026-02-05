import type {
  CommentNotification,
  LikeNotification,
  Notification,
  ReplyNotification,
} from "@/types";

export const isLikeNotification = (
  notification: Notification
): notification is LikeNotification => {
  return notification.type === "like";
};

export const isCommentNotification = (
  notification: Notification
): notification is CommentNotification => {
  return notification.type === "comment";
};

export const isReplyNotification = (
  notification: Notification
): notification is ReplyNotification => {
  return notification.type === "comment_reply";
};

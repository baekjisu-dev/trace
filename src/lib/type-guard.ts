import type {
  CommentNotification,
  LikeNotification,
  Notification,
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

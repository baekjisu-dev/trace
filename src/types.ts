import { type Database } from "@/database.types";
import type { DocumentType, NodeType, TextType } from "@tiptap/core";

export type PostEntity = Database["public"]["Tables"]["post"]["Row"];
export type ProfileEntity = Database["public"]["Tables"]["profile"]["Row"];
export type CommentEntity = Database["public"]["Tables"]["comment"]["Row"];
export type BookEntity = Database["public"]["Tables"]["book"]["Row"];
export type NotificationEntity =
  Database["public"]["Tables"]["notifications"]["Row"];
export type MessageEntity = Database["public"]["Tables"]["messages"]["Row"];

export type Post = PostEntity & {
  author: ProfileEntity;
  book: BookEntity;
  commentCount: number;
  isLiked: boolean;
};

export type Comment = CommentEntity & {
  author: ProfileEntity;
};

export type NestedComment = Comment & {
  parentComment?: Comment;
  children: NestedComment[];
};

export type Notification = NotificationEntity & {
  actor: ProfileEntity;
};

export type LikeNotification = Notification & {
  type: "like";
  context: {
    likeId: number;
    postId: number;
  };
};

export type CommentNotification = Notification & {
  type: "comment";
  context: {
    commentId: number;
    postId: number;
  };
};

export type ReplyNotification = Notification & {
  type: "comment_reply";
  context: {
    commentId: number;
    postId: number;
    parentCommentId: number;
    rootCommentId: number;
  };
};

export type DmHeader = {
  conversation_id: number;
  created_at: string;
  last_message_at: string | null;
  my_last_read_at: string | null;

  other_user_id: string;
  other_nickname: string | null;
  other_avatar_url: string | null;

  last_message_id: number | null;
  last_message_content: string | null;
  last_message_created_at: string | null;
  last_message_sender_id: string | null;

  unread_count: number;
};

export type UseMutationCallback = {
  onSuccess?: (data?: any) => void;
  onError?: (error: Error) => void;
  onMutate?: () => void;
  onSettled?: () => void;
};

export type PostCursor = {
  createdAt: string;
  id: number;
} | null;

export type PostContent = DocumentType<
  Record<string, any> | undefined,
  NodeType<
    string,
    undefined | Record<string, any>,
    any,
    (NodeType | TextType)[]
  >[]
>;

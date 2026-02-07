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

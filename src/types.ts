import { type Database } from "@/database.types";
import type { DocumentType, NodeType, TextType } from "@tiptap/core";

export type PostEntity = Database["public"]["Tables"]["post"]["Row"];
export type ProfileEntity = Database["public"]["Tables"]["profile"]["Row"];
export type CommentEntity = Database["public"]["Tables"]["comment"]["Row"];
export type BookEntity = Database["public"]["Tables"]["book"]["Row"];

export type Post = PostEntity & {
  author: ProfileEntity;
  book: BookEntity;
  commentCount: number;
  isLiked: boolean;
};

export type UseMutationCallback = {
  onSuccess?: () => void;
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

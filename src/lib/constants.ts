import Code from "@tiptap/extension-code";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import Highlight from "@tiptap/extension-highlight";
import Placeholder from "@tiptap/extension-placeholder";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import TextAlign from "@tiptap/extension-text-align";
import { TextStyleKit } from "@tiptap/extension-text-style";
import Underline from "@tiptap/extension-underline";
import StarterKit from "@tiptap/starter-kit";
import { all, createLowlight } from "lowlight";

export const QUERY_KEYS = {
  profile: {
    all: ["profile"],
    list: ["profile", "list"],
    byId: (userId: string) => ["profile", "byId", userId],
  },
  post: {
    all: ["post"],
    list: ["post", "list"],
    userList: (userId: string) => ["post", "userList", userId],
    byId: (postId: number) => ["post", "byId", postId],
  },
  comment: {
    all: ["comment"],
    post: (postId: number) => ["comment", "post", postId],
  },
  book: {
    list: (query: string, page: number) => ["book", "list", query, page],
  },
};

export const BUCKET_NAME = "uploads";

const lowlight = createLowlight(all);
export const TIPTAP_EXTENSIONS = [
  TextStyleKit,
  StarterKit,
  CodeBlockLowlight.configure({ lowlight }),
  Code,
  Highlight.configure({ multicolor: true }),
  Underline,
  Superscript,
  Subscript,
  TextAlign.configure({ types: ["heading", "paragraph"] }),
  Placeholder.configure({ placeholder: "가치 있는 순간을 기록해 보세요." }),
];

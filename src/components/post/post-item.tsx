import { UserIcon } from "lucide-react";
import { Button } from "../ui/button";
import PostEditButton from "./parts/post-edit-button";
import { formatTimeAgo } from "@/lib/time";
import BookItem from "../book/book-item";
import { EditorContent, useEditor, type Content } from "@tiptap/react";
import type { Post } from "@/types";
import { TIPTAP_EXTENSIONS } from "@/lib/constants";
import ImageCarousel from "./parts/image-carousel";

interface PostItemProps {
  post: Post;
}

const PostItem = ({ post }: PostItemProps) => {
  const editor = useEditor({
    extensions: TIPTAP_EXTENSIONS,
    content: post.content as Content,
    editable: false,
  });
  const { author, book } = post;

  return (
    <div className="w-full p-2.5 border rounded-md">
      <div className="flex items-center justify-between w-full">
        <div className="w-full flex items-center gap-2">
          <Button className="rounded-full" variant="secondary" size="icon">
            <UserIcon className="size-4" />
          </Button>
          <div className="flex flex-col">
            <p className="text-sm">{author.nickname}</p>
            <p className="text-xs text-muted-foreground">
              {formatTimeAgo(post.created_at)}
            </p>
          </div>
        </div>
        <PostEditButton />
      </div>
      <div className="flex flex-col gap-2 mt-2.5">
        {book && <BookItem book={book} />}
        <EditorContent editor={editor} />
      </div>
      {post.image_urls && <ImageCarousel images={post.image_urls} />}
    </div>
  );
};

export default PostItem;

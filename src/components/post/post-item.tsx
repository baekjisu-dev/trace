import { UserIcon } from "lucide-react";
import { Button } from "../ui/button";
import PostEditButton from "./parts/post-edit-button";
import { formatTimeAgo } from "@/lib/time";
import BookItem from "../book/book-item";
import { EditorContent, useEditor, type Content } from "@tiptap/react";
import type { Post } from "@/types";
import { TIPTAP_EXTENSIONS } from "@/lib/constants";
import ImageCarousel from "./parts/image-carousel";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { PRIVATE_PAGE_PATHS } from "@/lib/pages";

interface PostItemProps {
  post: Post;
}

const COLLAPSED_MAX_HEIGHT = 200;

const PostItem = ({ post }: PostItemProps) => {
  const navigate = useNavigate();
  const editor = useEditor({
    extensions: TIPTAP_EXTENSIONS,
    content: post.content as Content,
    editable: false,
  });
  const { author, book } = post;

  const contentWrapRef = useRef<HTMLDivElement | null>(null);
  const [isOverflowing, setIsOverflowing] = useState(false);

  // editor 렌더 이후 실제 높이 측정
  useEffect(() => {
    const el = contentWrapRef.current;
    if (!el) return;

    const measure = () => {
      // scrollHeight가 제한 높이보다 크면 overflow
      setIsOverflowing(el.scrollHeight > COLLAPSED_MAX_HEIGHT + 1);
    };

    measure();

    // 이미지 로딩/폰트 로딩 등으로 높이 변할 수 있으니 ResizeObserver로 추적
    const ro = new ResizeObserver(() => measure());
    ro.observe(el);

    return () => ro.disconnect();
  }, [editor, post.content]);

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

        {/* 접힘/펼침 컨테이너 */}
        <div className="relative">
          <div
            ref={contentWrapRef}
            className={`relative max-h-[${COLLAPSED_MAX_HEIGHT}px] overflow-hidden`}
          >
            <EditorContent editor={editor} />
          </div>
          {/* 페이드 오버레이 (접힘 + 오버플로일 때만) */}
          {isOverflowing && (
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-linear-to-t from-background to-transparent" />
          )}
          {/* 더보기 버튼 */}
          {isOverflowing && (
            <div className="mt-2 flex justify-center z-10 relative">
              <Button
                type="button"
                variant="secondary"
                size="sm"
                className="gap-1"
                onClick={() =>
                  navigate(PRIVATE_PAGE_PATHS.POST.getPath(post.id))
                }
              >
                <span className="text-xs">더 보기</span>
              </Button>
            </div>
          )}
        </div>
      </div>
      {post.image_urls && <ImageCarousel images={post.image_urls} />}
    </div>
  );
};

export default PostItem;

import { MessageCircleIcon, UserIcon } from "lucide-react";
import { Button } from "../ui/button";
import PostEditButton from "./parts/post-edit-button";
import { formatTimeAgo } from "@/lib/time";
import BookItem from "../book/book-item";
import { EditorContent, useEditor, type Content } from "@tiptap/react";
import { TIPTAP_EXTENSIONS } from "@/lib/constants";
import ImageCarousel from "./parts/image-carousel";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { PRIVATE_PAGE_PATHS } from "@/lib/pages";
import { usePostByIdData } from "@/hooks/queries/post/use-post-by-id";
import Loader from "../loader";
import Fallback from "../fallback";
import { cn } from "@/lib/utils";
import { useSession } from "@/store/session";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import LikeButton from "./parts/like-button";
import CommentList from "../comment/comment-list";

interface PostItemProps {
  postId: number;
  type: "FEED" | "DETAIL";
}

const COLLAPSED_MAX_HEIGHT = 200;

const PostItem = ({ postId, type }: PostItemProps) => {
  const navigate = useNavigate();
  const session = useSession();

  const {
    data: post,
    isPending,
    error,
  } = usePostByIdData({
    postId,
    type,
  });

  const editor = useEditor({
    extensions: TIPTAP_EXTENSIONS,
    content: "",
    editable: false,
  });

  const contentWrapRef = useRef<HTMLDivElement | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [isOverflowing, setIsOverflowing] = useState(false);

  useEffect(() => {
    const el = contentWrapRef.current;
    if (!el) return;

    const measure = () => {
      setIsOverflowing(el.scrollHeight > COLLAPSED_MAX_HEIGHT + 1);
    };

    measure();

    const ro = new ResizeObserver(() => measure());
    ro.observe(el);

    return () => ro.disconnect();
  }, [editor, post?.content]);

  useEffect(() => {
    if (post?.content) {
      editor?.commands.setContent(post.content as Content);
    }
  }, [post?.content]);

  if (isPending) return <Loader />;
  if (error) return <Fallback />;

  const { author, book } = post;
  const isOwner = session?.user.id === author.id;

  const handleNavigate = () => {
    if (type === "FEED") navigate(PRIVATE_PAGE_PATHS.POST.getPath(post.id));
  };

  const handleNavigateToProfile = () => {
    navigate(PRIVATE_PAGE_PATHS.PROFILE.getPath(author.id));
  };

  const scrollToBottom = () => {
    setTimeout(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollTo({
          top: scrollRef.current.scrollHeight,
          behavior: "smooth",
        });
      }
    }, 1);
  };

  return (
    <div
      ref={scrollRef}
      className={cn(
        "w-full p-2.5",
        type === "FEED" && "border rounded-md",
        type === "DETAIL" && "overflow-auto h-full"
      )}
    >
      <div className="flex items-center justify-between w-full">
        <div className="w-full flex items-center gap-2">
          <Button
            className="rounded-full"
            variant="secondary"
            size="icon"
            onClick={handleNavigateToProfile}
          >
            <Avatar className="size-full">
              <AvatarImage src={author.avatar_url ?? ""} />
              <AvatarFallback>
                <UserIcon className="size-4" />
              </AvatarFallback>
            </Avatar>
          </Button>
          <div className="flex flex-col">
            <p className="text-sm">{author.nickname}</p>
            <p className="text-xs text-muted-foreground">
              {formatTimeAgo(post.created_at)}
            </p>
          </div>
        </div>
        {isOwner && <PostEditButton postId={post.id} />}
      </div>
      <div className="flex flex-col gap-2 mt-2.5" onClick={handleNavigate}>
        {book && <BookItem book={book} />}
        <div className="relative">
          <div
            ref={contentWrapRef}
            className={cn(
              "relative",
              type === "FEED" &&
                `cursor-pointer max-h-[${COLLAPSED_MAX_HEIGHT}px] overflow-hidden`
            )}
          >
            <EditorContent editor={editor} />
          </div>
          {/* 페이드 오버레이 (접힘 + 오버플로일 때만) */}
          {isOverflowing && type === "FEED" && (
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-linear-to-t from-background to-transparent" />
          )}
          {/* 더보기 버튼 */}
          {isOverflowing && type === "FEED" && (
            <div className="mt-2 flex justify-center z-10 relative">
              <Button
                type="button"
                variant="secondary"
                size="sm"
                className="gap-1"
                onClick={handleNavigate}
              >
                <span className="text-xs">더 보기</span>
              </Button>
            </div>
          )}
        </div>
      </div>
      {post.image_urls && <ImageCarousel images={post.image_urls} />}
      <div className="w-full">
        <LikeButton
          postId={post.id}
          likeCount={post.like_count}
          isLiked={post.isLiked}
        />
        <Button variant="ghost" size="sm" onClick={handleNavigate}>
          <MessageCircleIcon className="size-4" />
          <span>{post.commentCount}</span>
        </Button>
      </div>
      {type === "DETAIL" && (
        <CommentList postId={post.id} scrollToBottom={scrollToBottom} />
      )}
    </div>
  );
};

export default PostItem;

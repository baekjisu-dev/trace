import "@/components/post/styles.scss";
import "@/components/tiptap-node/blockquote-node/blockquote-node.scss";
import "@/components/tiptap-node/code-block-node/code-block-node.scss";
import "@/components/tiptap-node/heading-node/heading-node.scss";
import "@/components/tiptap-node/horizontal-rule-node/horizontal-rule-node.scss";
import "@/components/tiptap-node/list-node/list-node.scss";
import "@/components/tiptap-node/paragraph-node/paragraph-node.scss";

import { EditorContent, EditorContext, useEditor } from "@tiptap/react";
import { BlockquoteButton } from "@/components/tiptap-ui/blockquote-button";
import { ColorHighlightPopover } from "@/components/tiptap-ui/color-highlight-popover";
import { LinkPopover } from "@/components/tiptap-ui/link-popover";
import { HeadingDropdownMenu } from "@/components/tiptap-ui/heading-dropdown-menu";
import { MarkButton } from "@/components/tiptap-ui/mark-button";

import { Button } from "@/components/ui/button";
import { BookOpenTextIcon, ImagePlusIcon } from "lucide-react";
import TooltipWrapper from "@/components/ui/tooltip-wrapper";
import { useEffect, useRef, useState } from "react";
import ImageCarousel from "./parts/image-carousel";
import BookItem from "../book/book-item";
import { useBooksSearchModal } from "@/store/books-search-modal";
import { useCreatePost } from "@/hooks/mutations/post/use-create-post";
import { useSession } from "@/store/session";
import { toast } from "sonner";
import {
  useHideMessageLoader,
  useShowMessageLoader,
} from "@/store/message-loader";
import { TIPTAP_EXTENSIONS } from "@/lib/constants";

/** -----------------------------
 * @description 포스트 작성 컴포넌트 - 팁탭 에디터 사용
 * @returns 포스트 작성 컴포넌트
 * ----------------------------- */
const PostEditor = () => {
  // * 로딩 메시지 표시 및 숨기기
  const showMessageLoader = useShowMessageLoader();
  const hideMessageLoader = useHideMessageLoader();

  const session = useSession();

  // * 팁탭 에디터 생성
  const editor = useEditor({
    extensions: TIPTAP_EXTENSIONS,
    content: "",
    onUpdate: ({ editor }) => {
      setIsEmpty(editor.isEmpty);
    },
  });

  const { mutate: createPost, isPending: isCreatePostPending } = useCreatePost({
    onSuccess: () => {
      editor?.commands.setContent("");
      setImageFiles([]);
      setBook(null);

      hideMessageLoader();

      toast.success("포스트가 게시되었습니다.", {
        position: "top-center",
      });
    },
    onError: () => {
      toast.error("포스트 게시에 실패했습니다. 잠시 후 다시 시도해 주세요.", {
        position: "top-center",
      });
      hideMessageLoader();
    },
  });

  // * 선택한 책 정보 조회 및 설정
  const {
    book: bookInfo,
    actions: { open: openBooksSearchModal, setBook },
  } = useBooksSearchModal();

  // * 이미지 업로드 참조 생성
  const fileRef = useRef<HTMLInputElement>(null);

  // * 포스트 내용 비어있는지 여부 상태 관리
  const [isEmpty, setIsEmpty] = useState(true);
  // * 이미지 파일 상태 관리
  const [imageFiles, setImageFiles] = useState<{ file: File; url: string }[]>(
    []
  );

  // * 이미지 업로드 핸들러
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files) {
      setImageFiles([
        ...imageFiles,
        ...Array.from(files).map((file) => ({
          file,
          url: URL.createObjectURL(file),
        })),
      ]);

      if (fileRef.current) fileRef.current.value = "";
    }
  };

  // * 이미지 삭제 핸들러
  const handleImageDelete = (targetIndex: number) => {
    setImageFiles(
      imageFiles.filter((image, index) => {
        if (index === targetIndex) {
          URL.revokeObjectURL(image.url);
        }

        return index !== targetIndex;
      })
    );
  };

  // * 책 정보 삭제 핸들러
  const handleBookDelete = () => {
    setBook(null);
  };

  // * 포스트 게시 핸들러
  const handleCreatePost = () => {
    if (!session) return;

    showMessageLoader("포스트 게시 중...");

    createPost({
      content: editor.getJSON(),
      contentText: editor.getText(),
      images: imageFiles.map((image) => image.file),
      userId: session.user.id,
      book: bookInfo,
    });
  };

  // * 컴포넌트 언마운트 시 이미지 URL 정리
  useEffect(() => {
    return () => {
      if (imageFiles.length > 0)
        imageFiles.forEach((image) => URL.revokeObjectURL(image.url));
    };
  }, [imageFiles]);

  return (
    <div className="w-full border-b">
      <EditorContext.Provider value={{ editor }}>
        {/** 에디터 메뉴바 */}
        <div className="flex items-center gap-1 w-full overflow-auto border-b px-2.5 py-1">
          <HeadingDropdownMenu levels={[1, 2, 3, 4]} />
          <BlockquoteButton />
          <div className="w-px h-4 bg-gray-200" />
          <MarkButton type="bold" />
          <MarkButton type="italic" />
          <MarkButton type="strike" />
          <MarkButton type="underline" />
          <div className="w-px h-4 bg-gray-200" />
          <ColorHighlightPopover />
          <LinkPopover />
        </div>

        {/** 선택한 책 정보 */}
        {bookInfo && (
          <div className="p-2.5">
            <BookItem book={bookInfo} asCard onDelete={handleBookDelete} />
          </div>
        )}

        {/** 포스트 내용 */}
        <EditorContent
          className="max-h-[200px] overflow-auto"
          editor={editor}
        />
      </EditorContext.Provider>

      {/** 이미지 캐러셀 */}
      {imageFiles.length > 0 && (
        <ImageCarousel
          images={imageFiles.map((image) => image.url)}
          onDelete={handleImageDelete}
        />
      )}

      {/** 이미지 업로드 버튼 및 게시 버튼 */}
      <div className="w-full p-2.5 flex items-center justify-between">
        <div className="flex items-center gap-1">
          <input
            className="hidden"
            type="file"
            accept="image/*"
            multiple
            ref={fileRef}
            onChange={handleImageUpload}
          />
          <TooltipWrapper tooltip="이미지">
            <Button
              className="rounded-full"
              size="icon"
              variant="outline"
              onClick={() => fileRef.current?.click()}
            >
              <ImagePlusIcon className="size-4" />
            </Button>
          </TooltipWrapper>
          <TooltipWrapper tooltip="책 정보">
            <Button
              className="rounded-full"
              size="icon"
              variant="outline"
              onClick={openBooksSearchModal}
            >
              <BookOpenTextIcon className="size-4" />
            </Button>
          </TooltipWrapper>
        </div>
        <Button
          disabled={isCreatePostPending || isEmpty}
          onClick={handleCreatePost}
        >
          게시하기
        </Button>
      </div>
    </div>
  );
};

export default PostEditor;

import { TIPTAP_EXTENSIONS } from "@/lib/constants";
import { EditorContext, useEditor } from "@tiptap/react";
import { MarkButton } from "../tiptap-ui/mark-button";
import { HeadingDropdownMenu } from "../tiptap-ui/heading-dropdown-menu";
import { BlockquoteButton } from "../tiptap-ui/blockquote-button";
import { ColorHighlightPopover } from "../tiptap-ui/color-highlight-popover";
import { LinkPopover } from "../tiptap-ui/link-popover";
import { EditorContent } from "@tiptap/react";
import type { PostContent } from "@/types";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { useUpdatePost } from "@/hooks/mutations/post/use-update-post";

/* -----------------------------
 * @description 포스트 내용 에디터 - 이미지, 도서 제외 내용만 수정할 수 있음
 * @returns 포스트 내용 에디터 컴포넌트
 * ----------------------------- */
const PostContentEditor = ({
  initialContent,
  postId,
  onCancel,
}: {
  initialContent: PostContent | null;
  postId: number | null;
  onCancel: () => void;
}) => {
  const { mutate: updatePost, isPending: isUpdatePostPending } = useUpdatePost({
    onSuccess: () => {
      toast.success("포스트가 수정되었어요.", {
        position: "top-center",
      });

      onCancel();
    },
    onError: () => {
      toast.error("포스트 수정에 실패했습니다. 잠시 후 다시 시도해 주세요.", {
        position: "top-center",
      });
    },
  });
  const [isEmpty, setIsEmpty] = useState(true);

  const editor = useEditor({
    extensions: TIPTAP_EXTENSIONS,
    content: "",
    onUpdate: ({ editor }) => {
      setIsEmpty(editor.isEmpty);
    },
  });

  const onSubmit = () => {
    if (!postId) return;

    updatePost({
      id: postId,
      content: editor?.getJSON(),
      content_text: editor?.getText(),
    });
  };

  useEffect(() => {
    if (initialContent) editor?.commands.setContent(initialContent);
  }, [initialContent]);

  return (
    <div className="w-full">
      <EditorContext.Provider value={{ editor }}>
        {/** 에디터 메뉴바 */}
        <div className=" flex items-center gap-1 w-full overflow-auto border-y px-2.5 py-1 overflow-x-auto">
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

        {/** 포스트 내용 */}
        <EditorContent
          className="max-h-[50vh] min-h-[100px] overflow-auto w-full"
          editor={editor}
        />
      </EditorContext.Provider>

      <div className="flex justify-end gap-2 p-6 pt-0 w-full">
        <Button
          variant="outline"
          disabled={isUpdatePostPending}
          onClick={onCancel}
        >
          취소
        </Button>
        <Button
          variant="default"
          disabled={isEmpty || isUpdatePostPending}
          onClick={onSubmit}
        >
          저장
        </Button>
      </div>
    </div>
  );
};

export default PostContentEditor;

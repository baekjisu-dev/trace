import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";
import { useEditPostModalStore } from "@/store/edit-post-modal";
import PostContentEditor from "../post/post-content-editor";

const PostEditModal = () => {
  const {
    isOpen,
    postId,
    content,
    actions: { close },
  } = useEditPostModalStore();

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className="p-0">
        <DialogTitle className="p-6 pb-0">포스트 수정</DialogTitle>
        <PostContentEditor
          initialContent={content}
          postId={postId}
          onCancel={close}
        />
      </DialogContent>
    </Dialog>
  );
};

export default PostEditModal;

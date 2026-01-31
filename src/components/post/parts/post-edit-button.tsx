import PopoverButton from "@/components/ui/popover-button";
import { useDeletePost } from "@/hooks/mutations/use-delete-post";
import { PencilIcon, Trash2Icon } from "lucide-react";
import { toast } from "sonner";

interface PostEditButtonProps {
  postId: number;
}

const PostEditButton = ({ postId }: PostEditButtonProps) => {
  const { mutate: deletePost } = useDeletePost({
    onSuccess: () => {
      toast.success("포스트가 삭제되었습니다.", {
        position: "top-center",
      });
    },
    onError: () => {
      toast.error("포스트 삭제에 실패했습니다. 잠시 후 다시 시도해 주세요.", {
        position: "top-center",
      });
    },
  });

  const handleDeletePost = () => {
    deletePost(postId);
  };

  return (
    <PopoverButton
      buttonList={[
        { icon: PencilIcon, label: "수정" },
        { icon: Trash2Icon, label: "삭제", onClick: handleDeletePost },
      ]}
    />
  );
};

export default PostEditButton;

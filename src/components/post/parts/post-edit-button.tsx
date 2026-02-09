import PopoverButton from "@/components/ui/popover-button";
import { useDeletePost } from "@/hooks/mutations/post/use-delete-post";
import { PRIVATE_PAGE_PATHS } from "@/lib/pages";
import { useOpenAlertModal } from "@/store/alert-modal";
import { useOpenEditPostModal } from "@/store/edit-post-modal";
import { useSession } from "@/store/session";
import type { PostContent } from "@/types";
import { PencilIcon, Trash2Icon } from "lucide-react";
import { useLocation, useNavigate } from "react-router";
import { toast } from "sonner";

interface PostEditButtonProps {
  postId: number;
  content: PostContent;
  type: "FEED" | "DETAIL";
}

/** -----------------------------
 * @description 포스트 상세 메뉴 버튼
 * @param postId 포스트 ID
 * @param type 포스트 타입
 * @returns 포스트 상세 메뉴 버튼 컴포넌트
 * ----------------------------- */
const PostEditButton = ({ postId, content, type }: PostEditButtonProps) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isProfilePage = pathname.includes("/profile/");
  const session = useSession();

  const openEditPostModal = useOpenEditPostModal();
  const openAlertModal = useOpenAlertModal();

  const { mutate: deletePost } = useDeletePost(
    {
      onSuccess: () => {
        toast.success("포스트가 삭제되었습니다.", {
          position: "top-center",
        });

        if (type === "DETAIL") {
          navigate(PRIVATE_PAGE_PATHS.HOME.path);
        }
      },
      onError: (error) => {
        console.error(error);
        toast.error("포스트 삭제에 실패했습니다. 잠시 후 다시 시도해 주세요.", {
          position: "top-center",
        });
      },
    },
    isProfilePage ? session?.user.id : undefined
  );

  const handleEditPost = () => {
    openEditPostModal(postId, content);
  };

  const handleDeletePost = () => {
    openAlertModal({
      title: "포스트 삭제",
      description: "포스트를 정말 삭제하시겠어요?",
      onPositive: () => {
        deletePost(postId);
      },
    });
  };

  return (
    <PopoverButton
      buttonList={[
        { icon: PencilIcon, label: "수정", onClick: handleEditPost },
        { icon: Trash2Icon, label: "삭제", onClick: handleDeletePost },
      ]}
    />
  );
};

export default PostEditButton;

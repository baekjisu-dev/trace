import PopoverButton from "@/components/ui/popover-button";
import { useDeletePost } from "@/hooks/mutations/post/use-delete-post";
import { PRIVATE_PAGE_PATHS } from "@/lib/pages";
import { useSession } from "@/store/session";
import { Trash2Icon } from "lucide-react";
import { useLocation, useNavigate } from "react-router";
import { toast } from "sonner";

interface PostEditButtonProps {
  postId: number;
  type: "FEED" | "DETAIL";
}

const PostEditButton = ({ postId, type }: PostEditButtonProps) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isProfilePage = pathname.includes("/profile/");
  const session = useSession();

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

  const handleDeletePost = () => {
    deletePost(postId);
  };

  return (
    <PopoverButton
      buttonList={[
        // { icon: PencilIcon, label: "수정" },
        { icon: Trash2Icon, label: "삭제", onClick: handleDeletePost },
      ]}
    />
  );
};

export default PostEditButton;

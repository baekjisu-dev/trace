import Fallback from "@/components/fallback";
import Loader from "@/components/loader";
import { useProfileData } from "@/hooks/queries/profile/use-profile-data";
import { PRIVATE_PAGE_PATHS } from "@/lib/pages";
import { Navigate, useNavigate, useParams } from "react-router";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CameraIcon, MessageCircleIcon, UserIcon } from "lucide-react";
import { useSession } from "@/store/session";
import { Button } from "@/components/ui/button";
import PostList from "@/components/post/post-list";
import { useRef, useState } from "react";
import { EditableProfile } from "@/components/profile/editable-profile";
import ReadonlyProfile from "@/components/profile/readonly-profile";
import { useCreateConversation } from "@/hooks/mutations/dm/use-create-conversation";

const ProfileDetailPage = () => {
  const navigate = useNavigate();
  const session = useSession();
  const { userId } = useParams();
  const {
    data: profile,
    isPending: isProfilePending,
    isError: isProfileError,
  } = useProfileData(userId);
  const {
    mutate: createConversation,
    isPending: isCreateConversationPending,
    isError: isCreateConversationError,
  } = useCreateConversation({
    onSuccess: (data: number) => {
      navigate(PRIVATE_PAGE_PATHS.DM.getPath(data));
    },
  });

  const fileRef = useRef<HTMLInputElement>(null);
  const [isEdit, setIsEdit] = useState(false);
  const [avatarImageUrl, setAvatarImageUrl] = useState(
    profile?.avatar_url ?? ""
  );

  if (!userId) return <Navigate to={PRIVATE_PAGE_PATHS.HOME.path} replace />;

  if (isProfilePending) return <Loader />;
  if (isProfileError || isCreateConversationError) return <Fallback />;

  const isMine = userId === session?.user?.id;

  const handleCreateConversation = () => {
    createConversation(userId);
  };

  return (
    <div className="w-full h-full overflow-auto">
      <div className="w-full p-4">
        <div className="w-full flex flex-col items-center gap-2.5 border-b pb-4">
          <div className="relative">
            <Avatar className="size-40 md:size-48 lg:size-56">
              <AvatarImage src={avatarImageUrl} />
              <AvatarFallback>
                <UserIcon className="size-16" />
              </AvatarFallback>
            </Avatar>
            {isEdit && (
              <Button
                variant="default"
                size="icon"
                className="absolute bottom-2 right-2 rounded-full"
                onClick={() => fileRef.current?.click()}
              >
                <CameraIcon className="size-4" />
              </Button>
            )}
          </div>
          {isEdit ? (
            <EditableProfile
              profile={profile}
              fileRef={fileRef}
              avatarImageUrl={avatarImageUrl}
              setIsEdit={setIsEdit}
              setAvatarImageUrl={setAvatarImageUrl}
            />
          ) : (
            <ReadonlyProfile profile={profile} />
          )}
          {isMine && !isEdit && (
            <Button variant="default" size="sm" onClick={() => setIsEdit(true)}>
              프로필 수정
            </Button>
          )}
          {!isMine && (
            <Button
              variant="default"
              size="sm"
              disabled={isCreateConversationPending}
              onClick={handleCreateConversation}
            >
              <MessageCircleIcon className="size-4" />
              DM 보내기
            </Button>
          )}
        </div>
        <PostList authorId={userId} type="PROFILE" />
      </div>
    </div>
  );
};

export default ProfileDetailPage;

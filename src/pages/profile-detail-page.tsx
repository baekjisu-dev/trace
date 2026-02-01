import Fallback from "@/components/fallback";
import Loader from "@/components/loader";
import { useProfileData } from "@/hooks/queries/profile/use-profile-data";
import { PRIVATE_PAGE_PATHS } from "@/lib/pages";
import { Navigate, useParams } from "react-router";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CameraIcon, UserIcon } from "lucide-react";
import { useSession } from "@/store/session";
import { Button } from "@/components/ui/button";
import PostList from "@/components/post/post-list";
import { useRef, useState } from "react";
import { EditableProfile } from "@/components/profile/editable-profile";
import ReadonlyProfile from "@/components/profile/readonly-profile";

const ProfileDetailPage = () => {
  const session = useSession();
  const { userId } = useParams();
  const {
    data: profile,
    isLoading: isProfileLoading,
    isError: isProfileError,
  } = useProfileData(userId);

  const fileRef = useRef<HTMLInputElement>(null);
  const [isEdit, setIsEdit] = useState(false);
  const [avatarImageUrl, setAvatarImageUrl] = useState(
    profile?.avatar_url ?? ""
  );

  if (!userId) return <Navigate to={PRIVATE_PAGE_PATHS.HOME.path} replace />;

  if (isProfileLoading) return <Loader />;
  if (isProfileError) return <Fallback />;

  const isMine = userId === session?.user?.id;

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
        </div>
        <PostList userId={userId} />
      </div>
    </div>
  );
};

export default ProfileDetailPage;

import Fallback from "@/components/fallback";
import Loader from "@/components/loader";
import { useProfileData } from "@/hooks/queries/profile/use-profile-data";
import { PRIVATE_PAGE_PATHS } from "@/lib/pages";
import { Navigate, useParams } from "react-router";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserIcon } from "lucide-react";
import { useSession } from "@/store/session";
import { Button } from "@/components/ui/button";
import PostList from "@/components/post/post-list";

const ProfileDetailPage = () => {
  const session = useSession();
  const { userId } = useParams();
  const {
    data: profile,
    isLoading: isProfileLoading,
    isError: isProfileError,
  } = useProfileData(userId);

  if (!userId) return <Navigate to={PRIVATE_PAGE_PATHS.HOME.path} replace />;

  if (isProfileLoading) return <Loader />;
  if (isProfileError) return <Fallback />;

  const isMine = userId === session?.user?.id;

  return (
    <div className="w-full h-full overflow-auto">
      <div className="w-full p-4">
        <div className="w-full flex flex-col items-center gap-2.5 border-b pb-4">
          <Avatar className="size-40 md:size-48 lg:size-56">
            <AvatarImage src={profile?.avatar_url ?? ""} />
            <AvatarFallback>
              <UserIcon className="size-16" />
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col items-center gap-1">
            <p className="text-2xl font-bold">{profile?.nickname}</p>
            <p className="text-sm text-muted-foreground line-clamp-2 h-12">
              {profile?.bio || "자기소개가 없어요."}
            </p>
            <div className="flex justify-center gap-2 w-full">
              {isMine && (
                <Button variant="outline" size="sm">
                  프로필 수정
                </Button>
              )}
            </div>
          </div>
        </div>
        <PostList userId={userId} />
      </div>
    </div>
  );
};

export default ProfileDetailPage;

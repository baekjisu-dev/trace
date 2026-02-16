import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import PopoverButton from "@/components/ui/popover-button";
import { useSignOut } from "@/hooks/mutations/auth/use-sign-out";
import { useProfileData } from "@/hooks/queries/profile/use-profile-data";
import { PRIVATE_PAGE_PATHS } from "@/lib/pages";
import { useTheme } from "@/lib/theme-context";
import { useSession } from "@/store/session";
import { AvatarImage } from "@radix-ui/react-avatar";
import { LogOutIcon, MoonIcon, SunIcon, UserIcon } from "lucide-react";
import { useNavigate } from "react-router";

/** -----------------------------
 * @description 프로필 버튼
 * @returns 프로필 버튼 컴포넌트
 * ----------------------------- */
const ProfileButton = () => {
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  const session = useSession();

  const { data: profile } = useProfileData(session?.user?.id);
  const { mutate: signOut, isPending: isSignOutPending } = useSignOut();

  if (!session) return null;

  return (
    <PopoverButton
      TriggerIcon={
        <Avatar className="size-8">
          <AvatarImage
            className="size-8"
            src={profile?.avatar_url ?? ""}
            alt="profile"
          />
          <AvatarFallback>
            <UserIcon className="size-4" />
          </AvatarFallback>
        </Avatar>
      }
      buttonList={[
        {
          disabled: isSignOutPending,
          icon: UserIcon,
          label: "프로필",
          onClick: () =>
            navigate(PRIVATE_PAGE_PATHS.PROFILE.getPath(session.user?.id)),
        },
        {
          disabled: isSignOutPending,
          icon: theme === "dark" ? SunIcon : MoonIcon,
          label: theme === "dark" ? "라이트 모드" : "다크 모드",
          onClick: () => setTheme(theme === "dark" ? "light" : "dark"),
        },
        {
          disabled: isSignOutPending,
          icon: LogOutIcon,
          label: "로그아웃",
          onClick: () => signOut(),
        },
      ]}
    />
  );
};

export default ProfileButton;

import PopoverButton from "@/components/ui/popover-button";
import { useSignOut } from "@/hooks/mutations/auth/use-sign-out";
import { PRIVATE_PAGE_PATHS } from "@/lib/pages";
import { useTheme } from "@/lib/theme-context";
import { useSession } from "@/store/session";
import { LogOutIcon, MoonIcon, SunIcon, UserIcon } from "lucide-react";
import { useNavigate } from "react-router";

const ProfileButton = () => {
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  const session = useSession();

  const { mutate: signOut, isPending: isSignOutPending } = useSignOut();

  if (!session) return null;

  return (
    <PopoverButton
      TriggerIcon={UserIcon}
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

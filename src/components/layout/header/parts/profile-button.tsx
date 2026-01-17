import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { useSignOut } from "@/hooks/mutations/use-sign-out";
import { PRIVATE_PAGE_PATHS } from "@/lib/pages";
import { useTheme } from "@/lib/theme-context";
import { useSession } from "@/store/session";
import { PopoverClose } from "@radix-ui/react-popover";
import { LogOutIcon, MoonIcon, SunIcon, UserIcon } from "lucide-react";
import { Link } from "react-router";

const ProfileButton = () => {
  const { theme, setTheme } = useTheme();
  const session = useSession();

  const { mutate: signOut, isPending: isSignOutPending } = useSignOut();

  if (!session) return null;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          type="button"
          size="icon"
          variant="secondary"
          className="rounded-full"
        >
          <UserIcon className="size-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="flex w-30 flex-col p-0">
        <PopoverClose asChild>
          <Link to={PRIVATE_PAGE_PATHS.PROFILE.getPath(session.user.id)}>
            <Button
              disabled={isSignOutPending}
              type="button"
              variant="ghost"
              className="w-full justify-start"
            >
              <UserIcon className="size-4" />
              프로필
            </Button>
          </Link>
        </PopoverClose>
        <Separator />
        <Button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          disabled={isSignOutPending}
          type="button"
          variant="ghost"
          className="w-full justify-start"
        >
          {theme === "dark" ? (
            <SunIcon className="size-4" />
          ) : (
            <MoonIcon className="size-4" />
          )}
          {theme === "dark" ? "라이트 모드" : "다크 모드"}
        </Button>
        <Separator />
        <PopoverClose asChild>
          <Button
            onClick={() => signOut()}
            disabled={isSignOutPending}
            type="button"
            variant="ghost"
            className="w-full justify-start"
          >
            <LogOutIcon className="size-4" />
            로그아웃
          </Button>
        </PopoverClose>
      </PopoverContent>
    </Popover>
  );
};

export default ProfileButton;

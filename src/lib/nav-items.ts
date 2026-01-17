import { BellIcon, HomeIcon, MessageCircleIcon, SearchIcon, SettingsIcon, type LucideIcon } from "lucide-react";
import { PRIVATE_PAGE_PATHS } from "./pages";
export type NavItem = {
  key: string;
  label:string;
  href: string;
  icon: LucideIcon;
}

export const NAV_ITEMS: NavItem[] = [
  {
    key: "HOME",
    label: "홈",
    href: PRIVATE_PAGE_PATHS.HOME.path,
    icon: HomeIcon,
  },
  {
    key: "SEARCH",
    label: "검색",
    href: PRIVATE_PAGE_PATHS.SEARCH.path,
    icon: SearchIcon,
  },
  {
    key: "DM",
    label: "DM",
    href: PRIVATE_PAGE_PATHS.DM.path,
    icon: MessageCircleIcon,
  },
  {
    key: "NOTIFICATIONS",
    label: "알림",
    href: PRIVATE_PAGE_PATHS.NOTIFICATIONS.path,
    icon: BellIcon,
  },
  {
    key: "SETTINGS",
    label: "설정",
    href: PRIVATE_PAGE_PATHS.SETTINGS.path,
    icon: SettingsIcon,
  },
]
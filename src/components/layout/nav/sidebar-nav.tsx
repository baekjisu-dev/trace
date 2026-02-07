import { Button } from "@/components/ui/button";
import { useDmUnreadData } from "@/hooks/queries/dm/use-dm-unread-data";
import { useNotificationCount } from "@/hooks/queries/notification/use-notification-count";
import { NAV_ITEMS, type NavItem } from "@/lib/nav-items";
import { cn } from "@/lib/utils";
import { useCallback } from "react";
import { Link } from "react-router";

interface SidebarNavProps {
  activeNavKey?: string;
}

const SidebarNav = ({ activeNavKey }: SidebarNavProps) => {
  const { data: notificationCount } = useNotificationCount();
  const { data: hasUnreadDm } = useDmUnreadData();

  const hasBadge = useCallback(
    (item: NavItem) => {
      if (item.key === "NOTIFICATIONS") {
        return notificationCount !== 0 && notificationCount !== undefined;
      }
      if (item.key === "DM") {
        return hasUnreadDm;
      }
      return false;
    },
    [notificationCount, hasUnreadDm]
  );

  return (
    <nav className="hidden md:flex w-40 h-full border-x flex-col gap-2 px-2 py-4">
      {NAV_ITEMS.map((item) => (
        <Link className="w-full box-border " key={item.key} to={item.href}>
          <Button
            variant="ghost"
            className={cn(
              "w-full justify-start text-muted-foreground gap-1",
              activeNavKey === item.key && "text-primary"
            )}
          >
            <item.icon
              className={cn(
                "size-4 stroke-2",
                activeNavKey === item.key && "stroke-3"
              )}
            />
            <div className="relative">
              <span
                className={cn(
                  "text-xs",
                  activeNavKey === item.key && "font-bold"
                )}
              >
                {item.label}
              </span>
              {hasBadge(item) && (
                <div className="w-2 h-2 bg-primary rounded-full absolute -right-2 -top-0.5" />
              )}
            </div>
          </Button>
        </Link>
      ))}
    </nav>
  );
};

export default SidebarNav;

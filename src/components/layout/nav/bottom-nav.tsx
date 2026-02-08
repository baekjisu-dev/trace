import { Button } from "@/components/ui/button";
import { useDmUnreadData } from "@/hooks/queries/dm/use-dm-unread-data";
import { useNotificationCount } from "@/hooks/queries/notification/use-notification-count";
import { NAV_ITEMS, type NavItem } from "@/lib/nav-items";
import { cn } from "@/lib/utils";
import { useCallback } from "react";
import { Link } from "react-router";

interface BottomNavProps {
  activeNavKey?: string;
}

const BottomNav = ({ activeNavKey }: BottomNavProps) => {
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
    <nav
      className="md:hidden border-t w-full px-4 pt-2 h-15 flex items-center justify-between gap-2 box-border"
      style={{
        paddingBottom: "calc(0.5rem + env(safe-area-inset-bottom))",
      }}
    >
      {NAV_ITEMS.map((item) => (
        <Link
          className="w-full h-full box-border"
          key={item.key}
          to={item.href}
        >
          <Button
            variant="ghost"
            className={cn(
              "w-full h-full flex-col text-muted-foreground gap-1",
              activeNavKey === item.key && "text-primary"
            )}
            size="icon-lg"
          >
            <div className="relative">
              <item.icon
                className={cn(
                  "size-4 stroke-2",
                  activeNavKey === item.key && "stroke-3"
                )}
              />
              {hasBadge(item) && (
                <div className="w-2 h-2 bg-primary rounded-full absolute -right-1.5 -top-0.5" />
              )}
            </div>
            <span
              className={cn(
                "text-xs",
                activeNavKey === item.key && "font-bold"
              )}
            >
              {item.label}
            </span>
          </Button>
        </Link>
      ))}
    </nav>
  );
};

export default BottomNav;

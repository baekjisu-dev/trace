import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useNotificationCount } from "@/hooks/queries/notification/use-notification-count";
import { NAV_ITEMS } from "@/lib/nav-items";
import { cn } from "@/lib/utils";
import { Link } from "react-router";

interface SidebarNavProps {
  activeNavKey?: string;
}

const SidebarNav = ({ activeNavKey }: SidebarNavProps) => {
  const { data: notificationCount, isFetching: isNotificationCountFetching } =
    useNotificationCount();

  return (
    <nav className="hidden md:flex w-40 h-full border-x flex-col gap-2 px-2 py-4">
      {NAV_ITEMS.map((item) => (
        <Link
          className="w-full box-border relative"
          key={item.key}
          to={item.href}
        >
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
            <span
              className={cn(
                "text-xs",
                activeNavKey === item.key && "font-bold"
              )}
            >
              {item.label}
            </span>
            {item.key === "NOTIFICATIONS" &&
              !isNotificationCountFetching &&
              notificationCount !== 0 &&
              notificationCount !== undefined && (
                <Badge
                  variant="default"
                  className="absolute -top-1 left-1/2 -translate-x-1/2 rounded-full p-0 w-5 h-5"
                >
                  {notificationCount}
                </Badge>
              )}
          </Button>
        </Link>
      ))}
    </nav>
  );
};

export default SidebarNav;

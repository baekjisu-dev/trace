import { useInfiniteNotifications } from "@/hooks/queries/notification/use-infinite-notifications";
import Loader from "../loader";
import Fallback from "../fallback";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import NotificationItem from "./notification-item";
import type { CommentNotification, LikeNotification } from "@/types";

const NotificationList = () => {
  const {
    data,
    error,
    isPending,
    isFetching,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteNotifications();
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage]);

  if (isPending && isFetching) return <Loader />;
  if (error) return <Fallback />;

  const notifications = data?.pages.flatMap((page) => page.notifications) || [];

  return (
    <div className="flex flex-col flex-1 overflow-auto p-2.5 gap-2.5">
      {notifications.length > 0 ? (
        notifications.map((notification) => (
          <NotificationItem
            key={notification.id}
            notification={
              notification as LikeNotification | CommentNotification
            }
          />
        ))
      ) : (
        <div className="text-center text-sm text-muted-foreground flex items-center justify-center h-full">
          도착한 알림이 없어요.
        </div>
      )}
      <div ref={ref} />
    </div>
  );
};

export default NotificationList;

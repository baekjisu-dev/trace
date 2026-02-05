import NotificationList from "@/components/notification/notification-list";
import { Button } from "@/components/ui/button";
import { useReadAllNotifications } from "@/hooks/mutations/notification/use-read-all-notifications";
import { useSession } from "@/store/session";

const NotificationPage = () => {
  const session = useSession();
  const userId = session?.user.id;
  const { mutate: readAllNotifications, isPending: isReadingAllNotifications } =
    useReadAllNotifications();

  const handleReadAllNotifications = () => {
    if (userId) {
      readAllNotifications(userId);
    }
  };

  return (
    <div className="h-full w-full flex flex-col">
      <div className="w-full flex justify-between items-center p-2.5">
        <p className="text-xl font-bold">알림</p>
        <Button
          variant="default"
          onClick={handleReadAllNotifications}
          disabled={isReadingAllNotifications}
        >
          모두 읽기
        </Button>
      </div>
      <NotificationList />
    </div>
  );
};

export default NotificationPage;

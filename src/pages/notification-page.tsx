import NotificationList from "@/components/notification/notification-list";
import { Button } from "@/components/ui/button";

const NotificationPage = () => {
  return (
    <div className="h-full w-full flex flex-col">
      <div className="w-full flex justify-between items-center p-2.5">
        <p className="text-xl font-bold">알림</p>
        <Button variant="default">모두 읽기</Button>
      </div>
      <NotificationList />
    </div>
  );
};

export default NotificationPage;

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { UserIcon } from "lucide-react";
import { useConversationData } from "@/hooks/queries/dm/use-conversation-data";
import { formatTimeAgo } from "@/lib/time";
import { useNavigate } from "react-router";
import { PRIVATE_PAGE_PATHS } from "@/lib/pages";

interface DmItemProps {
  dmId: number;
}

/** -----------------------------
 * @description DM 아이템
 * @param dmId DM ID
 * @returns DM 아이템 컴포넌트
 * ----------------------------- */
const DmItem = ({ dmId }: DmItemProps) => {
  const navigate = useNavigate();
  const {
    data: dmData,
    isPending: isDmDataPending,
    isFetching: isDmDataFetching,
  } = useConversationData({ conversationId: dmId });

  if (isDmDataPending || isDmDataFetching) return null;

  const handleNavigate = () => {
    navigate(PRIVATE_PAGE_PATHS.DM.getPath(dmId));
  };

  return (
    <div
      className="w-full flex items-center justify-between p-2.5 border rounded-md hover:bg-primary-foreground cursor-pointer relative"
      onClick={handleNavigate}
    >
      {/** 안 읽은 메시지 존재 시 알림 아이콘 */}
      {dmData && dmData.unread_count > 0 && (
        <div className="w-2 h-2 bg-primary rounded-full absolute left-2.5 top-2.5" />
      )}

      <div className="flex items-center gap-2 w-full">
        {/** 상대방 아바타 */}
        <Avatar size="lg">
          <AvatarImage src={dmData?.other_avatar_url ?? ""} />
          <AvatarFallback>
            <UserIcon className="size-8" />
          </AvatarFallback>
        </Avatar>
        {/** 상대방 정보 및 마지막 메시지 */}
        <div className="flex flex-col gap-1 flex-1">
          <div className="flex items-center justify-between w-full">
            <p className="text-sm font-bold line-clamp-1 flex-1">
              {dmData?.other_nickname}
            </p>
            <p className="text-xs text-muted-foreground">
              {formatTimeAgo(
                dmData?.last_message_at ?? dmData?.created_at ?? ""
              )}
            </p>
          </div>
          <p className="text-sm text-muted-foreground line-clamp-1">
            {dmData?.last_message_content ?? "아직 나눈 대화가 없어요."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DmItem;

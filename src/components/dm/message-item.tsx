import { cn } from "@/lib/utils";
import { useSession } from "@/store/session";
import type { MessageEntity } from "@/types";
import dayjs from "dayjs";

interface MessageItemProps {
  message: MessageEntity;
}

/** -----------------------------
 * @description 메시지 아이템
 * @param message 메시지 정보
 * @returns 메시지 아이템 컴포넌트
 * ----------------------------- */
const MessageItem = ({ message }: MessageItemProps) => {
  const session = useSession();

  // * 메시지 발신자 여부 체크
  const isSender = session?.user.id === message.sender_id;

  return (
    <div
      className={cn(
        "max-w-10/12 flex items-end gap-2",
        isSender ? "self-end flex-row-reverse" : "self-start flex-row"
      )}
    >
      <div
        className={cn(
          "flex-1 rounded-md p-2.5",
          isSender ? "bg-primary" : "bg-secondary"
        )}
      >
        <p
          className={cn(
            "text-sm whitespace-pre-wrap break-all",
            isSender ? "text-primary-foreground" : "text-secondary-foreground"
          )}
        >
          {message.content}
        </p>
      </div>
      <span className="text-xs text-muted-foreground">
        {dayjs(message.created_at).format("HH:mm")}
      </span>
    </div>
  );
};

export default MessageItem;

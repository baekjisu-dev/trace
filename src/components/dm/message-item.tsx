import { formatTimeAgo } from "@/lib/time";
import { cn } from "@/lib/utils";
import { useSession } from "@/store/session";
import type { MessageEntity } from "@/types";

interface MessageItemProps {
  message: MessageEntity;
}

const MessageItem = ({ message }: MessageItemProps) => {
  const session = useSession();

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
        {formatTimeAgo(message.created_at)}
      </span>
    </div>
  );
};

export default MessageItem;

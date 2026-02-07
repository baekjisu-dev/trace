import type { MessageEntity } from "@/types";

interface MessageItemProps {
  message: MessageEntity;
}

const MessageItem = ({ message }: MessageItemProps) => {
  return <div>{message.content}</div>;
};

export default MessageItem;

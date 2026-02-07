import { useInfiniteMessages } from "@/hooks/queries/dm/use-infinite-message";
import MessageItem from "./message-item";
import { useEffect } from "react";
import Loader from "../loader";

interface MessageListProps {
  conversationId: number;
}

const MessageList = ({ conversationId }: MessageListProps) => {
  const {
    data,
    isPending,
    isFetching,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteMessages({ conversationId });

  useEffect(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isPending && isFetching) return <Loader />;

  const messages = data?.pages.flatMap((page) => page.messages) || [];

  return (
    <div className="flex-1 overflow-auto p-2.5 flex flex-col gap-2.5">
      {messages.map((message) => (
        <MessageItem key={message.id} message={message} />
      ))}
    </div>
  );
};

export default MessageList;

import { useInfiniteMessages } from "@/hooks/queries/dm/use-infinite-message";
import MessageItem from "./message-item";
import { useEffect } from "react";
import Loader from "../loader";
import { useInView } from "react-intersection-observer";

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
  } = useInfiniteMessages(conversationId);
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isPending && isFetching) return <Loader />;

  const messages = data?.pages.flatMap((page) => page.items) || [];

  return messages.length > 0 ? (
    <div className="flex-1 overflow-auto p-2.5 flex gap-2.5 flex-col-reverse">
      {messages.map((message) => (
        <MessageItem key={message.id} message={message} />
      ))}
      <div ref={ref} />
    </div>
  ) : (
    <div className="w-full h-full flex items-center justify-center flex-1">
      <p className="text-center text-sm text-muted-foreground">
        대화를 시작해 볼까요?
      </p>
    </div>
  );
};

export default MessageList;

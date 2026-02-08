import { useInfiniteMessages } from "@/hooks/queries/dm/use-infinite-message";
import MessageItem from "./message-item";
import { Fragment, useEffect } from "react";
import Loader from "../loader";
import { useInView } from "react-intersection-observer";
import dayjs from "dayjs";

interface MessageListProps {
  conversationId: number;
}

/** -----------------------------
 * @description 메시지 리스트
 * @param conversationId 대화방 ID
 * @returns 메시지 리스트 컴포넌트
 * ----------------------------- */
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

  // * 메시지 무한 스크롤 핸들러 (가장 상단에 도달하면 다음 페이지 로드)
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isPending && isFetching) return <Loader />;

  const messages = data?.pages.flatMap((page) => page.items) || [];

  /** -----------------------------
   * @description 두 날짜 간 차이 체크 (하루 이상 차이 나면 날짜 표시)
   * @param date1 날짜 1
   * @param date2 날짜 2
   * @returns 두 날짜 간 차이 여부
   * ----------------------------- */
  const checkDateDiff = (date1: string, date2?: string) => {
    if (!date2) return false;

    const d1 = new Date(date1);
    const d2 = new Date(date2);
    return !(
      d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate()
    );
  };

  return messages.length > 0 ? (
    <div className="flex-1 overflow-auto p-2.5 flex gap-2.5 flex-col-reverse">
      {messages.map((message, index) => (
        <Fragment key={message.id}>
          {checkDateDiff(
            message.created_at,
            messages[index - 1]?.created_at
          ) && (
            <div className="w-full flex items-center justify-center my-2.5">
              <p className="text-sm text-muted-foreground bg-muted rounded-xl px-2.5 py-1">
                {dayjs(message.created_at).format("YYYY.MM.DD")}
              </p>
            </div>
          )}
          <MessageItem key={message.id} message={message} />
        </Fragment>
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

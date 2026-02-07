import { subscribeMessages } from "@/api/dm";
import MessageEditor from "@/components/dm/message-editor";
import MessageList from "@/components/dm/message-list";
import Loader from "@/components/loader";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useReadMessage } from "@/hooks/mutations/dm/use-read-message";
import { useConversationData } from "@/hooks/queries/dm/use-conversation-data";
import { QUERY_KEYS } from "@/lib/constants";
import type { MessageEntity, PageData } from "@/types";
import type { InfiniteData } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { UserIcon } from "lucide-react";
import { useEffect } from "react";
import { useParams } from "react-router";
const DmPage = () => {
  const { conversationId } = useParams();
  const queryClient = useQueryClient();

  const { mutate: markDmAsRead } = useReadMessage();
  const {
    data: conversationData,
    isPending: isConversationDataPending,
    isFetching: isConversationDataFetching,
  } = useConversationData({
    conversationId: conversationId ? Number(conversationId) : 0,
  });

  const updateQueryData = (message: MessageEntity) => {
    const conversationId = message.conversation_id;

    queryClient.setQueryData<InfiniteData<PageData<MessageEntity>>>(
      QUERY_KEYS.dm.conversation(conversationId),
      (prevMessages) => {
        if (!prevMessages) throw new Error("메시지가 존재하지 않습니다.");

        const exists = prevMessages.pages.some((page) =>
          page.items.some((item) => item.id === message.id)
        );
        if (exists) return prevMessages;

        const first = prevMessages.pages[0];

        const nextFirst = {
          ...first,
          items: [message, ...first.items],
        };

        return {
          ...prevMessages,
          pages: [nextFirst, ...prevMessages.pages.slice(1)],
        };
      }
    );
  };

  useEffect(() => {
    return () => {
      if (
        conversationData &&
        conversationId &&
        conversationData.unread_count > 0
      ) {
        markDmAsRead({ conversationId: Number(conversationId) });
      }
    };
  }, [conversationData?.unread_count, conversationId]);

  useEffect(() => {
    if (conversationId) {
      const unsubscribe = subscribeMessages(
        Number(conversationId),
        updateQueryData
      );

      return () => unsubscribe();
    }
  }, [conversationId]);

  if (
    (isConversationDataPending && isConversationDataFetching) ||
    !conversationData
  )
    return <Loader />;

  return (
    <div className="h-full w-full flex flex-col">
      <div className="w-full flex items-center gap-2 p-2.5">
        <Avatar>
          <AvatarImage src={conversationData.other_avatar_url ?? undefined} />
          <AvatarFallback>
            <UserIcon />
          </AvatarFallback>
        </Avatar>
        <span className="text-sm font-medium line-clamp-1">
          {conversationData.other_nickname}
        </span>
      </div>
      <MessageList conversationId={Number(conversationId)} />
      <MessageEditor conversationId={Number(conversationId)} />
    </div>
  );
};

export default DmPage;

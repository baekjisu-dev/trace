import { subscribeMessages } from "@/api/dm";
import MessageEditor from "@/components/dm/message-editor";
import MessageList from "@/components/dm/message-list";
import Loader from "@/components/loader";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useConversationData } from "@/hooks/queries/dm/use-conversation-data";
import { UserIcon } from "lucide-react";
import { useEffect } from "react";
import { useParams } from "react-router";

const DmPage = () => {
  const { conversationId } = useParams();

  const {
    data: conversationData,
    isPending: isConversationDataPending,
    isFetching: isConversationDataFetching,
  } = useConversationData({
    conversationId: conversationId ? Number(conversationId) : 0,
  });

  useEffect(() => {
    if (conversationId) {
      const unsubscribe = subscribeMessages(
        Number(conversationId),
        (message) => {
          console.log(message);
        }
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
      <MessageList />
      <MessageEditor conversationId={Number(conversationId)} />
    </div>
  );
};

export default DmPage;

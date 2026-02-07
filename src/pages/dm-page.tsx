import { subscribeMessages } from "@/api/dm";
import MessageEditor from "@/components/dm/message-editor";
import MessageList from "@/components/dm/message-list";
import { useEffect } from "react";
import { useParams } from "react-router";

const DmPage = () => {
  const { conversationId } = useParams();

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

  return (
    <div className="h-full w-full flex flex-col">
      <MessageList />
      <MessageEditor />
    </div>
  );
};

export default DmPage;

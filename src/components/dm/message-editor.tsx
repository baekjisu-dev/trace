import { useCreateMessage } from "@/hooks/mutations/dm/use-create-message";
import { Textarea } from "../ui/textarea";
import { useState } from "react";
import { SendIcon } from "lucide-react";
import { useSession } from "@/store/session";
import { Button } from "../ui/button";
import { toast } from "sonner";

interface MessageEditorProps {
  conversationId: number;
}

const MessageEditor = ({ conversationId }: MessageEditorProps) => {
  const session = useSession();
  const { mutate: createMessage, isPending: isCreatingMessage } =
    useCreateMessage({
      onSuccess: () => {
        setMessage("");
      },
      onError: () => {
        toast.error("메시지 전송에 실패했습니다. 잠시 후 다시 시도해 주세요.", {
          position: "top-center",
        });
      },
    });

  const [message, setMessage] = useState("");

  const handleCreateMessage = () => {
    if (!message.trim() || !session?.user.id || isCreatingMessage) return;

    createMessage({
      content: message,
      conversationId,
      senderId: session.user.id,
    });
  };

  return (
    <div className="w-full border-t p-2.5 flex items-center gap-2">
      <Textarea
        className="resize-none h-10"
        value={message}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleCreateMessage();
          }
        }}
        onChange={(e) => setMessage(e.target.value)}
      />
      <Button
        variant="default"
        size="icon"
        disabled={!message.trim() || isCreatingMessage}
        onClick={handleCreateMessage}
      >
        <SendIcon className="size-4" />
      </Button>
    </div>
  );
};

export default MessageEditor;

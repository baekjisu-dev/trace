import supabase from "@/lib/supabase";
import type { MessageEntity } from "@/types";

export const fetchOrCreateDm = async (userId: string) => {
  const { data, error } = await supabase.rpc("get_or_create_dm", {
    other_user_id: userId,
  });

  if (error) throw error;
  return data;
};

export const createMessage = async ({
  content,
  conversationId,
  senderId,
}: {
  content: string;
  conversationId: number;
  senderId: string;
}) => {
  const { data, error } = await supabase
    .from("messages")
    .insert({
      content,
      conversation_id: conversationId,
      sender_id: senderId,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const subscribeMessages = (
  conversationId: number,
  onInsert: (message: MessageEntity) => void
) => {
  return supabase
    .channel(`messages:${conversationId}`)
    .on(
      "postgres_changes",
      {
        event: "INSERT",
        schema: "public",
        table: "messages",
        filter: `conversation_id=eq.${conversationId}`,
      },
      (payload) => {
        onInsert(payload.new as MessageEntity);
      }
    )
    .subscribe();
};

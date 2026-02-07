import supabase from "@/lib/supabase";
import type { DmCursor, DmHeader, MessageEntity, PostCursor } from "@/types";

export const fetchOrCreateDm = async (userId: string) => {
  const { data, error } = await supabase.rpc("get_or_create_dm", {
    other_user_id: userId,
  });

  if (error) throw error;
  return data;
};

export const fetchDmList = async ({ cursor }: { cursor: DmCursor }) => {
  console.log(cursor);
  const { data, error } = await supabase.rpc("get_dm_list_page", {
    p_cursor_last_message_at: cursor?.lastMessageAt ?? undefined,
    p_cursor_conversation_id: cursor?.conversationId ?? undefined,
    p_limit: 30,
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
  const channel = supabase
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

  return () => {
    supabase.removeChannel(channel);
  };
};

export const fetchMessages = async ({
  cursor,
  conversationId,
}: {
  cursor: PostCursor;
  conversationId: number;
}) => {
  console.log(cursor);
  const { data, error } = await supabase.rpc("get_messages_page", {
    p_conversation_id: conversationId,
    p_cursor_created_at: cursor?.createdAt ?? undefined,
    p_cursor_id: cursor?.id ?? undefined,
    p_limit: 30,
  });

  if (error) throw error;
  return data;
};

export const fetchDmHeader = async (conversationId: number) => {
  const { data, error } = await supabase.rpc("get_dm_header", {
    p_conversation_id: conversationId,
  });

  if (error) throw error;
  return (data?.[0] ?? null) as DmHeader | null;
};

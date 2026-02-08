import supabase from "@/lib/supabase";
import type { DmCursor, DmHeader, MessageEntity, PostCursor } from "@/types";

/** -----------------------------
 * @description DM 관련 API
 * - DM 생성
 * - DM 조회
 * - DM 헤더 조회
 * - DM 읽음 처리
 * - DM 구독
 * ----------------------------- */

/** -----------------------------
 * @description DM 생성 - 이미 생성된 대화방이 있다면 단순 조회, 아니면 insert
 * @param userId 상대방 유저 ID
 * @returns DM 생성 결과
 * ----------------------------- */
export const fetchOrCreateDm = async (userId: string) => {
  const { data, error } = await supabase.rpc("get_or_create_dm", {
    other_user_id: userId,
  });

  if (error) throw error;
  return data;
};

/** -----------------------------
 * @description DM 리스트 조회
 * @param cursor DM 커서
 * @returns DM 리스트 조회 결과
 * ----------------------------- */
export const fetchDmList = async ({ cursor }: { cursor: DmCursor }) => {
  const { data, error } = await supabase.rpc("get_dm_list_page", {
    p_cursor_last_message_at: cursor?.lastMessageAt ?? undefined,
    p_cursor_conversation_id: cursor?.conversationId ?? undefined,
    p_limit: 30,
  });

  if (error) throw error;
  return data;
};

/** -----------------------------
 * @description 메시지 생성
 * @param content 메시지 내용
 * @param conversationId 대화방 ID
 * @param senderId 발신자 ID
 * @returns 메시지 생성 결과
 * ----------------------------- */
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

/** -----------------------------
 * @description 메시지 리스트 조회
 * @param cursor 메시지 커서
 * @param conversationId 대화방 ID
 * @returns 메시지 리스트 조회 결과
 * ----------------------------- */
export const fetchMessages = async ({
  cursor,
  conversationId,
}: {
  cursor: PostCursor;
  conversationId: number;
}) => {
  const { data, error } = await supabase.rpc("get_messages_page", {
    p_conversation_id: conversationId,
    p_cursor_created_at: cursor?.createdAt ?? undefined,
    p_cursor_id: cursor?.id ?? undefined,
    p_limit: 30,
  });

  if (error) throw error;
  return data;
};

/** -----------------------------
 * @description DM 헤더 조회 - 헤더: DM의 메타 정보
 * @param conversationId 대화방 ID
 * @returns DM 헤더 조회 결과
 * ----------------------------- */
export const fetchDmHeader = async (conversationId: number) => {
  const { data, error } = await supabase.rpc("get_dm_header", {
    p_conversation_id: conversationId,
  });

  if (error) throw error;
  return (data?.[0] ?? null) as DmHeader | null;
};

/** -----------------------------
 * @description DM 읽음 처리
 * @param conversationId 대화방 ID
 * @returns DM 읽음 처리 결과
 * ----------------------------- */
export const markDmAsRead = async ({
  conversationId,
}: {
  conversationId: number;
}) => {
  const { data, error } = await supabase
    .from("conversation_participants")
    .update({ last_read_at: new Date().toISOString() })
    .eq("conversation_id", conversationId)
    .select()
    .single();

  if (error) throw error;
  return data;
};

/** -----------------------------
 * @description 메시지 구독
 * @param conversationId 대화방 ID
 * @param onInsert 메시지 삽입 콜백
 * @returns 구독 해제 함수
 * ----------------------------- */
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

/** -----------------------------
 * @description 수신 메시지 구독
 * @param userId 유저 ID
 * @param onIncoming 수신 메시지 콜백
 * @returns 구독 해제 함수
 * ----------------------------- */
export const subscribeIncomingDm = ({
  userId,
  onIncoming,
}: {
  userId: string;
  onIncoming: (message: MessageEntity) => void;
}) => {
  const channel = supabase
    .channel(`dm-incoming:${userId}`)
    .on(
      "postgres_changes",
      {
        event: "INSERT",
        schema: "public",
        table: "messages",
        filter: `sender_id=neq.${userId}`,
      },
      (payload) => {
        const msg = payload.new as MessageEntity;

        onIncoming(msg);
      }
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
};

/** -----------------------------
 * @description 안 읽은 DM 존재 여부 체크
 * @returns 안 읽은 DM 존재 여부
 * ----------------------------- */
export const fetchHasUnreadDm = async () => {
  const { data, error } = await supabase.rpc("has_unread_dm");

  if (error) throw error;
  return data ?? false;
};

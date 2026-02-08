import supabase from "@/lib/supabase";
import type { NotificationEntity, PostCursor } from "@/types";

const PAGE_SIZE = 15;

/** -----------------------------
 * @description 알림 관련 API
 * - 알림 조회
 * - 알림 구독
 * - 알림 읽음 처리
 * - 모든 알림 읽음 처리
 * ----------------------------- */

/** -----------------------------
 * @description 알림 개수 조회
 * @param userId 유저 ID
 * @returns 알림 개수
 * ----------------------------- */
export const fetchNotificationsCount = async (userId: string) => {
  const { count, error } = await supabase
    .from("notifications")
    .select("*", { count: "exact", head: true })
    .eq("user_id", userId)
    .eq("is_read", false);

  if (error) throw error;
  return count;
};

/** -----------------------------
 * @description 알림 조회
 * @param cursor 커서
 * @param userId 유저 ID
 * @returns 알림 조회 결과
 * ----------------------------- */
export const fetchNotifications = async ({
  cursor,
  userId,
}: {
  cursor: PostCursor;
  userId: string;
  authorId?: string;
  searchText?: string;
}) => {
  let query = supabase
    .from("notifications")
    .select("*, actor: profile!actor_id (*)")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(PAGE_SIZE);

  if (cursor) {
    query = query.or(
      `created_at.lt.${cursor.createdAt},and(created_at.eq.${cursor.createdAt},id.lt.${cursor.id})`
    );
  }

  const { data, error } = await query;

  if (error) throw error;
  return {
    items: data,
    nextCursor:
      data.length === PAGE_SIZE
        ? {
            createdAt: data[data.length - 1].created_at,
            id: data[data.length - 1].id,
          }
        : null,
  };
};

/** -----------------------------
 * @description 알림 구독
 * @param userId 유저 ID
 * @param onInsert 알림 삽입 콜백
 * @returns 구독 해제 함수
 * ----------------------------- */
export const subscribeNotificationInserts = ({
  userId,
  onInsert,
}: {
  userId: string;
  onInsert: (row: NotificationEntity) => void;
}) => {
  const channel = supabase
    .channel(`notifications:${userId}`)
    .on(
      "postgres_changes",
      {
        event: "INSERT",
        schema: "public",
        table: "notifications",
        filter: `user_id=eq.${userId}`,
      },
      (payload) => {
        onInsert(payload.new as NotificationEntity);
      }
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
};

/** -----------------------------
 * @description 알림 읽음 처리
 * @param notificationId 알림 ID
 * @returns 알림 읽음 처리 결과
 * ----------------------------- */
export const markNotificationAsRead = async (notificationId: number) => {
  const { data, error } = await supabase
    .from("notifications")
    .update({ is_read: true })
    .eq("id", notificationId)
    .select()
    .single();

  if (error) throw error;
  return data;
};

/** -----------------------------
 * @description 모든 알림 읽음 처리
 * @param userId 유저 ID
 * @returns 모든 알림 읽음 처리 결과
 * ----------------------------- */
export const markAllNotificationsAsRead = async (userId: string) => {
  const { data, error } = await supabase
    .from("notifications")
    .update({ is_read: true })
    .eq("user_id", userId)
    .eq("is_read", false)
    .select();

  if (error) throw error;
  return data;
};

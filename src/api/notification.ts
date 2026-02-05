import supabase from "@/lib/supabase";
import type { NotificationEntity, PostCursor } from "@/types";

const PAGE_SIZE = 15;

export const fetchNotificationsCount = async (userId: string) => {
  const { count, error } = await supabase
    .from("notifications")
    .select("*", { count: "exact", head: true })
    .eq("user_id", userId)
    .eq("is_read", false);

  if (error) throw error;
  return count;
};

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
    .subscribe((status) => {
      console.log("[realtime] status:", status);
    });

  return () => {
    supabase.removeChannel(channel);
  };
};

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

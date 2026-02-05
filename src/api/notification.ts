import supabase from "@/lib/supabase";
import type { NotificationEntity } from "@/types";

export const fetchNotificationsCount = async (userId: string) => {
  const { count, error } = await supabase
    .from("notifications")
    .select("*", { count: "exact", head: true })
    .eq("user_id", userId)
    .eq("is_read", false);

  if (error) throw error;
  return count;
};

export const fetchNotifications = async (userId: string) => {
  const { data, error } = await supabase
    .from("notifications")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
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

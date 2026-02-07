import { subscribeIncomingDm } from "@/api/dm";
import { subscribeNotificationInserts } from "@/api/notification";
import GlobalLoader from "@/components/global-loader";
import { useProfileData } from "@/hooks/queries/profile/use-profile-data";
import { QUERY_KEYS } from "@/lib/constants";
import supabase from "@/lib/supabase";
import { useIsSessionLoaded, useSession, useSetSession } from "@/store/session";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, type ReactNode } from "react";

const SessionProvider = ({ children }: { children: ReactNode }) => {
  const queryClient = useQueryClient();
  const session = useSession();
  const setSession = useSetSession();
  const isSessionLoaded = useIsSessionLoaded();

  const { isFetching, isPending } = useProfileData(session?.user.id);

  useEffect(() => {
    supabase.auth.onAuthStateChange((_, session) => {
      setSession(session);
    });
  }, []);

  useEffect(() => {
    if (session?.user.id) {
      const unsubscribe = subscribeNotificationInserts({
        userId: session.user.id,
        onInsert: () => {
          queryClient.setQueryData(
            QUERY_KEYS.notification.count(session.user.id),
            (old: number) => old + 1
          );

          queryClient.invalidateQueries({
            queryKey: QUERY_KEYS.notification.list(session.user.id),
          });
        },
      });

      const unsubscribeDm = subscribeIncomingDm({
        userId: session.user.id,
        onIncoming: () => {
          queryClient.invalidateQueries({
            queryKey: QUERY_KEYS.dm.hasUnread,
          });

          queryClient.invalidateQueries({
            queryKey: QUERY_KEYS.dm.list,
          });
        },
      });

      return () => {
        unsubscribe();
        unsubscribeDm();
      };
    }
  }, [session?.user.id]);

  if (!isSessionLoaded) return <GlobalLoader />;
  if (isFetching && isPending) return <GlobalLoader />;

  return children;
};

export default SessionProvider;

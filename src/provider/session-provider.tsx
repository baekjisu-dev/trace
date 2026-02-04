import GlobalLoader from "@/components/global-loader";
import { useProfileData } from "@/hooks/queries/profile/use-profile-data";
import supabase from "@/lib/supabase";
import { useIsSessionLoaded, useSession, useSetSession } from "@/store/session";
import { useEffect, type ReactNode } from "react";

const SessionProvider = ({ children }: { children: ReactNode }) => {
  const session = useSession();
  const setSession = useSetSession();
  const isSessionLoaded = useIsSessionLoaded();

  const { isPending: isProfilePending } = useProfileData(session?.user.id);

  useEffect(() => {
    supabase.auth.onAuthStateChange((_, session) => {
      setSession(session);
    });
  }, []);

  if (!isSessionLoaded) return <GlobalLoader />;
  if (isProfilePending) return <GlobalLoader />;

  return children;
};

export default SessionProvider;

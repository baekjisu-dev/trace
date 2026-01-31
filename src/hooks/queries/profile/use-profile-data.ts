import { createProfile, getProfile } from "@/api/profile";
import { QUERY_KEYS } from "@/lib/constants";
import { useSession } from "@/store/session";
import type { PostgrestError } from "@supabase/supabase-js";
import { useQuery } from "@tanstack/react-query";

export const useProfileData = (userId?: string) => {
  const session = useSession();
  const isMine = userId === session?.user?.id;

  return useQuery({
    queryKey: QUERY_KEYS.profile.byId(userId!),
    queryFn: async () => {
      try {
        const profile = await getProfile(userId!);
        return profile;
      } catch (error) {
        if (isMine && (error as PostgrestError).code === "PGRST116") {
          await createProfile(userId!);
        }
        throw error;
      }
    },
    enabled: !!userId,
    staleTime: 60_000,
  });
};

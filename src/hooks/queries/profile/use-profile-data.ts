import { createProfile, getProfile } from "@/api/profile";
import { QUERY_KEYS } from "@/lib/constants";
import { useSession } from "@/store/session";
import type { PostgrestError } from "@supabase/supabase-js";
import { useQuery } from "@tanstack/react-query";

/** -----------------------------
 * @description 프로필 데이터 조회
 * @param userId 유저 ID
 * @returns 프로필 데이터 조회
 * ----------------------------- */
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
        // * 프로필이 없을 경우 (첫 로그인일 경우) 생성
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

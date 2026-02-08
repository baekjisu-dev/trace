import type { ProfileEntity } from "@/types";

interface ReadonlyProfileProps {
  profile?: ProfileEntity;
}

/** -----------------------------
 * @description 읽기 전용 프로필 컴포넌트
 * @param profile 프로필 정보
 * @returns 읽기 전용 프로필 컴포넌트
 * ----------------------------- */
const ReadonlyProfile = ({ profile }: ReadonlyProfileProps) => {
  return (
    <div className="flex flex-col items-center gap-1">
      <p className="text-2xl font-bold">{profile?.nickname}</p>
      <p className="text-sm text-muted-foreground line-clamp-2 h-12 whitespace-pre-wrap break-all">
        {profile?.bio || "자기소개가 없어요."}
      </p>
    </div>
  );
};

export default ReadonlyProfile;

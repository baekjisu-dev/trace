import { generateRandomNickname } from "@/lib/name";
import supabase from "@/lib/supabase";
import { deleteImagesInPath, uploadImage } from "./image";

/** -----------------------------
 * @description 프로필 관련 API
 * - 프로필 조회
 * - 프로필 생성
 * - 프로필 수정
 * ----------------------------- */

/** -----------------------------
 * @description 프로필 조회
 * @param userId 유저 ID
 * @returns 프로필 조회 결과
 * ----------------------------- */
export const getProfile = async (userId: string) => {
  const { data, error } = await supabase
    .from("profile")
    .select()
    .eq("id", userId)
    .single();

  if (error) throw error;
  return data;
};

/** -----------------------------
 * @description 프로필 생성 - 로그인 시 최초 1회
 * @param userId 유저 ID
 * @returns 프로필 생성 결과
 * ----------------------------- */
export const createProfile = async (userId: string) => {
  const nickname = generateRandomNickname(userId);

  const { data, error } = await supabase
    .from("profile")
    .insert({
      id: userId,
      nickname,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
};

/** -----------------------------
 * @description 프로필 수정
 * @param userId 유저 ID
 * @param nickname 닉네임
 * @param bio 소개
 * @param avatarImageFile 아바타 이미지 파일
 * @returns 프로필 수정 결과
 * ----------------------------- */
export const updateProfile = async ({
  userId,
  nickname,
  bio,
  avatarImageFile,
}: {
  userId: string;
  nickname?: string;
  bio?: string;
  avatarImageFile?: File;
}) => {
  let newAvatarImageUrl;
  if (avatarImageFile) {
    await deleteImagesInPath(`${userId}/avatar`);

    const fileExtension = avatarImageFile.name.split(".").pop() || "webp";
    const filePath = `${userId}/avatar/${new Date().getTime()}-${crypto.randomUUID()}.${fileExtension}`;

    newAvatarImageUrl = await uploadImage({
      file: avatarImageFile,
      filePath,
    });
  }

  const { data, error } = await supabase
    .from("profile")
    .update({
      nickname,
      bio,
      avatar_url: newAvatarImageUrl,
    })
    .eq("id", userId)
    .select()
    .single();

  if (error) throw error;
  return data;
};

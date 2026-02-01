import { generateRandomNickname } from "@/lib/name";
import supabase from "@/lib/supabase";
import { deleteImagesInPath, uploadImage } from "./image";

export const getProfile = async (userId: string) => {
  const { data, error } = await supabase
    .from("profile")
    .select()
    .eq("id", userId)
    .single();

  if (error) throw error;
  return data;
};

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

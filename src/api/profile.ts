import { generateRandomNickname } from "@/lib/name";
import supabase from "@/lib/supabase";

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

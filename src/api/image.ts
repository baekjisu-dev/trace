import { BUCKET_NAME } from "@/lib/constants";
import supabase from "@/lib/supabase";

/** -----------------------------
 * @description 이미지 업로드 API
 * - 이미지 업로드
 * - 이미지 삭제
 * ----------------------------- */

/** -----------------------------
 * @description 이미지 업로드
 * @param file 업로드할 파일
 * @param filePath 파일 경로
 * @returns 업로드된 이미지 URL
 * ----------------------------- */
export const uploadImage = async ({
  file,
  filePath,
}: {
  file: File;
  filePath: string;
}) => {
  const { data, error } = await supabase.storage
    .from(BUCKET_NAME)
    .upload(filePath, file);

  if (error) throw error;

  const {
    data: { publicUrl },
  } = supabase.storage.from(BUCKET_NAME).getPublicUrl(data.path);

  return publicUrl;
};

/** -----------------------------
 * @description 이미지 삭제
 * @param path 파일 경로
 * @returns 이미지 삭제 결과
 * ----------------------------- */
export const deleteImagesInPath = async (path: string) => {
  const { data: files, error: fetchFilesError } = await supabase.storage
    .from(BUCKET_NAME)
    .list(path);

  if (!files || files.length === 0) return;
  if (fetchFilesError) throw fetchFilesError;

  const { error: removeError } = await supabase.storage
    .from(BUCKET_NAME)
    .remove(files.map((file) => `${path}/${file.name}`));

  if (removeError) throw removeError;
};

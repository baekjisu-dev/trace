import supabase from "@/lib/supabase";

/** -----------------------------
 * @description 로그인, 회원가입 등 인증 관련 API
 * - 회원가입
 * - 로그인
 * - 로그아웃
 * - 구글 로그인
 * - 카카오 로그인
 * ----------------------------- */

/** -----------------------------
 * @description 회원가입
 * @param email 이메일
 * @param password 비밀번호
 * @returns 회원가입 결과
 * ----------------------------- */
export const signUp = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    throw error;
  }

  return data;
};

/** -----------------------------
 * @description 로그인
 * @param email 이메일
 * @param password 비밀번호
 * @returns 로그인 결과
 * ----------------------------- */
export const signIn = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;

  return data;
};

/** -----------------------------
 * @description 구글 로그인
 * @returns 구글 로그인 결과
 * ----------------------------- */
export const signInWithGoogle = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
  });

  if (error) throw error;

  return data;
};

/** -----------------------------
 * @description 카카오 로그인
 * @returns 카카오 로그인 결과
 * ----------------------------- */
export const signInWithKakao = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "kakao",
  });

  if (error) throw error;

  return data;
};

/** -----------------------------
 * @description 로그아웃
 * @returns 로그아웃 결과
 * ----------------------------- */
export const signOut = async () => {
  const { error } = await supabase.auth.signOut();

  if (error) {
    // * 로그아웃 실패 시 로컬 세션 제거
    await supabase.auth.signOut({
      scope: "local",
    });
  }
};

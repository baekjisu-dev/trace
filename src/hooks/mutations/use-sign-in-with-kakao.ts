import { signInWithKakao } from "@/api/auth";
import { useMutation } from "@tanstack/react-query";

export const useSignInWithKakao = () => {
  return useMutation({
    mutationFn: signInWithKakao,
  });
};

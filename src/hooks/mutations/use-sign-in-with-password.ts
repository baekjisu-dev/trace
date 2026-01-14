import { signIn } from "@/api/auth";
import { useMutation } from "@tanstack/react-query";

export const useSignInWithPassword = () => {
  return useMutation({
    mutationFn: signIn,
  });
};

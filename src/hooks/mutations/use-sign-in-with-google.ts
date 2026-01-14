import { signInWithGoogle } from "@/api/auth";
import { useMutation } from "@tanstack/react-query";

export const useSignInWithGoogle = () => {
  return useMutation({
    mutationFn: signInWithGoogle,
  });
};

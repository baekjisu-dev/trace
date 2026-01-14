import { type Database } from "@/database.types";

export type TestEntity = Database["public"]["Tables"]["test"]["Row"];

export type UseMutationCallback = {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
  onMutate?: () => void;
  onSettled?: () => void;
};

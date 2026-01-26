import { type Database } from "@/database.types";

export type TestEntity = Database["public"]["Tables"]["test"]["Row"];

export type UseMutationCallback = {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
  onMutate?: () => void;
  onSettled?: () => void;
};

export type Book = {
  title: string;
  contents: string;
  url: string;
  isbn: string;
  datetime: string;
  authors: string[];
  publisher: string;
  price: number;
  sale_price: number;
  thumbnail: string;
  category: string;
}

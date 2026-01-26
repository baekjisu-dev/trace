import BooksSearchModal from "@/components/modal/books-search-modal";
import type { ReactNode } from "react";
import { createPortal } from "react-dom";

export default function ModalProvider({ children }: { children: ReactNode }) {
  return (
    <>
      {createPortal(
        <>
          <BooksSearchModal />
        </>,
        document.getElementById("modal-root")!,
      )}
      {children}
    </>
  );
}

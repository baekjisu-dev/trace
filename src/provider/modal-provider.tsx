import BooksSearchModal from "@/components/modal/books-search-modal";
import MessageLoader from "@/components/message-loader";
import type { ReactNode } from "react";
import { createPortal } from "react-dom";
import AlertModal from "@/components/modal/alert-modal";
import PostEditModal from "@/components/modal/post-edit-modal";
import ImageLightbox from "@/components/lightbox/image-lightbox";

export default function ModalProvider({ children }: { children: ReactNode }) {
  return (
    <>
      {createPortal(
        <>
          <BooksSearchModal />
          <MessageLoader />
          <AlertModal />
          <PostEditModal />
          <ImageLightbox />
        </>,
        document.getElementById("modal-root")!,
      )}
      {children}
    </>
  );
}

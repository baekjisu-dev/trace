import { useImageLightboxModalStore } from "@/store/image-lightbox-modal";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

const ImageLightbox = () => {
  const {
    isOpen,
    imageUrls,
    currentIndex,
    actions: { close, setCurrentIndex },
  } = useImageLightboxModalStore();

  return (
    <Lightbox
      open={isOpen}
      slides={imageUrls}
      index={currentIndex}
      close={close}
      controller={{
        disableSwipeNavigation: imageUrls.length === 1,
      }}
      render={{
        buttonPrev: imageUrls.length > 1 ? undefined : () => null,
        buttonNext: imageUrls.length > 1 ? undefined : () => null,
      }}
      on={{
        view: ({ index }) => {
          setCurrentIndex(index);
        },
      }}
    />
  );
};

export default ImageLightbox;

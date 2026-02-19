import { useImageLightboxModalStore } from "@/store/image-lightbox-modal";
import Counter from "yet-another-react-lightbox/plugins/counter";
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Download from "yet-another-react-lightbox/plugins/download";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/counter.css";

/**
 * @description Image Lightbox 컴포넌트
 * @returns Image Lightbox
 */
const ImageLightbox = () => {
  const {
    isOpen,
    imageUrls,
    currentIndex,
    actions: { close, setCurrentIndex },
  } = useImageLightboxModalStore();

  /**  -----------------------------
   * TODO: 버튼 커스터마이징
   * ----------------------------- */
  return (
    <Lightbox
      plugins={[Counter, Zoom, Download]}
      styles={{ root: { "--yarl__color_backdrop": "rgba(40, 28, 30, 0.45)" } }}
      counter={{ container: { style: { top: "unset", bottom: 0 } } }}
      zoom={{
        minZoom: 0.1,
        maxZoomPixelRatio: 10,
        scrollToZoom: true,
      }}
      carousel={{
        finite: true,
      }}
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
        buttonZoom: () => null,
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

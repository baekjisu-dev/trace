import { Carousel, CarouselContent } from "@/components/ui/carousel";
import ImageItem from "./image-item";
import { useOpenImageLightboxModal } from "@/store/image-lightbox-modal";

interface ImageCarouselProps {
  images: string[];
  onDelete?: (index: number) => void;
}

/** -----------------------------
 * @description 이미지 캐러셀
 * @param images 이미지 리스트
 * @param onDelete 이미지 삭제 핸들러
 * @returns 이미지 캐러셀 컴포넌트
 * ----------------------------- */
const ImageCarousel = ({ images, onDelete }: ImageCarouselProps) => {
  const openImageLightbox = useOpenImageLightboxModal();

  const handleOpenImageLightbox = (index: number) => {
    openImageLightbox(
      images.map((image) => ({ src: image, alt: "image in post" })),
      index,
    );
  };

  return (
    <Carousel className="p-2.5">
      <CarouselContent className="w-full">
        {images.map((image, index) => (
          <ImageItem
            key={image + index}
            image={image}
            index={index}
            onDelete={onDelete}
            onClick={() => handleOpenImageLightbox(index)}
          />
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default ImageCarousel;

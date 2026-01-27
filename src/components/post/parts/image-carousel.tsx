import { Carousel, CarouselContent } from "@/components/ui/carousel";
import ImageItem from "./image-item";

interface ImageCarouselProps {
  images: string[];
  onDelete?: (index: number) => void;
}

const ImageCarousel = ({ images, onDelete }: ImageCarouselProps) => {
  return (
    <Carousel className="p-2.5">
      <CarouselContent className="w-full">
        {images.map((image, index) => (
          <ImageItem
            key={image + index}
            image={image}
            index={index}
            onDelete={onDelete}
          />
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default ImageCarousel;

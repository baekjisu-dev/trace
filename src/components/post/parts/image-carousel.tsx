import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

interface ImageCarouselProps {
  images: string[];
}

const ImageCarousel = ({ images }: ImageCarouselProps) => {
  return (
    <Carousel className="p-2.5">
      <CarouselContent className="w-full">
        {images.map((image, index) => (
          <CarouselItem className="basis-3/5" key={image + index}>
            <div className="overflow-hidden rounded-xl">
              <img
                src={image}
                alt="image"
                className="w-full h-full max-h-[30vh] object-cover"
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default ImageCarousel;

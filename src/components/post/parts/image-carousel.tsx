import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"

interface ImageCarouselProps {
  images: string[]
}

const ImageCarousel = ({ images }: ImageCarouselProps) => {
  return (
    <Carousel className="p-2.5">
      <CarouselContent className="w-full">
        {images.map((image, index) => (
          <CarouselItem className="basis-2/5" key={image + index}>
            <img src={image} alt="image" className="w-full max-h-[250px] rounded-sm object-cover" />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  )
}

export default ImageCarousel
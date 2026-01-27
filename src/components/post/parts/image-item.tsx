import { Button } from "@/components/ui/button";
import { CarouselItem } from "@/components/ui/carousel";
import { XIcon } from "lucide-react";
import { useState } from "react";

interface ImageItemProps {
  image: string;
  index: number;
  onDelete?: (index: number) => void;
}

const ImageItem = ({ image, index, onDelete }: ImageItemProps) => {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <CarouselItem
      className="basis-3/5"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="overflow-hidden rounded-xl relative">
        <img
          src={image}
          alt="image"
          className="w-full h-full max-h-[30vh] object-cover"
        />
        {onDelete && isHovering && (
          <Button
            className="absolute top-2 right-2 bg-primary-foreground/60 hover:bg-primary-foreground/80 cursor-pointer rounded-full"
            variant="secondary"
            size="icon-sm"
            onClick={() => onDelete(index)}
          >
            <XIcon className="size-4" />
          </Button>
        )}
      </div>
    </CarouselItem>
  );
};

export default ImageItem;

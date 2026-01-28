import { Button } from "@/components/ui/button";
import { CarouselItem } from "@/components/ui/carousel";
import { XIcon } from "lucide-react";

interface ImageItemProps {
  image: string;
  index: number;
  onDelete?: (index: number) => void;
}

const ImageItem = ({ image, index, onDelete }: ImageItemProps) => {
  return (
    <CarouselItem className="basis-3/5">
      <div className="overflow-hidden rounded-xl relative group">
        <img
          src={image}
          alt="image"
          className="w-full h-full max-h-[30vh] object-cover"
        />
        {onDelete && (
          <Button
            className="absolute top-2 right-2 bg-primary-foreground/60 inline-flex md:hidden md:group-hover:inline-flex hover:bg-primary-foreground/80 cursor-pointer rounded-full"
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

import { Button } from "@/components/ui/button";
import { CarouselItem } from "@/components/ui/carousel";
import { XIcon } from "lucide-react";

interface ImageItemProps {
  image: string;
  index: number;
  onDelete?: (index: number) => void;
  onClick?: () => void;
}

/** -----------------------------
 * @description 이미지 아이템
 * @param image 이미지 URL
 * @param index 이미지 인덱스
 * @param onDelete 이미지 삭제 핸들러
 * @returns 이미지 아이템 컴포넌트
 * ----------------------------- */
const ImageItem = ({ image, index, onDelete, onClick }: ImageItemProps) => {
  return (
    <CarouselItem className="basis-3/5">
      <div className="overflow-hidden rounded-xl relative group">
        <img
          src={image}
          alt="image"
          className="w-full h-full max-h-[30vh] object-cover"
          onClick={onClick}
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

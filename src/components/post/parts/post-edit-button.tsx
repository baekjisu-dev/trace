import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"
import { EllipsisVerticalIcon, PencilIcon, Trash2Icon } from "lucide-react"

const PostEditButton = () => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="rounded-full" variant="ghost" size="icon">
          <EllipsisVerticalIcon className="size-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="flex flex-col p-0 w-30">
        <Button className="w-full justify-start" variant="ghost">
          <PencilIcon className="size-4" />
          수정
        </Button>
        <Separator />
        <Button className="w-full justify-start" variant="ghost">
          <Trash2Icon className="size-4" />
          삭제
        </Button>
      </PopoverContent>
    </Popover>
  )
}

export default PostEditButton
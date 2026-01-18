import PopoverButton from "@/components/ui/popover-button"
import { PencilIcon, Trash2Icon } from "lucide-react"

const PostEditButton = () => {
  return (
    <PopoverButton  buttonList={[
      { icon: PencilIcon, label: "수정" },
      { icon: Trash2Icon, label: "삭제" },
    ]} />
  )
}

export default PostEditButton
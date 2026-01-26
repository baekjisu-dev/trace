import { UserIcon } from "lucide-react";
import { Button } from "../ui/button";
import PostEditButton from "./parts/post-edit-button";

const PostItem = () => {
  return (
    <div className="w-full p-2.5 border rounded-md">
      <div className="flex items-center justify-between w-full">
        <div className="w-full flex items-center gap-2">
          <Button className="rounded-full" variant="secondary" size="icon">
            <UserIcon className="size-4" />
          </Button>
          <div className="flex flex-col">
            <p className="text-sm">작성자</p>
            <p className="text-xs text-muted-foreground">2026-01-18</p>
          </div>
        </div>
        <PostEditButton />
      </div>
    </div>
  );
};

export default PostItem;

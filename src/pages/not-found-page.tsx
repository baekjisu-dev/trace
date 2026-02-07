import Fallback from "@/components/fallback";
import { Button } from "@/components/ui/button";
import { PRIVATE_PAGE_PATHS } from "@/lib/pages";
import { Link } from "react-router";

const NotFoundPage = () => {
  return (
    <div className="h-full w-full flex items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-4">
        <Fallback message="존재하지 않는 페이지입니다." />
        <Button variant="default" asChild>
          <Link to={PRIVATE_PAGE_PATHS.HOME.path}>홈으로 이동</Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFoundPage;

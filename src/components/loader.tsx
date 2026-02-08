import { LoaderCircleIcon } from "lucide-react";

/** -----------------------------
 * @description 로딩 컴포넌트
 * @returns 로딩 컴포넌트
 * ----------------------------- */
const Loader = () => {
  return (
    <div className="text-muted-foreground flex flex-col items-center justify-center gap-5">
      <LoaderCircleIcon className="animate-spin" />
      <div className="text-sm">데이터를 불러오는 중 입니다.</div>
    </div>
  );
};

export default Loader;

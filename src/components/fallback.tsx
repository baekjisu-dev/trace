import { TriangleAlert } from "lucide-react";

interface FallbackProps {
  message?: string;
}

/** -----------------------------
 * @description 폴백 컴포넌트
 * @param message 메시지
 * @returns 폴백 컴포넌트
 * ----------------------------- */
const Fallback = ({
  message = "오류가 발생했습니다. 잠시 후 다시 시도해주세요",
}: FallbackProps) => {
  return (
    <div className="text-muted-foreground flex flex-col items-center justify-center gap-2">
      <TriangleAlert className="h-6 w-6" />
      <div>{message}</div>
    </div>
  );
};

export default Fallback;

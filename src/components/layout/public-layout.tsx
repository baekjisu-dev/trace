import { PRIVATE_PAGE_PATHS } from "@/lib/pages";
import { useSession } from "@/store/session";
import { Navigate, Outlet } from "react-router";

/** -----------------------------
 * @description 퍼블릭 레이아웃 - 로그인 상태가 아닐 때만 표시
 * @returns 퍼블릭 레이아웃 컴포넌트
 * ----------------------------- */
const PublicLayout = () => {
  const session = useSession();
  // * 로그인 상태일 때 홈 페이지로 리다이렉트
  if (session) return <Navigate to={PRIVATE_PAGE_PATHS.HOME.path} replace />;

  return <Outlet />;
};

export default PublicLayout;

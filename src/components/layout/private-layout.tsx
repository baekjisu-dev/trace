import { useSession } from "@/store/session";
import { Navigate, Outlet, useLocation } from "react-router";
import Header from "./header/header";
import BottomNav from "./nav/bottom-nav";
import SidebarNav from "./nav/sidebar-nav";
import { PUBLIC_PAGE_PATHS } from "@/lib/pages";
import { useMemo } from "react";
import { NAV_ITEMS } from "@/lib/nav-items";

/** -----------------------------
 * @description 프라이빗 레이아웃 - 로그인 상태일 때만 표시
 * @returns 프라이빗 레이아웃 컴포넌트
 * ----------------------------- */
const PrivateLayout = () => {
  const pathname = useLocation();

  /** -----------------------------
   * @description 활성화된 네비게이션 키 조회
   * @returns 활성화된 네비게이션 키
   * ----------------------------- */
  const activeNavKey = useMemo(() => {
    return NAV_ITEMS.find((item) => item.href === location.pathname)?.key;
  }, [pathname]);

  const session = useSession();
  if (!session) return <Navigate to={PUBLIC_PAGE_PATHS.SIGN_IN.path} replace />;

  return (
    <div className="flex flex-col w-full h-full items-center overflow-hidden">
      <Header />
      <div className="flex flex-col w-full flex-1 min-h-0 max-w-6xl md:flex-row">
        {/* SidebarNav only show on desktop */}
        <SidebarNav activeNavKey={activeNavKey} />
        <main className="flex-1 lg:border-r overflow-hidden">
          <Outlet />
        </main>
      </div>
      {/* BottomNav only show on mobile */}
      <BottomNav activeNavKey={activeNavKey} />
    </div>
  );
};

export default PrivateLayout;

import { useSession } from "@/store/session";
import { Navigate, Outlet, useLocation } from "react-router";
import Header from "./header/header";
import BottomNav from "./nav/bottom-nav";
import SidebarNav from "./nav/sidebar-nav";
import { PUBLIC_PAGE_PATHS } from "@/lib/pages";
import { useMemo } from "react";
import { NAV_ITEMS } from "@/lib/nav-items";

const PrivateLayout = () => {
  const pathname = useLocation();

  const activeNavKey = useMemo(() => {
    return NAV_ITEMS.find((item) => item.href === location.pathname)?.key;
  }, [pathname])

  const session = useSession();
  if (!session) return <Navigate to={PUBLIC_PAGE_PATHS.SIGN_IN.path} replace />;



  return (
    <div className="flex flex-col w-full h-full">
      <Header />
      <div className="flex flex-col w-full h-full md:flex-row">
        {/* SidebarNav only show on desktop */}
        <SidebarNav activeNavKey={activeNavKey} />
        <main className="flex-1">
          <Outlet />
        </main>
        {/* BottomNav only show on mobile */}
        <BottomNav activeNavKey={activeNavKey} />
      </div>
    </div>
  );
};

export default PrivateLayout;

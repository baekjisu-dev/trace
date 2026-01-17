import { useSession } from "@/store/session";
import { Navigate, Outlet } from "react-router";
import Header from "./header/header";
import BottomNav from "./nav/bottom-nav";
import SidebarNav from "./nav/sidebar-nav";

const PrivateLayout = () => {
  const session = useSession();
  if (!session) return <Navigate to="/sign-in" replace />;

  return (
    <div className="flex flex-col w-full h-full">
      <Header />
      <div className="flex flex-col w-full h-full md:flex-row">
        <SidebarNav />
        <main className="flex-1 bg-amber-50">
          <Outlet />
        </main>
        <BottomNav />
      </div>
    </div>
  );
};

export default PrivateLayout;

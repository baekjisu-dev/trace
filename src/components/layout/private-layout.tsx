import { useSession } from "@/store/session";
import { Navigate, Outlet } from "react-router";
import Header from "./header/header";

const PrivateLayout = () => {
  const session = useSession();
  if (!session) return <Navigate to="/sign-in" replace />;

  return (
    <div className="flex flex-col w-full h-full">
      <Header />
      <Outlet />
    </div>
  );
};

export default PrivateLayout;

import { useSession } from "@/store/session";
import { Navigate, Outlet } from "react-router";

const PrivateLayout = () => {
  const session = useSession();
  if (!session) return <Navigate to="/sign-in" replace />;

  return (
    <div>
      <Outlet />
    </div>
  );
};

export default PrivateLayout;

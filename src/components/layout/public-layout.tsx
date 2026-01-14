import { useSession } from "@/store/session";
import { Navigate, Outlet } from "react-router";

const PublicLayout = () => {
  const session = useSession();
  if (session) return <Navigate to="/" replace />;

  return <Outlet />;
};

export default PublicLayout;

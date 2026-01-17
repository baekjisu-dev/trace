import { PRIVATE_PAGE_PATHS } from "@/lib/pages";
import { useSession } from "@/store/session";
import { Navigate, Outlet } from "react-router";

const PublicLayout = () => {
  const session = useSession();
  if (session) return <Navigate to={PRIVATE_PAGE_PATHS.HOME.path} replace />;

  return <Outlet />;
};

export default PublicLayout;

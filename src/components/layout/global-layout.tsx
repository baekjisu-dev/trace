import { Outlet } from "react-router";

const GlobalLayout = () => {
  return (
    <div className="h-screen w-screen overflow-hidden flex justify-center">
      <Outlet />
    </div>
  );
};

export default GlobalLayout;

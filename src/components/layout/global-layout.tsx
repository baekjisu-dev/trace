import { Outlet } from "react-router";

const GlobalLayout = () => {
  return (
    <div className="min-h-dvh h-full w-screen overflow-hidden flex justify-center">
      <Outlet />
    </div>
  );
};

export default GlobalLayout;

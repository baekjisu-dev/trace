import { Outlet } from "react-router";

const GlobalLayout = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default GlobalLayout;

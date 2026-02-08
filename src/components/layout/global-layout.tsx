import { Outlet } from "react-router";

/** -----------------------------
 * @description 전역 레이아웃
 * @returns 전역 레이아웃 컴포넌트
 * ----------------------------- */
const GlobalLayout = () => {
  return (
    <div className="min-h-dvh h-full w-screen overflow-hidden flex justify-center">
      <Outlet />
    </div>
  );
};

export default GlobalLayout;

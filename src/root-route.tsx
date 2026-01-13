import { Route, Routes } from "react-router";
import IndexPage from "./pages/index-page";
import SignInPage from "./pages/sign-in-page";
import SignUpPage from "./pages/sign-up-page";
import ForgetPasswordPage from "./pages/forget-password-page";
import ResetPasswordPage from "./pages/reset-password-page";
import ProfileDetailPage from "./pages/profile-detail-page";
import PostDetailPage from "./pages/post-detail-page";
import GlobalLayout from "@/components/layout/global-layout";
import PublicLayout from "./components/layout/public-layout";
import PrivateLayout from "./components/layout/private-layout";

const RootRoute = () => {
  return (
    <Routes>
      <Route element={<GlobalLayout />}>
        <Route element={<PublicLayout />}>
          <Route path="/sign-in" element={<SignInPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route path="/forget-password" element={<ForgetPasswordPage />} />
        </Route>

        <Route element={<PrivateLayout />}>
          <Route path="/" element={<IndexPage />} />
          <Route path="/profile/:userId" element={<ProfileDetailPage />} />
          <Route path="/post/:postId" element={<PostDetailPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default RootRoute;

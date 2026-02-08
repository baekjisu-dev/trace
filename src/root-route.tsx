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
import { PRIVATE_PAGE_PATHS, PUBLIC_PAGE_PATHS } from "./lib/pages";
import SearchPage from "./pages/search-page";
import NotificationPage from "./pages/notification-page";
import DmPage from "./pages/dm-page";
import DmListPage from "./pages/dm-list-page";
import NotFoundPage from "./pages/not-found-page";
import SettingsPage from "./pages/settings-page";

const RootRoute = () => {
  return (
    <Routes>
      <Route element={<GlobalLayout />}>
        <Route element={<PublicLayout />}>
          <Route
            path={PUBLIC_PAGE_PATHS.SIGN_IN.path}
            element={<SignInPage />}
          />
          <Route
            path={PUBLIC_PAGE_PATHS.SIGN_UP.path}
            element={<SignUpPage />}
          />
          <Route
            path={PUBLIC_PAGE_PATHS.FORGET_PASSWORD.path}
            element={<ForgetPasswordPage />}
          />
        </Route>

        <Route element={<PrivateLayout />}>
          <Route path={PRIVATE_PAGE_PATHS.HOME.path} element={<IndexPage />} />
          <Route
            path={PRIVATE_PAGE_PATHS.PROFILE.path}
            element={<ProfileDetailPage />}
          />
          <Route
            path={PRIVATE_PAGE_PATHS.POST.path}
            element={<PostDetailPage />}
          />
          <Route
            path={PRIVATE_PAGE_PATHS.RESET_PASSWORD.path}
            element={<ResetPasswordPage />}
          />
          <Route
            path={PRIVATE_PAGE_PATHS.SEARCH.path}
            element={<SearchPage />}
          />
          <Route
            path={PRIVATE_PAGE_PATHS.NOTIFICATIONS.path}
            element={<NotificationPage />}
          />
          <Route
            path={PRIVATE_PAGE_PATHS.DM_LIST.path}
            element={<DmListPage />}
          />
          <Route path={PRIVATE_PAGE_PATHS.DM.path} element={<DmPage />} />
          <Route
            path={PRIVATE_PAGE_PATHS.SETTINGS.path}
            element={<SettingsPage />}
          />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};

export default RootRoute;

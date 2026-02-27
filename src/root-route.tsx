import { Suspense } from "react";
import { Route, Routes } from "react-router";
import {
  IndexPage,
  SignInPage,
  SignUpPage,
  ForgetPasswordPage,
  ResetPasswordPage,
  ProfileDetailPage,
  PostDetailPage,
  SearchPage,
  NotificationPage,
  DmPage,
  DmListPage,
  NotFoundPage,
  SettingsPage,
} from "./pages";
import GlobalLayout from "@/components/layout/global-layout";
import PublicLayout from "./components/layout/public-layout";
import PrivateLayout from "./components/layout/private-layout";
import { PRIVATE_PAGE_PATHS, PUBLIC_PAGE_PATHS } from "./lib/pages";
import GlobalLoader from "./components/global-loader";

const RootRoute = () => {
  return (
    <Suspense fallback={<GlobalLoader />}>
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
            <Route
              path={PRIVATE_PAGE_PATHS.HOME.path}
              element={<IndexPage />}
            />
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
    </Suspense>
  );
};

export default RootRoute;

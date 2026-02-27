import { lazy } from "react";

export const IndexPage = lazy(() => import("./index-page"));
export const SignInPage = lazy(() => import("./sign-in-page"));
export const SignUpPage = lazy(() => import("./sign-up-page"));
export const ForgetPasswordPage = lazy(() => import("./forget-password-page"));
export const ResetPasswordPage = lazy(() => import("./reset-password-page"));
export const ProfileDetailPage = lazy(() => import("./profile-detail-page"));
export const PostDetailPage = lazy(() => import("./post-detail-page"));
export const SearchPage = lazy(() => import("./search-page"));
export const NotificationPage = lazy(() => import("./notification-page"));
export const DmListPage = lazy(() => import("./dm-list-page"));
export const DmPage = lazy(() => import("./dm-page"));
export const SettingsPage = lazy(() => import("./settings-page"));
export const NotFoundPage = lazy(() => import("./not-found-page"));

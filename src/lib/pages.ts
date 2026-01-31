const PUBLIC_PAGE_PATHS = {
  SIGN_IN: {
    path: "/sign-in",
  },
  SIGN_UP: {
    path: "/sign-up",
  },
  FORGET_PASSWORD: {
    path: "/forget-password",
  },
} as const;

const PRIVATE_PAGE_PATHS = {
  HOME: {
    path: "/",
  },
  SEARCH: {
    path: "/search",
    getPath: (query: string) => `/search?query=${query}`,
  },
  DM: {
    path: "/dm",
  },
  NOTIFICATIONS: {
    path: "/notifications",
  },
  SETTINGS: {
    path: "/settings",
  },
  PROFILE: {
    path: "/profile/:userId",
    getPath: (userId: string) => `/profile/${userId}`,
  },
  POST: {
    path: "/post/:postId",
    getPath: (postId: number) => `/post/${postId}`,
  },
  RESET_PASSWORD: {
    path: "/reset-password",
  },
} as const;

export { PUBLIC_PAGE_PATHS, PRIVATE_PAGE_PATHS };

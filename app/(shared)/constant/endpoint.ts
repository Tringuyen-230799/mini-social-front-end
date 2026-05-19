export const API_ENDPOINTS = {
  AUTH: {
    SIGNUP: "/api/auth/signup",
    LOGIN: "/api/auth/login",
    LOGOUT: "/api/auth/logout",
    ME: "/api/auth/me",
  },
  POST: {
    LIST: "/api/posts",
  },
  COMMENT: {
    LIST: '/api/comments',
  },
};

export const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

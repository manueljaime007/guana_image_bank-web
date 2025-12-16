const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:4007/api/v1";

export const apiConfig = {
  baseURL: API_BASE_URL,
  endpoints: {
    auth: {
      login: `${API_BASE_URL}/auth/login`,
      register: `${API_BASE_URL}/auth/register`,
      logout: `${API_BASE_URL}/auth/logout`,
      refresh: `${API_BASE_URL}/auth/refresh`,
      me: `${API_BASE_URL}/auth/me`,
    },
    users: `${API_BASE_URL}/users`,
    images: {
      all: `${API_BASE_URL}/images/all`,
      userImages: (id: number) =>
        `${API_BASE_URL}/images/user/${id}`,
      myImages: `${API_BASE_URL}/images/me/images`,
    },
  },
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
};

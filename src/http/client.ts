import axios from "axios";
import { useAuthStore } from "@/store/auth";

export const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

const refreshTokenRequest = async () => {
  const { data } = await api.get(
    `${import.meta.env.VITE_BACKEND_API_URL}/api/v1/refresh`,
    { withCredentials: true },
  );
  return data;
};

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const headers = { ...originalRequest.headers };
        await refreshTokenRequest();
        return api.request({ ...originalRequest, headers });
      } catch (error: unknown) {
        useAuthStore.getState().removeUser();
        const errorMessage =
          (error as Error).message ?? "Error while refreshing token";
        return Promise.reject(new Error(errorMessage));
      }
    }
    return Promise.reject(new Error(error.message));
  },
);

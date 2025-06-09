import axios, { AxiosRequestConfig } from "axios";

interface AxiosRequestConfigWithRetry extends AxiosRequestConfig {
  _retry?: boolean;
}

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config as AxiosRequestConfigWithRetry;

    const isRefreshingEndpoint = originalRequest.url?.endsWith("/auth/refresh");

    // Prevent retrying refresh endpoint itself
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !isRefreshingEndpoint
    ) {
      originalRequest._retry = true;

      try {
        console.log("🔁 Refreshing access token...");
        await axiosInstance.post("/auth/refresh");
        console.log("✅ Access token refreshed");
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error("❌ Refresh token failed:", refreshError);
       if (typeof window !== "undefined" && window.location.pathname !== "/login") {
          window.location.href = "/login";
        }

        return Promise.reject(refreshError);
      }

       
    }

    return Promise.reject(error);
  }
);
export default axiosInstance;

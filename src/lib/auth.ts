import axiosInstance from "./axiosInstance";

export const login = (data: { email: string; password: string }) =>
  axiosInstance.post("/api/auth/login", data);

export const registerUser = (data: {
  name: string;
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  role: string;
  referredBy?: string;}) =>
  axiosInstance.post("/api/auth/register", data);

export const refreshToken = () =>
  axiosInstance.post("/api/auth/refresh");

export const logout = () =>
  axiosInstance.post("/api/auth/logout");

export const getCurrentUser = () =>
  axiosInstance.get("/api/auth/users/me");

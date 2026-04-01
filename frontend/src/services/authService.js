import { API_ENDPOINTS } from "../config/ApiConfig";
import { getItem, removeItem, setItem } from "../utils/helper";
import apiClient from "./apiClient";

export const authService = {
  register: async ({ name, email, password }) => {
    const response = await apiClient.post(API_ENDPOINTS.AUTH.REGISTER, {
      name,
      email,
      password,
    });
    return response.data;
  },

  login: async ({ email, password }) => {
    const response = await apiClient.post(API_ENDPOINTS.AUTH.LOGIN, {
      email,
      password,
    });
    const data = response.data;

    if (data?.token) {
      setItem("token", data.token);
    }

    if (data?.user) {
      setItem("user", JSON.stringify(data.user));
    }

    return data;
  },

  logout: () => {
    removeItem("token");
    removeItem("user");
    removeItem("otp_email");
  },

  isAuthenticated: () => Boolean(getItem("token")),

  getCurrentUser: () => {
    const user = getItem("user");
    if (!user) return null;
    return typeof user === "string" ? JSON.parse(user) : user;
  },
};

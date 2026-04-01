import { API_ENDPOINTS } from "../config/ApiConfig";
import apiClient, { requestWithFallback } from "./apiClient";

export const profileService = {
  getAdminProfile: async () => {
    const response = await requestWithFallback(
      API_ENDPOINTS.PROFILE.GET.map((path) => () => apiClient.post(path, {}))
    );
    return response.data?.profileData || response.data?.existAdmin || response.data?.data || null;
  },
};

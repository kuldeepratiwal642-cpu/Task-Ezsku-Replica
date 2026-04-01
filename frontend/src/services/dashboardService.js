import { API_ENDPOINTS } from "../config/ApiConfig";
import apiClient, { requestWithFallback } from "./apiClient";

export const dashboardService = {
  getCounts: async () => {
    const response = await requestWithFallback(
      API_ENDPOINTS.DASHBOARD.COUNTS.map((path) => () => apiClient.post(path, {}))
    );
    return response.data || {};
  },
};

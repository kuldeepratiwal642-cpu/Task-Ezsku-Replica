import { API_ENDPOINTS } from "../config/ApiConfig";
import apiClient, { requestWithFallback } from "./apiClient";

const postToAny = (paths, payload = {}) =>
  requestWithFallback(paths.map((path) => () => apiClient.post(path, payload)));

export const userService = {
  getAll: async () => {
    const response = await postToAny(API_ENDPOINTS.USER.LIST, {});
    return response.data?.users || response.data?.userList || response.data?.data || [];
  },

  getById: async (id) => {
    const response = await postToAny(API_ENDPOINTS.USER.DETAIL, { id });
    return response.data?.user || response.data?.data || null;
  },

  create: async (payload) => {
    const response = await postToAny(API_ENDPOINTS.USER.CREATE, payload);
    return response.data;
  },

  update: async (id, payload) => {
    const response = await postToAny(API_ENDPOINTS.USER.UPDATE, { id, ...payload });
    return response.data;
  },
};

import { API_ENDPOINTS } from "../config/ApiConfig";
import apiClient from "./apiClient";

export const categoryService = {
  getAll: async () => {
    const response = await apiClient.get(API_ENDPOINTS.CATEGORY.LIST);
    return response.data?.categoryList || response.data?.data || [];
  },

  create: async ({ name, description, category_image }) => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    if (category_image) {
      formData.append("category_image", category_image);
    }

    const response = await apiClient.post(API_ENDPOINTS.CATEGORY.CREATE, formData);
    return response.data;
  },

  update: async ({ id, name, description, category_image }) => {
    const formData = new FormData();
    formData.append("id", id);
    if (name) formData.append("name", name);
    if (description) formData.append("description", description);
    if (category_image) {
      formData.append("category_image", category_image);
    }

    const response = await apiClient.put(API_ENDPOINTS.CATEGORY.UPDATE, formData);
    return response.data;
  },

  remove: async ({ id }) => {
    const cleanId = id;

    // 1) Prefer route param version (clear semantics, avoids DELETE body reliability issues)
    try {
      const path = API_ENDPOINTS.CATEGORY.DELETE_BY_PARAM.replace(":id", cleanId);
      const response = await apiClient.delete(path);
      return response.data;
    } catch (error) {
      // if path delete is not supported or fails, try body + query fallback
      if (!error.response) throw error;
      if (error.response.status !== 400 && error.response.status !== 404) throw error;
    }

    // 2) body-based fallback
    try {
      const response = await apiClient.delete(API_ENDPOINTS.CATEGORY.DELETE, {
        data: { id: cleanId },
      });
      return response.data;
    } catch (error) {
      if (!error.response) throw error;
      // 3) finally try query parameter fallback
      if (error.response.status === 400 || error.response.status === 404) {
        const response = await apiClient.delete(`${API_ENDPOINTS.CATEGORY.DELETE}?id=${cleanId}`);
        return response.data;
      }
      throw error;
    }
  },
};

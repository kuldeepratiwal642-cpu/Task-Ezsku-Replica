import { API_ENDPOINTS } from "../config/ApiConfig";
import apiClient from "./apiClient";

export const productService = {
  getAll: async () => {
    const response = await apiClient.get(API_ENDPOINTS.PRODUCT.LIST);
    return response.data?.productList || response.data?.data || [];
  },

  create: async ({ name, description, price, category, product_images }) => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("category", category);
    Array.from(product_images || []).forEach((file) => {
      formData.append("product_images", file);
    });

    const response = await apiClient.post(API_ENDPOINTS.PRODUCT.CREATE, formData);
    return response.data;
  },

  update: async ({ id, name, description, price, category, product_images }) => {
    const formData = new FormData();
    formData.append("id", id);
    if (name) formData.append("name", name);
    if (description) formData.append("description", description);
    if (price !== undefined && price !== "") formData.append("price", price);
    if (category) formData.append("category", category);
    Array.from(product_images || []).forEach((file) => {
      formData.append("product_images", file);
    });

    const response = await apiClient.put(API_ENDPOINTS.PRODUCT.UPDATE, formData);
    return response.data;
  },

  remove: async ({ id }) => {
    // 1) Try param route first
    try {
      const path = API_ENDPOINTS.PRODUCT.DELETE_BY_PARAM.replace(":id", id);
      const response = await apiClient.delete(path);
      return response.data;
    } catch (error) {
      if (!error.response) throw error;
      if (error.response.status !== 400 && error.response.status !== 404) throw error;
    }

    // 2) Fallback body route
    try {
      const response = await apiClient.delete(API_ENDPOINTS.PRODUCT.DELETE, {
        data: { id },
      });
      return response.data;
    } catch (error) {
      if (!error.response) throw error;
      if (error.response.status === 400 || error.response.status === 404) {
        const response = await apiClient.delete(`${API_ENDPOINTS.PRODUCT.DELETE}?id=${id}`);
        return response.data;
      }
      throw error;
    }
  },
};

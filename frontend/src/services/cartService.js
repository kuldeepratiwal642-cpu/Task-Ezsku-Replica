import { API_ENDPOINTS } from "../config/ApiConfig";
import apiClient from "./apiClient";

export const cartService = {
  addItem: async ({ product_id, qty, amount }) => {
    const payload = { product_id };
    if (qty !== undefined) payload.qty = qty;
    if (amount !== undefined) payload.amount = amount;

    const response = await apiClient.post(API_ENDPOINTS.CART.ADD, payload);
    return response.data?.data || response.data;
  },

  getCart: async () => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.CART.GET);
      return response.data?.data || response.data || [];
    } catch (error) {
      return [];
    }
  },

  updateItem: async ({ cart_id, product_id, qty }) => {
    const response = await apiClient.put(API_ENDPOINTS.CART.UPDATE, {
      cart_id,
      product_id,
      qty,
    });
    return response.data?.data || response.data;
  },

  removeItem: async ({ cart_id, product_id }) => {
    const response = await apiClient.delete(API_ENDPOINTS.CART.REMOVE, {
      data: { cart_id, product_id },
    });
    return response.data || { success: true };
  },

  saveToLater: async ({ cart_id, product_id }) => {
    const response = await apiClient.put(API_ENDPOINTS.CART.SAVE_TO_LATER, {
      cart_id,
      product_id,
    });
    return response.data?.data || response.data;
  },

  moveToCart: async ({ cart_id, product_id }) => {
    const response = await apiClient.put(API_ENDPOINTS.CART.MOVE_TO_CART, {
      cart_id,
      product_id,
    });
    return response.data?.data || response.data;
  },
};

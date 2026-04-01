const DEFAULT_API_BASE_URL = "http://localhost:3003";

const stripTrailingSlash = (url) => url.replace(/\/+$/, "");

export const API_BASE_URL = stripTrailingSlash(
  import.meta.env.VITE_BACKEND_URL ||
  import.meta.env.VITE_API_BASE_URL ||
  DEFAULT_API_BASE_URL
);

export const WEB_URL = API_BASE_URL;

export const API_ENDPOINTS = {
  AUTH: {
    REGISTER: "/api/auth/register",
    LOGIN: "/api/auth/login",
    VERIFY_OTP: "/api/auth/VerifiedOtp",
  },
  CATEGORY: {
    CREATE: "/api/category/add_category",
    LIST: "/api/category/category_list",
    UPDATE: "/api/category/edit_category",
    DELETE: "/api/category/delete_category",
    DELETE_BY_PARAM: "/api/category/delete_category/:id",
  },
  PRODUCT: {
    CREATE: "/api/product/add_product",
    LIST: "/api/product/product_list",
    UPDATE: "/api/product/edit_product",
    DELETE: "/api/product/delete_product",
    DELETE_BY_PARAM: "/api/product/delete_product/:id",
  },
  CART: {
    ADD: "/api/cart/add_to_cart",
    UPDATE: "/api/cart/update_to_cart",
    GET: "/api/cart/get_cart",
    REMOVE: "/api/cart/remove_cart",
    MOVE_TO_CART: "/api/cart/move_to_cart",
    SAVE_TO_LATER: "/api/cart/save_to_later",
  },
};

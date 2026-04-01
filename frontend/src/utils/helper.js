import { toast } from "react-toastify";

export const setItem = (key, value) => localStorage.setItem(key, value);
export const getItem = (key) => localStorage.getItem(key);
export const removeItem = (key) => localStorage.removeItem(key);
export const clearStorage = () => localStorage.clear();

export const errorHandler = (error) => {
  const status = error?.response?.status;
  const message =
    error?.response?.data?.message || error?.response?.data?.error || error?.message || "Something went wrong.";

  if (status === 401) {
    clearStorage();
    window.location.href = "/login";
    return;
  }

  toast.error(message);
};

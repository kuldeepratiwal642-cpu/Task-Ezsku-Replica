import React, { createContext, useEffect, useMemo, useState } from "react";
import { cartService } from "../services/cartService";

export const CartContext = createContext();

const STORAGE_KEYS = {
  cart: "admin_cart_items",
  saved: "admin_saved_items",
};

const readStorage = (key) => {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : [];
  } catch {
    return [];
  }
};

const writeStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

const toLocalCartItem = (product, qty = 1) => ({
  _id: `local-${product._id}`,
  product_id: product,
  qty,
  value: Number(product.price || 0) * qty,
  is_save_later: false,
  localOnly: true,
});

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => readStorage(STORAGE_KEYS.cart));
  const [savedForLater, setSavedForLater] = useState(() => readStorage(STORAGE_KEYS.saved));

  useEffect(() => {
    writeStorage(STORAGE_KEYS.cart, cart);
  }, [cart]);

  useEffect(() => {
    writeStorage(STORAGE_KEYS.saved, savedForLater);
  }, [savedForLater]);

  const syncCart = async () => {
    try {
      const items = await cartService.getCart();
      if (Array.isArray(items)) {
        const activeItems = items.filter((item) => !item.is_save_later);
        const laterItems = items.filter((item) => item.is_save_later);
        setCart(activeItems);
        setSavedForLater(laterItems);
        return items;
      }
      return [];
    } catch (error) {
      console.error("Failed to sync cart:", error);
      return [];
    }
  };

  const addToCart = async (product) => {
    const productId = product._id;
    const existing = cart.find(
      (item) => (item.product_id?._id || item.product_id) === productId
    );

    if (existing) {
      const nextQty = Number(existing.qty || 1) + 1;
      await updateQuantity(existing._id, productId, nextQty);
      return;
    }

    const optimistic = toLocalCartItem(product, 1);
    setCart((prev) => [...prev, optimistic]);

    try {
      console.log("Adding to cart:", { product_id: productId, qty: 1, amount: product.price });
      await cartService.addItem({
        product_id: productId,
        qty: 1,
        amount: Number(product.price || 0),
      });
      console.log("Successfully added to cart, syncing...");
      await syncCart();
    } catch (error) {
      console.error("Error in addToCart:", error);
      // Revert optimistic update
      setCart((prev) => prev.filter((item) => item._id !== optimistic._id));

      if (error?.response?.status === 409) {
        console.log("Product already in cart, syncing...");
        await syncCart();
        return;
      }
      throw error;
    }
  };

  const updateQuantity = async (cart_id, product_id, qty) => {
    if (qty < 1) return;

    setCart((prev) =>
      prev.map((item) =>
        item._id === cart_id
          ? {
            ...item,
            qty,
            value: Number(item.product_id?.price || item.value || 0) * qty,
          }
          : item
      )
    );

    const current = cart.find((item) => item._id === cart_id);
    if (current?.localOnly) {
      return;
    }

    await cartService.updateItem({
      cart_id,
      product_id,
      qty,
    });
    await syncCart();
  };

  const removeFromCart = async (cart_id, product_id) => {
    const current = cart.find((item) => item._id === cart_id);
    setCart((prev) => prev.filter((item) => item._id !== cart_id));

    if (current?.localOnly) {
      return;
    }

    await cartService.removeItem({
      cart_id,
      product_id,
    });
    await syncCart();
  };

  const saveForLater = async (cart_id, product_id) => {
    const current = cart.find((item) => item._id === cart_id);
    if (!current) return;

    setCart((prev) => prev.filter((item) => item._id !== cart_id));
    setSavedForLater((prev) => [...prev, { ...current, is_save_later: true }]);

    if (current.localOnly) {
      return;
    }

    await cartService.saveToLater({
      cart_id,
      product_id,
    });
    await syncCart();
  };

  const moveToCart = async (cart_id, product_id) => {
    const current = savedForLater.find((item) => item._id === cart_id);
    if (!current) return;

    setSavedForLater((prev) => prev.filter((item) => item._id !== cart_id));
    setCart((prev) => [...prev, { ...current, is_save_later: false }]);

    if (current.localOnly) {
      return;
    }

    await cartService.moveToCart({
      cart_id,
      product_id,
    });
    await syncCart();
  };

  const clearCart = async () => {
    const removable = [...cart];
    setCart([]);

    for (const item of removable) {
      if (!item.localOnly) {
        await cartService.removeItem({
          cart_id: item._id,
          product_id: item.product_id?._id || item.product_id,
        });
      }
    }

    await syncCart();
  };

  const getTotalPrice = () =>
    cart.reduce((total, item) => total + Number(item.value || 0), 0);

  const cartCount = useMemo(
    () => cart.reduce((count, item) => count + Number(item.qty || 1), 0),
    [cart]
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        savedForLater,
        addToCart,
        updateQuantity,
        removeFromCart,
        saveForLater,
        moveToCart,
        clearCart,
        syncCart,
        getTotalPrice,
        cartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

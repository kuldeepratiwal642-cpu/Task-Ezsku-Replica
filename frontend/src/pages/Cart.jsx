import React, { useEffect } from "react";
import { toast } from "react-toastify";
import Card from "../components/ui/Card";
import EmptyState from "../components/ui/EmptyState";
import PageTransition from "../components/ui/PageTransition";
import Button from "../components/ui/Button";
import { useCart } from "../hooks/useCart";

export default function Cart() {
  const {
    cart,
    savedForLater,
    removeFromCart,
    updateQuantity,
    saveForLater,
    moveToCart,
    clearCart,
    getTotalPrice,
    syncCart,
  } = useCart();

  useEffect(() => {
    syncCart().catch((error) => {
      toast.error(error?.response?.data?.message || error?.message || "Failed to load cart");
    });
  }, []);

  const handleCheckout = () => {
    if (!cart.length) {
      toast.error("Cart is empty");
      return;
    }
    toast.success("Proceeding to checkout");
  };

  const updateItemCount = async (item, nextQty) => {
    if (nextQty < 1) return;
    try {
      await updateQuantity(item._id, item.product_id?._id, nextQty);
    } catch (error) {
      toast.error(error?.response?.data?.message || error?.message || "Failed to update cart");
    }
  };

  const removeItem = async (item) => {
    try {
      await removeFromCart(item._id, item.product_id?._id);
      toast.success("Item removed");
    } catch (error) {
      toast.error(error?.response?.data?.message || error?.message || "Failed to remove item");
    }
  };

  const saveItemForLater = async (item) => {
    try {
      await saveForLater(item._id, item.product_id?._id);
      toast.success("Saved for later");
    } catch (error) {
      toast.error(error?.response?.data?.message || error?.message || "Failed to save item");
    }
  };

  const moveItemBack = async (item) => {
    try {
      await moveToCart(item._id, item.product_id?._id);
      toast.success("Moved back to cart");
    } catch (error) {
      toast.error(error?.response?.data?.message || error?.message || "Failed to move item");
    }
  };

  return (
    <PageTransition>
      <div className="app-shell">
        <div className="page-header">
          <div>
            <h2 className="page-title">Cart</h2>
            <p className="page-subtitle">Review cart items and update quantity.</p>
          </div>
        </div>

        {!cart.length && !savedForLater.length ? (
          <EmptyState
            title="Your cart is empty"
            description="Products you add will appear here."
          />
        ) : (
          <div className="grid gap-4 lg:grid-cols-[1.5fr,0.9fr]">
            <div className="space-y-4">
              <Card className="p-5">
                <h3 className="text-lg font-semibold text-slate-900">Cart Items</h3>
                {cart.length ? (
                  <div className="mt-4 space-y-3">
                    {cart.map((item) => (
                      <div
                        key={item._id}
                        className="rounded border border-slate-200 p-4"
                      >
                        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                          <div>
                            <h4 className="font-semibold text-slate-900">{item.product_id?.name}</h4>
                            <p className="mt-1 text-sm text-slate-500">{item.product_id?.description}</p>
                            <p className="mt-2 text-sm font-medium text-blue-600">Rs. {item.value}</p>
                          </div>
                          <div className="flex flex-wrap items-center gap-2">
                            <Button type="button" variant="ghost" onClick={() => updateItemCount(item, item.qty - 1)}>
                              -
                            </Button>
                            <span className="min-w-8 text-center text-sm">{item.qty}</span>
                            <Button type="button" variant="ghost" onClick={() => updateItemCount(item, item.qty + 1)}>
                              +
                            </Button>
                            <Button type="button" variant="secondary" onClick={() => saveItemForLater(item)}>
                              Save
                            </Button>
                            <Button type="button" variant="danger" onClick={() => removeItem(item)}>
                              Remove
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="mt-4 text-sm text-slate-500">No active cart items.</p>
                )}
              </Card>

              <Card className="p-5">
                <h3 className="text-lg font-semibold text-slate-900">Saved For Later</h3>
                {savedForLater.length ? (
                  <div className="mt-4 space-y-3">
                    {savedForLater.map((item) => (
                      <div key={item._id} className="rounded border border-slate-200 p-4">
                        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                          <div>
                            <h4 className="font-semibold text-slate-900">{item.product_id?.name}</h4>
                            <p className="mt-1 text-sm text-slate-500">{item.product_id?.description}</p>
                          </div>
                          <Button type="button" variant="primary" onClick={() => moveItemBack(item)}>
                            Move to cart
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="mt-4 text-sm text-slate-500">No saved items.</p>
                )}
              </Card>
            </div>

            <Card className="h-fit p-5">
              <h3 className="text-lg font-semibold text-slate-900">Order Summary</h3>
              <div className="mt-4 space-y-2 text-sm text-slate-600">
                <div className="flex items-center justify-between">
                  <span>Total units</span>
                  <span>{cart.reduce((sum, item) => sum + Number(item.qty || 1), 0)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Subtotal</span>
                  <span>Rs. {getTotalPrice().toFixed(2)}</span>
                </div>
              </div>
              <div className="mt-4 space-y-2">
                <Button type="button" variant="primary" className="w-full" onClick={handleCheckout}>
                  Proceed to Checkout
                </Button>
                <Button type="button" variant="secondary" className="w-full" onClick={clearCart} disabled={!cart.length}>
                  Clear Cart
                </Button>
              </div>
            </Card>
          </div>
        )}
      </div>
    </PageTransition>
  );
}

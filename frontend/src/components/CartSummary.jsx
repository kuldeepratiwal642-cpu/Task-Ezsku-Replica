import React, { useEffect } from "react";
import { useCart } from "../hooks/useCart";
import { WEB_URL } from "../config/ApiConfig";
import Card from "./ui/Card";
import Button from "./ui/Button";

export default function CartSummary() {
    const {
        cart,
        getTotalPrice,
        syncCart,
    } = useCart();

    useEffect(() => {
        syncCart().catch((error) => console.error("Failed to sync cart:", error));
    }, []);

    const totalItems = cart.reduce((sum, item) => sum + (item.qty || 0), 0);
    const totalPrice = getTotalPrice();

    return (
        <Card className="p-6">
            <h3 className="text-lg font-semibold text-slate-900">Cart Summary</h3>

            <div className="mt-6 space-y-4">
                {/* Total Items */}
                <div className="flex justify-between border-b border-slate-200 pb-3">
                    <span className="text-sm text-slate-600">Total Items</span>
                    <span className="font-semibold text-slate-900">{totalItems}</span>
                </div>

                {/* Subtotal */}
                <div className="flex justify-between border-b border-slate-200 pb-3">
                    <span className="text-sm text-slate-600">Subtotal</span>
                    <span className="font-semibold text-slate-900">
                        Rs. {totalPrice.toFixed(2)}
                    </span>
                </div>

                {/* Estimated Tax */}
                <div className="flex justify-between border-b border-slate-200 pb-3">
                    <span className="text-sm text-slate-600">Tax (10%)</span>
                    <span className="font-semibold text-slate-900">
                        Rs. {(totalPrice * 0.1).toFixed(2)}
                    </span>
                </div>

                {/* Total */}
                <div className="flex justify-between pt-2">
                    <span className="font-semibold text-slate-900">Total</span>
                    <span className="text-lg font-bold text-blue-600">
                        Rs. {(totalPrice * 1.1).toFixed(2)}
                    </span>
                </div>

                {/* Checkout Button */}
                <Button
                    type="button"
                    variant="primary"
                    className="mt-6 w-full"
                    disabled={totalItems === 0}
                >
                    Proceed to Checkout
                </Button>

                {totalItems === 0 && (
                    <p className="text-center text-xs text-slate-500">
                        Your cart is empty
                    </p>
                )}
            </div>
        </Card>
    );
}

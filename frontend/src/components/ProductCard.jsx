import React from "react";
import { toast } from "react-toastify";
import { useCart } from "../hooks/useCart";
import { WEB_URL } from "../config/ApiConfig";
import Button from "./ui/Button";
import Card from "./ui/Card";

export default function ProductCard({ product, showAddToCart = true, onAddToCart }) {
    const { addToCart } = useCart();
    const [loading, setLoading] = React.useState(false);

    const handleAddToCart = async () => {
        setLoading(true);
        try {
            await addToCart(product);
            toast.success("Product added to cart successfully");
            if (onAddToCart) onAddToCart(product);
        } catch (error) {
            console.error("Error adding to cart:", error);
            const errorMessage = error?.response?.data?.message || error?.message || "Failed to add to cart";
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const productImage = product?.product_images?.[0]
        ? `${WEB_URL}/${product.product_images[0]}`
        : null;

    return (
        <Card className="flex flex-col overflow-hidden transition hover:shadow-lg">
            {/* Product Image */}
            <div className="h-48 bg-slate-100">
                {productImage ? (
                    <img
                        src={productImage}
                        alt={product.name}
                        className="h-full w-full object-cover"
                        onError={(e) => {
                            e.target.src = "";
                            e.target.parentElement.innerHTML =
                                '<div class="flex h-full items-center justify-center text-sm text-slate-400">No image</div>';
                        }}
                    />
                ) : (
                    <div className="flex h-full items-center justify-center text-sm text-slate-400">
                        No image
                    </div>
                )}
            </div>

            {/* Product Info */}
            <div className="flex flex-1 flex-col p-4">
                <p className="text-xs font-medium uppercase text-slate-500">
                    {product?.category?.name || "Uncategorized"}
                </p>

                <h3 className="mt-2 line-clamp-2 text-base font-semibold text-slate-900">
                    {product.name}
                </h3>

                <p className="mt-2 flex-1 line-clamp-2 text-sm text-slate-600">
                    {product.description}
                </p>

                <div className="mt-4 flex items-center justify-between">
                    <span className="text-lg font-bold text-blue-600">
                        Rs. {product.price}
                    </span>
                </div>

                {showAddToCart && (
                    <Button
                        type="button"
                        variant="primary"
                        className="mt-4 w-full"
                        onClick={handleAddToCart}
                        disabled={loading}
                    >
                        {loading ? "Adding..." : "Add to Cart"}
                    </Button>
                )}
            </div>
        </Card>
    );
}

import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ProductForm from "../components/ProductForm";
import Card from "../components/ui/Card";
import EmptyState from "../components/ui/EmptyState";
import PageTransition from "../components/ui/PageTransition";
import Button from "../components/ui/Button";
import { WEB_URL } from "../config/ApiConfig";
import { useCart } from "../hooks/useCart";
import { categoryService } from "../services/categoryService";
import { productService } from "../services/productService";

const resolveProductImage = (product) => {
  const image = product?.product_images?.[0];
  return image ? `${WEB_URL}/${image}` : null;
};

export default function Products() {
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [productData, categoryData] = await Promise.all([
        productService.getAll(),
        categoryService.getAll(),
      ]);
      setProducts(productData);
      setCategories(categoryData);
    } catch (error) {
      toast.error(error?.response?.data?.message || error?.message || "Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (payload) => {
    try {
      if (editingProduct) {
        await productService.update({
          id: editingProduct._id,
          ...payload,
        });
        toast.success("Product updated successfully");
      } else {
        await productService.create(payload);
        toast.success("Product created successfully");
      }

      setEditingProduct(null);
      setShowForm(false);
      fetchData();
    } catch (error) {
      toast.error(error?.response?.data?.message || error?.message || "Failed to save product");
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Delete this product?");
    if (!confirmed) return;

    try {
      await productService.remove({ id });
      toast.success("Product deleted successfully");
      fetchData();
    } catch (error) {
      toast.error(error?.response?.data?.message || error?.message || "Failed to delete product");
    }
  };

  const handleAddToCart = async (product) => {
    try {
      await addToCart(product);
      toast.success("Product added to cart");
    } catch (error) {
      toast.error(error?.response?.data?.message || error?.message || "Failed to add to cart");
    }
  };

  return (
    <PageTransition>
      <div className="app-shell">
        <div className="page-header">
          <div>
            <h2 className="page-title">Products</h2>
            <p className="page-subtitle">Manage your product list and cart actions.</p>
          </div>
          <Button
            type="button"
            variant={showForm ? "secondary" : "primary"}
            onClick={() => {
              setEditingProduct(null);
              setShowForm((prev) => !prev);
            }}
          >
            {showForm ? "Close Form" : "Add Product"}
          </Button>
        </div>

        {showForm ? (
          <Card className="mb-6">
            <ProductForm product={editingProduct} categories={categories} onSubmit={handleSubmit} />
          </Card>
        ) : null}

        {loading ? (
          <Card className="p-5">
            <p className="text-sm text-slate-500">Loading products...</p>
          </Card>
        ) : products.length ? (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {products.map((product) => (
              <Card key={product._id} className="flex h-full flex-col overflow-hidden">
                <div className="h-48 bg-slate-100">
                  {resolveProductImage(product) ? (
                    <img
                      src={resolveProductImage(product)}
                      alt={product.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-sm text-slate-400">
                      No image
                    </div>
                  )}
                </div>

                <div className="flex flex-1 flex-col p-4">
                  <p className="text-sm text-slate-500">{product.category?.name || "Uncategorized"}</p>
                  <h3 className="mt-1 text-lg font-semibold text-slate-900">{product.name}</h3>
                  <p className="mt-2 flex-1 text-sm text-slate-500">{product.description}</p>
                  <p className="mt-3 text-base font-semibold text-blue-600">Rs. {product.price}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={() => {
                        setEditingProduct(product);
                        setShowForm(true);
                      }}
                    >
                      Edit
                    </Button>
                    <Button type="button" variant="danger" onClick={() => handleDelete(product._id)}>
                      Delete
                    </Button>
                    <Button type="button" variant="success" onClick={() => handleAddToCart(product)}>
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <EmptyState
            title="No products found"
            description="Create a product to start using the catalog."
            action={
              <Button type="button" variant="primary" onClick={() => setShowForm(true)}>
                Add Product
              </Button>
            }
          />
        )}
      </div>
    </PageTransition>
  );
}

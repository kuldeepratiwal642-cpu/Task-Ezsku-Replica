import React, { useEffect, useMemo, useState } from "react";
import Card from "../components/ui/Card";
import PageTransition from "../components/ui/PageTransition";
import StatCard from "../components/StatCard";
import { categoryService } from "../services/categoryService";
import { productService } from "../services/productService";
import { useCart } from "../hooks/useCart";

export default function Dashboard() {
  const { cartCount, syncCart } = useCart();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    Promise.all([
      productService.getAll(),
      categoryService.getAll(),
      syncCart(),
    ]).then(([productData, categoryData]) => {
      setProducts(productData);
      setCategories(categoryData);
    });
  }, []);

  const stats = useMemo(
    () => [
      { title: "Total Products", value: products.length },
      { title: "Total Categories", value: categories.length },
      { title: "Cart Items", value: cartCount },
    ],
    [products.length, categories.length, cartCount]
  );

  return (
    <PageTransition>
      <div className="app-shell">
        
        {/* Header */}
        <div className="page-header">
          <div>
            <h2 className="page-title">Dashboard 🚀</h2>
            <p className="page-subtitle">
              Simple overview of your store data.
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid gap-6 md:grid-cols-3">
          {stats.map((stat) => (
            <div className="stat-wrapper" key={stat.title}>
              <StatCard {...stat} />
            </div>
          ))}
        </div>

        {/* Cards Section */}
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          
          {/* Summary Card */}
          <Card className="custom-card">
            <h3 className="card-title">📊 Summary</h3>
            <div className="card-content">
              <p>Products available: {products.length}</p>
              <p>Categories created: {categories.length}</p>
              <p>Items in cart: {cartCount}</p>
            </div>
          </Card>

          {/* Notes Card */}
          <Card className="custom-card">
            <h3 className="card-title">📝 Notes</h3>
            <div className="card-content">
              <p>Use categories to organize products.</p>
              <p>Products added to cart stay saved in local storage.</p>
              <p>You can manage catalog data from the sidebar.</p>
            </div>
          </Card>
        </div>

        {/* Internal CSS */}
        <style>{`
          .app-shell {
            padding: 20px;
            min-height: 100vh;
            background: linear-gradient(135deg, #f0f4ff, #ffffff);
          }

          .page-header {
            margin-bottom: 20px;
          }

          .page-title {
            font-size: 28px;
            font-weight: bold;
            color: #1e293b;
          }

          .page-subtitle {
            color: #64748b;
          }

          /* Stat hover effect */
          .stat-wrapper {
            transition: transform 0.3s ease, box-shadow 0.3s ease;
          }

          .stat-wrapper:hover {
            transform: translateY(-8px) scale(1.03);
            box-shadow: 0px 10px 25px rgba(0, 0, 0, 0.1);
          }

          /* Card styling */
          .custom-card {
            padding: 20px;
            border-radius: 16px;
            background: rgba(255, 255, 255, 0.7);
            backdrop-filter: blur(10px);
            transition: all 0.3s ease;
            border: 1px solid #e2e8f0;
          }

          .custom-card:hover {
            transform: scale(1.02);
            box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.1);
          }

          .card-title {
            font-size: 18px;
            font-weight: 600;
            color: #0f172a;
          }

          .card-content {
            margin-top: 12px;
            font-size: 14px;
            color: #475569;
          }

          .card-content p {
            margin-bottom: 10px;
            transition: color 0.2s;
          }

          .card-content p:hover {
            color: #2563eb;
            cursor: pointer;
          }
        `}</style>
      </div>
    </PageTransition>
  );
}
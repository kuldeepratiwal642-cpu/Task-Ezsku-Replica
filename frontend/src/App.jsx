import React, { useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";
import Sidebar from "./components/Sidebar";
import Cart from "./pages/Cart";
import Categories from "./pages/Categories";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Products from "./pages/Products";
import Register from "./pages/Register";
import { authService } from "./services/authService";

function HomeRedirect() {
  return authService.isAuthenticated() ? (
    <Navigate to="/dashboard" replace />
  ) : (
    <Navigate to="/login" replace />
  );
}

function ProtectedShell({ children }) {
  const [collapsed, setCollapsed] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth < 1024 : false
  );
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setCollapsed(true);
      }
      if (window.innerWidth >= 1024) {
        setMobileOpen(false);
      }
    };

    const handleToggle = () => {
      if (window.innerWidth < 1024) {
        setMobileOpen((prev) => !prev);
      } else {
        setCollapsed((prev) => !prev);
      }
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("toggle-sidebar", handleToggle);
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("toggle-sidebar", handleToggle);
    };
  }, []);

  const toggleSidebar = () => {
    if (window.innerWidth < 1024) {
      setMobileOpen((prev) => !prev);
    } else {
      setCollapsed((prev) => !prev);
    }
  };

  return (
    <>
      <Navbar />
      {mobileOpen ? (
        <div
          className="fixed inset-0 z-20 bg-slate-950/35 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      ) : null}
      <div
        className={`fixed left-0 top-0 z-30 lg:z-auto ${
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        } transition-transform duration-300 ease-out`}
      >
        <Sidebar collapsed={collapsed} onToggle={toggleSidebar} />
      </div>
      <main
        className={`content-shell px-4 pb-10 sm:px-6 lg:px-8 ${
          collapsed ? "lg:ml-[76px]" : "lg:ml-[220px]"
        }`}
      >
        <div className="mx-auto max-w-[1200px] py-6 lg:py-8">{children}</div>
      </main>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeRedirect />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <ProtectedShell>
                <Dashboard />
              </ProtectedShell>
            </PrivateRoute>
          }
        />
        <Route
          path="/categories"
          element={
            <PrivateRoute>
              <ProtectedShell>
                <Categories />
              </ProtectedShell>
            </PrivateRoute>
          }
        />
        <Route
          path="/products"
          element={
            <PrivateRoute>
              <ProtectedShell>
                <Products />
              </ProtectedShell>
            </PrivateRoute>
          }
        />
        <Route
          path="/cart"
          element={
            <PrivateRoute>
              <ProtectedShell>
                <Cart />
              </ProtectedShell>
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <ToastContainer position="top-right" autoClose={2000} />
    </BrowserRouter>
  );
}

export default App;

import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../hooks/useCart";
import { authService } from "../services/authService";

export default function Navbar() {
  const navigate = useNavigate();
  const { cartCount } = useCart();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef();

  const user = authService.getCurrentUser();
  const isAuthenticated = authService.isAuthenticated();

  const handleLogout = () => {
    authService.logout();
    setOpen(false);
    navigate("/login");
  };

  // 👇 click outside close dropdown
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="topbar-glass">
      <div className="navbar-container">

        {/* Left */}
        <div className="left-section">
          <div>
            <h1 className="logo">User Panel 🚀</h1>
            <p className="subtitle">eCommerce dashboard</p>
          </div>
        </div>

        {/* Right */}
        {isAuthenticated ? (
          <div className="right-section">

            {/* Cart */}
            <button
              className="cart-btn"
              onClick={() => navigate("/cart")}
            >
              🛒 Cart
              <span className="cart-badge">{cartCount}</span>
            </button>

            {/* Profile */}
            <div className="profile" ref={dropdownRef}>
              <button
                className="profile-btn"
                onClick={() => setOpen(!open)}
              >
                {user?.name || "Admin"} ⬇
              </button>

              {/* Dropdown */}
              <div className={`dropdown ${open ? "show" : ""}`}>
                <p className="email">{user?.email}</p>

                <button className="logout-btn" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            </div>

          </div>
        ) : (
          <div className="right-section">
            <button className="login-btn" onClick={() => navigate("/login")}>
              Login
            </button>
            <button className="register-btn" onClick={() => navigate("/register")}>
              Register
            </button>
          </div>
        )}
      </div>

      {/* CSS */}
      <style>{`
        .topbar-glass {
          position: sticky;
          top: 0;
          z-index: 100;
          backdrop-filter: blur(10px);
          background: rgba(255,255,255,0.7);
          border-bottom: 1px solid #e2e8f0;
        }

        .navbar-container {
          width: 100%;
          max-width: 100%;
          margin: 0 auto;
          height: 64px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 20px;
          box-sizing: border-box;
        }

        .left-section {
          display: flex;
          align-items: center;
          gap: 12px;
          flex: 1;
          min-width: 0;
        }

        .right-section {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
          justify-content: flex-end;
        }

        .menu-btn {
          background: white;
          border: 1px solid #cbd5e1;
          padding: 6px 10px;
          border-radius: 6px;
          cursor: pointer;
          transition: 0.3s;
        }

        .menu-btn:hover {
          background: #f1f5f9;
          transform: scale(1.1);
        }

        .logo {
          font-size: 18px;
          font-weight: bold;
          color: #0f172a;
        }

        .subtitle {
          font-size: 11px;
          color: #64748b;
        }

        .right-section {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        /* Cart */
        .cart-btn {
          position: relative;
          padding: 8px 12px;
          border: 1px solid #cbd5e1;
          border-radius: 8px;
          background: white;
          cursor: pointer;
          transition: 0.3s;
        }

        .cart-btn:hover {
          background: #f8fafc;
          transform: translateY(-2px);
        }

        .cart-badge {
          margin-left: 6px;
          background: #2563eb;
          color: white;
          padding: 2px 6px;
          border-radius: 50%;
          font-size: 12px;
        }

        /* Profile */
        .profile {
          position: relative;
        }

        .profile-btn {
          padding: 8px 12px;
          border: 1px solid #cbd5e1;
          border-radius: 8px;
          background: white;
          cursor: pointer;
          transition: 0.3s;
        }

        .profile-btn:hover {
          background: #f1f5f9;
        }

        /* Dropdown */
        .dropdown {
          position: absolute;
          right: 0;
          top: 120%;
          width: 200px;
          background: white;
          border-radius: 10px;
          border: 1px solid #e2e8f0;
          padding: 12px;
          box-shadow: 0 10px 20px rgba(0,0,0,0.1);
          opacity: 0;
          transform: translateY(-10px);
          pointer-events: none;
          transition: all 0.3s ease;
        }

        .dropdown.show {
          opacity: 1;
          transform: translateY(0);
          pointer-events: auto;
        }

        .email {
          font-size: 13px;
          color: #64748b;
          margin-bottom: 10px;
        }

        .logout-btn {
          width: 100%;
          padding: 8px;
          background: #ef4444;
          color: white;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          transition: 0.3s;
        }

        .logout-btn:hover {
          background: #dc2626;
        }

        /* Auth buttons */
        .login-btn {
          padding: 8px 12px;
          border: 1px solid #cbd5e1;
          border-radius: 8px;
          background: white;
          cursor: pointer;
        }

        .register-btn {
          padding: 8px 12px;
          background: #2563eb;
          color: white;
          border-radius: 8px;
          border: none;
          cursor: pointer;
          transition: 0.3s;
        }

        .register-btn:hover {
          background: #1d4ed8;
        }
      `}</style>
    </header>
  );
}
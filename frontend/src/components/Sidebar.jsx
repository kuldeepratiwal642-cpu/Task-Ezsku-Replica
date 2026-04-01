import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const menuItems = [
  { to: "/dashboard", label: "Dashboard", icon: "🏠" },
  { to: "/categories", label: "Categories", icon: "📂" },
  { to: "/products", label: "Products", icon: "📦" },
  { to: "/cart", label: "Cart", icon: "🛒" },
];

export default function Sidebar() {
  const location = useLocation();
  const [hovered, setHovered] = useState(false);

  return (
    <aside
      className={`sidebar ${hovered ? "expanded" : "collapsed"}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="sidebar-container">

        {/* Logo */}
        <div className="logo-section">
          {hovered ? (
            <div>
              <h2 className="logo-text">User 🚀</h2>
              <p className="logo-sub">Management</p>
            </div>
          ) : (
            <div className="logo-mini">A</div>
          )}
        </div>

        {/* Menu */}
        <nav className="menu">
          {menuItems.map((item) => {
            const active = location.pathname === item.to;

            return (
              <Link
                key={item.to}
                to={item.to}
                className={`menu-item ${active ? "active" : ""}`}
              >
                <span className="icon">{item.icon}</span>
                <span className="label">{item.label}</span>

                {/* Tooltip when collapsed */}
                {!hovered && (
                  <span className="tooltip">{item.label}</span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* CSS */}
      <style>{`
        .sidebar {
          width: 220px;
          height: calc(100vh - 64px);
          position: fixed;
          left: 0;
          top: 64px;
          background: linear-gradient(180deg, #0f172a, #020617);
          overflow: hidden;
          z-index: 100;
        }

        .collapsed {
          width: 70px;
        }

        .expanded {
          width: 220px;
        }

        .sidebar-container {
          display: flex;
          flex-direction: column;
          height: 100%;
        }

        /* Logo */
        .logo-section {
          padding: 20px 10px;
          border-bottom: 1px solid #1e293b;
          text-align: center;
        }

        .logo-text {
          color: white;
          font-size: 16px;
          font-weight: bold;
        }

        .logo-sub {
          font-size: 11px;
          color: #64748b;
        }

        .logo-mini {
          color: white;
          font-size: 18px;
          font-weight: bold;
        }

        /* Menu */
        .menu {
          padding: 10px;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .menu-item {
          position: relative;
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 10px;
          border-radius: 10px;
          color: #cbd5e1;
          text-decoration: none;
          transition: all 0.3s ease;
        }

        .menu-item:hover {
          background: #1e293b;
          transform: translateX(5px);
        }

        .menu-item.active {
          background: linear-gradient(90deg, #2563eb, #1d4ed8);
          color: white;
          box-shadow: 0 5px 15px rgba(37, 99, 235, 0.3);
        }

        .icon {
          font-size: 18px;
          min-width: 30px;
          text-align: center;
        }

        .label {
          white-space: nowrap;
          opacity: 1;
          transition: opacity 0.2s;
        }

        .collapsed .label {
          opacity: 0;
        }

        /* Tooltip */
        .tooltip {
          position: absolute;
          left: 60px;
          background: black;
          color: white;
          padding: 4px 8px;
          font-size: 12px;
          border-radius: 4px;
          opacity: 0;
          pointer-events: none;
          transform: translateX(-10px);
          transition: 0.3s;
        }

        .collapsed .menu-item:hover .tooltip {
          opacity: 1;
          transform: translateX(0);
        }
      `}</style>
    </aside>
  );
}
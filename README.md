# Task-Ezsku-Replica

## Project Overview
Task-Ezsku-Replica is a full-stack e-commerce admin panel with:
- user authentication (register/login)
- category CRUD operations
- product CRUD operations with image upload
- cart management (add/update/remove/save later)
- protected routes
- toast notifications, response handling

This is a replica/clone project (inspired by an dummy UI template) built with:
- Backend: Node.js, Express.js, MongoDB, Mongoose, JWT
- Frontend: React, Vite, React Router, TailwindCSS (and custom CSS)
- Notifications: react-toastify

---

## Repository Structure

```
backend/
  src/
    controllers/
    models/
    routes/
    middlewares/
    config/
    utils/
    app.js
    ...
  package.json

frontend/
  src/
    components/
    pages/
    services/
    context/
    hooks/
    config/
    App.jsx
    main.jsx
  public/
  package.json
```

---

## Setup and Run (locally)

### 1) Backend setup

```bash
cd backend
npm install
```

Create a `.env` in `backend` with at least:
- `PORT=3003`
- `MONGO_URI=mongodb://localhost:27017/taskcompony` (or your DB URI)
- `JWT_SECRET=your_super_secret`
- `WEB_URL=http://localhost:3003`

Then:

```bash
npm run dev
```

Should show:
- `Server running at http://localhost:3003`
- `MongoDB connected`

### 2) Frontend setup

```bash
cd frontend
npm install
```

Set `frontend/.env` (or `vite.config.js`) to backend URL:
- `VITE_API_BASE_URL=http://localhost:3003`

Start app:

```bash
npm run dev
```

Open:
- `http://localhost:5173` (or output URL)

---

## Key Endpoints (Backend)

- Auth: `POST /api/auth/register`, `POST /api/auth/login`
- Category: `GET /api/category/category_list`, `POST /api/category/add_category`, `PUT /api/category/edit_category`, `DELETE /api/category/delete_category`, `DELETE /api/category/delete_category/:id`
- Product: `GET /api/product/product_list`, `POST /api/product/add_product`, `PUT /api/product/edit_product`, `DELETE /api/product/delete_product`, `DELETE /api/product/delete_product/:id`
- Cart: `GET /api/cart/get_cart`, `POST /api/cart/add_to_cart`, `PUT /api/cart/update_to_cart`, `DELETE /api/cart/remove_cart`, etc.

---

## Auth / Protected Routes
- JWT is used via header `Authorization: Bearer <token>`.
- `verifyToken` middleware protects cart/category/product endpoints.
- Frontend stores token in localStorage and applies it via axios interceptors (`apiClient.js`).

---

## Test Flow
1. Register user -> login -> see token in localStorage
2. Create category with image
3. Create product in category + image
4. Add to cart, update, remove
5. Delete product, category (ensure dependencies removed)

---

## Tips
- Run `npm run dev` in both `backend` and `frontend`.
- Use Postman / Insomnia for backend API testing.
- Clear `localStorage` when switching accounts.

---



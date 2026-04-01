# NPM Packages & Import Reference

## 📦 Complete Package List

### Installation Command
```bash
npm install
```

This installs all packages listed in `package.json`:

---

## Core React Packages

### react@^18.2.0
```javascript
import React from "react";
import { useState, useEffect } from "react";
```
**Used in**: Every component  
**Purpose**: React library and hooks

### react-dom@^18.2.0
```javascript
import ReactDOM from "react-dom/client";
```
**Used in**: `src/index.js`  
**Purpose**: Render React to DOM

---

## Routing

### react-router-dom@^6.20.0
```javascript
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useNavigate, useParams, Link } from "react-router-dom";
```
**Used in**: 
- `App.js` - Main router
- Most components - Navigation
**Purpose**: Client-side routing

**Routes Used**:
```javascript
<Route path="/" element={<Login />} />
<Route path="/dashboard" element={<Dashboard />} />
<Route path="/user" element={<User />} />
<Route path="/addUser" element={<AddUser />} />
<Route path="/editUser/:id" element={<EditUser />} />
// ... more routes
```

---

## HTTP Client

### axios@^1.6.2
```javascript
import axios from "axios";
```
**Used in**: All components making API calls  
**Purpose**: Make HTTP requests to backend

**Usage Pattern**:
```javascript
const response = await axios.post(
  `${BACKEND_URL_ADMIN}/endpoint`,
  data,
  {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
);
```

---

## Form Management

### formik@^2.4.5
```javascript
import { useFormik } from "formik";
```
**Used in**: Login, User, Category, Product forms  
**Purpose**: Form state management

**Usage Pattern**:
```javascript
const formik = useFormik({
  initialValues: { email: "", password: "" },
  validationSchema: Yup.object({ /* ... */ }),
  onSubmit: async (values) => { /* ... */ }
});
```

### yup@^1.3.3
```javascript
import * as Yup from "yup";
```
**Used in**: Form validation  
**Purpose**: Schema validation

**Usage Pattern**:
```javascript
const validationSchema = Yup.object({
  email: Yup.string().email().required("Email is required"),
  password: Yup.string().required("Password is required")
});
```

---

## Notifications

### react-toastify@^9.1.3
```javascript
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
```
**Used in**: 
- `App.js` - Container
- All components - toast notifications
**Purpose**: Show success/error messages

**Usage Pattern**:
```javascript
<ToastContainer theme="dark" position="top-right" autoClose={2000} />
```

```javascript
toast.success("Success message");
toast.error("Error message");
```

---

## Secure Storage

### react-secure-storage@^1.0.0
```javascript
import secureLocalStorage from "react-secure-storage";
```
**Used in**: `src/utils/helper.js`  
**Purpose**: Store tokens securely

**Usage Pattern**:
```javascript
secureLocalStorage.setItem("token", tokenValue);
const token = secureLocalStorage.getItem("token");
secureLocalStorage.removeItem("token");
secureLocalStorage.clearStorage();
```

---

## External CDN Resources (in index.html)

### Bootstrap 4.5.2
```html
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" />
```
**Used in**: HTML layout classes  
**Purpose**: CSS framework

**CSS Classes Used**:
```
col-md-5, col-lg-4, col-lg-8
row, container-fluid
form-control, form-group, btn, btn-primary
table, card
align-self-center, justify-content-center
text-primary, d-block, ml-2
```

### Font Awesome 4.7.0
```html
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
```
**Used in**: Navigation & UI icons  
**Purpose**: Icon library

**Icons Used**:
```
fa-tachometer (Dashboard)
fa-users (Users)
fa-bars (Categories, Products)
```

---

## Build & Development Tools

### vite@^5.0.0
**Purpose**: Build tool and dev server  
**Config**: `vite.config.js`

### @vitejs/plugin-react@^4.2.1
**Purpose**: React support for Vite

### eslint@^8.54.0
**Purpose**: Code linting

### eslint-plugin-react@^7.33.2
**Purpose**: React-specific ESLint rules

### prettier@^3.1.0
**Purpose**: Code formatting

---

## Usage Summary by Component Type

### 📝 Form Components (Login, AddUser, EditUser, etc.)
```javascript
// Imports needed
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import { getItem, errorHandler } from "../../utils/helper";
```

### 📊 List/Table Components (User, Category, Product)
```javascript
// Imports needed
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { getItem, errorHandler } from "../../utils/helper";
```

### 🎨 Layout Components
```javascript
// Imports needed
import React from "react";
import { Link } from "react-router-dom";
```

---

## Config Files

### src/config/ApiConfig.js
```javascript
export const BACKEND_URL_ADMIN = "http://localhost:3001/admin";
export const WEB_URL = "http://localhost:3001";
```

### src/utils/helper.js
```javascript
import secureLocalStorage from "react-secure-storage";
import { toast } from "react-toastify";

export const setItem = (key, value) => { /* ... */ };
export const getItem = (key) => { /* ... */ };
export const removeItem = (key) => { /* ... */ };
export const clearStorage = () => { /* ... */ };
export const errorHandler = (error) => { /* ... */ };
```

---

## Environment Variables

### .env.local
```env
VITE_BACKEND_URL=http://localhost:3001
VITE_API_ADMIN_URL=http://localhost:3001/admin
```

### Access in Code
```javascript
// If using Vite, access with VITE_ prefix
const apiUrl = import.meta.env.VITE_BACKEND_URL;
```

---

## Dependency Tree (Top Level)

```
frontend/
└── node_modules/
    ├── react (18.2.0)
    ├── react-dom (18.2.0)
    ├── react-router-dom (6.20.0)
    ├── axios (1.6.2)
    ├── formik (2.4.5)
    │   └── dependencies...
    ├── yup (1.3.3)
    │   └── dependencies...
    ├── react-toastify (9.1.3)
    │   └── dependencies...
    ├── react-secure-storage (1.0.0)
    │   └── dependencies...
    ├── vite (5.0.0)
    ├── @vitejs/plugin-react (4.2.1)
    ├── eslint (8.54.0)
    ├── eslint-plugin-react (7.33.2)
    ├── prettier (3.1.0)
    └── [100+ other packages/dependencies...]
```

---

## File Size Reference (approximate)

| Directory | Size |
|-----------|------|
| node_modules/ | ~400-500 MB |
| src/ | ~150 KB |
| dist/ (after build) | ~200-300 KB |

---

## Update/Upgrade Commands

```bash
# Check outdated packages
npm outdated

# Update a specific package
npm install react@latest

# Update all packages
npm update

# Force complete reinstall
npm ci
```

---

## Peer Dependencies

Some packages have peer dependencies included automatically:
- formik depends on react@^16.8.0 or higher ✅
- react-router-dom depends on react@^18.0.0 ✅
- react-toastify works with react@^16.8.0 or higher ✅

All compatible with React 18.2.0 ✅

---

## Common Import Patterns

### From React
```javascript
import React from "react";
import { useState, useEffect, useCallback } from "react";
```

### From react-router-dom
```javascript
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useNavigate, useParams, Link } from "react-router-dom";
```

### From axios
```javascript
import axios from "axios";
```

### From formik & yup
```javascript
import { useFormik } from "formik";
import * as Yup from "yup";
```

### From react-toastify
```javascript
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // If CSS not in index.html
```

### From custom config
```javascript
import { BACKEND_URL_ADMIN, WEB_URL } from "../config/ApiConfig";
import { setItem, getItem, errorHandler } from "../utils/helper";
```

---

**Last Updated**: April 2026  
**Total Packages**: 150+  
**Installation Time**: 2-5 minutes (depending on internet speed)

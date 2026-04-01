# 🚀 Quick Setup Guide

## One-Time Setup (First Time Only)

### 1️⃣ Prerequisites Check
```bash
# Verify Node.js version (should be >= 16)
node --version

# Verify npm version (should be >= 8)
npm --version
```

### 2️⃣ Install Dependencies
```bash
cd frontend
npm install
```

This installs all packages in `node_modules/` (~150+ packages):
- React, React DOM
- React Router DOM
- Axios (HTTP client)
- Formik & Yup (forms)
- React Toastify (notifications)
- React Secure Storage
- Vite & plugins
- ESLint, Prettier

### 3️⃣ Create Environment File
```bash
cp .env.example .env.local
```

Edit `.env.local`:
```env
VITE_BACKEND_URL=http://localhost:3001
VITE_API_ADMIN_URL=http://localhost:3001/admin
```

### 4️⃣ Verify Backend is Running
```bash
# Backend should be running on port 3001
# Test: curl http://localhost:3001/admin
```

---

## Every Time You Start Development

### Start Dev Server (One Command)
```bash
npm run dev
```

✅ This will:
- Start Vite dev server on `http://localhost:3000`
- Auto-open browser
- Enable hot reload (changes refresh automatically)
- Enable source maps (better debugging)

---

## What's Already Set Up For You

✅ **Framework**: React 18 with functional components  
✅ **Build Tool**: Vite (fastest, modern bundler)  
✅ **Routing**: React Router v6 with all routes configured  
✅ **Forms**: Formik + Yup validation  
✅ **HTTP**: Axios with JWT authentication  
✅ **Styling**: Bootstrap 4.5.2 + Font Awesome via CDN  
✅ **Notifications**: React Toastify  
✅ **Auth**: Secure token storage  

---

## Missing Components Added

### ✅ User/AddUser.jsx
- Form to add new users
- Validation for all fields
- Success redirect to user list

### ✅ User/EditUser.jsx
- Form to edit existing users
- Fetches user data by ID
- Pre-fills form fields
- Email field disabled

---

## Project Structure (Key Files)

```
frontend/
├── public/
│   ├── index.html              ← Main HTML file
│   └── favicon.svg             ← Icon
├── src/
│   ├── index.js                ← React entry
│   ├── App.js                  ← All routes here
│   ├── App.css                 ← Styles
│   ├── config/ApiConfig.js     ← API URLs
│   ├── utils/helper.js         ← Helper functions
│   └── components/             ← All components
├── package.json                ← Dependencies list
├── vite.config.js              ← Build config
├── .env.local                  ← Your env variables
└── README.md                   ← Full documentation
```

---

## Available Commands

```bash
npm run dev         # Start dev server (http://localhost:3000)
npm run build       # Build for production (creates dist/)
npm run preview     # Preview production build
npm run lint        # Check code for errors
npm run format      # Auto-format code
```

---

## Backend API Integration

### Login Flow
```
1. User enters email/password
2. POST /admin/auth/login
3. Token received → stored securely
4. Redirected to /dashboard
```

### Protected Routes
```
All API calls include:
headers: { Authorization: `Bearer ${token}` }
```

### If Unauthorized (401)
```
→ User redirected to /
→ Storage cleared
→ Must login again
```

---

## Troubleshooting

### Port 3000 already in use
```bash
# Kill the process or change port in vite.config.js
```

### node_modules issues
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Backend connection error
```bash
# Make sure backend is running on localhost:3001
# Check API URLs in .env.local
```

### Module not found error
```bash
# Ensure all dependencies are installed
npm install
# Then restart dev server
npm run dev
```

---

## File Breakdown

| File | Purpose |
|------|---------|
| **public/index.html** | Main HTML template |
| **src/index.js** | React DOM entry point |
| **src/App.js** | Root component + routing |
| **src/components/** | All page & layout components |
| **src/config/ApiConfig.js** | API endpoint URLs |
| **src/utils/helper.js** | Storage & error handling |
| **package.json** | All dependencies listed |
| **vite.config.js** | Build & dev configuration |
| **.env.local** | API URLs (create from .env.example) |

---

## Running the Project

### Development (With Hot Reload)
```bash
npm run dev
# Open http://localhost:3000
# Login with your backend credentials
```

### Production Build
```bash
npm run build
# Creates dist/ folder
# Upload dist/ to your server
```

---

## Authentication & Token

### Token Storage
- Stored in **secure local storage** (not cookies)
- Persists across page refreshes
- Cleared on logout or 401 error

### API Headers
```javascript
Authorization: Bearer YOUR_TOKEN_HERE
```

### Logout
```javascript
clearStorage() // Clears all tokens
window.location.href = "/" // Redirect to login
```

---

## Next Steps

1. ✅ Install: `npm install`
2. ✅ Setup .env: `cp .env.example .env.local`
3. ✅ Start: `npm run dev`
4. ✅ Login with backend credentials
5. ✅ Navigate to different features
6. ✅ Build for production: `npm run build`

---

## 📚 Full Documentation

For detailed documentation, see:
- **README.md** - Complete project documentation
- **PROJECT_STRUCTURE.md** - Detailed folder & component structure
- **vite.config.js** - Build configuration
- **package.json** - Dependencies list

---

**Ready to start? Run: `npm run dev`**

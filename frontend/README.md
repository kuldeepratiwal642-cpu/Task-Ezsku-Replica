# Admin Dashboard Frontend

A modern React-based admin dashboard application for eCommerce management.

## 🚀 Features

- **Authentication**: Login and registration with form validation
- **Dashboard**: Overview with statistics
- **Category Management**: Create, read, update, delete categories
- **Product Management**: Full CRUD operations for products
- **Cart Management**: Add to cart, update quantities, save for later
- **Responsive Design**: Works on desktop and mobile
- **Modern UI**: Built with Tailwind CSS
- **Form Handling**: Formik with Yup validation
- **API Integration**: Axios for HTTP requests
- **State Management**: React Context for cart
- **Notifications**: Toast notifications for user feedback

## 🛠️ Tech Stack

- **React 18** - UI library
- **Vite** - Build tool
- **React Router** - Client-side routing
- **Tailwind CSS** - Styling
- **Formik & Yup** - Form handling and validation
- **Axios** - HTTP client
- **React Toastify** - Notifications
- **Framer Motion** - Animations

## 📦 Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy environment variables:
   ```bash
   cp .env.example .env
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## 🔧 Environment Variables

Create a `.env` file with:

```env
VITE_BACKEND_URL=http://localhost:3001
```

## 📜 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Basic UI elements (Button, Card, etc.)
│   └── ...             # Page-specific components
├── pages/              # Route components
├── services/           # API service functions
├── context/            # React Context providers
├── hooks/              # Custom React hooks
├── config/             # Configuration files
└── utils/              # Utility functions
```

## 🚀 Deployment

Build the app for production:

```bash
npm run build
```

The built files will be in the `dist/` directory, ready for deployment to any static hosting service.
│       ├── VerifiedOtp.jsx          # OTP verification page
│       ├── ResetPassword.jsx        # Password reset page
│       │
│       ├── Admin/
│       │   └── AdminProfile.jsx     # Admin profile page
│       │
│       ├── User/
│       │   ├── User.jsx             # User list page
│       │   ├── AddUser.jsx          # Add new user form
│       │   └── EditUser.jsx         # Edit user form
│       │
│       ├── Category/
│       │   ├── Category.jsx         # Category list page
│       │   ├── AddCategory.jsx      # Add new category form
│       │   └── EditCategory.jsx     # Edit category form
│       │
│       ├── Product/
│       │   ├── product.jsx          # Product list page
│       │   ├── AddProduct.jsx       # Add new product form
│       │   └── EditProduct.jsx      # Edit product form
│       │
│       └── Layout/
│           ├── Layout.jsx           # Main layout wrapper
│           ├── Header.jsx           # Header component
│           └── Sidebar.jsx          # Sidebar navigation
│
├── package.json                     # Project dependencies
├── vite.config.js                   # Vite configuration
├── .env.example                     # Environment variables template
├── .gitignore                       # Git ignore file
└── README.md                        # This file
```

---

## 🚀 Installation & Setup

### Prerequisites
- **Node.js**: v16.0.0 or higher
- **npm**: v8.0.0 or higher (or yarn)
- **Backend**: Ensure backend API is running on `http://localhost:3001`

### Step-by-Step Installation

#### 1. **Clone/Navigate to Project**
```bash
cd frontend
```

#### 2. **Install Dependencies**
```bash
npm install
```

Or using yarn:
```bash
yarn install
```

#### 3. **Setup Environment Variables**
Create a `.env.local` file based on `.env.example`:
```bash
cp .env.example .env.local
```

Edit `.env.local` with your backend URLs:
```env
VITE_BACKEND_URL=http://localhost:3001
VITE_API_ADMIN_URL=http://localhost:3001/admin
```

#### 4. **Start Development Server**
```bash
npm run dev
```

Or using yarn:
```bash
yarn dev
```

The application will automatically open in your browser at `http://localhost:3000`

---

## 📦 Dependencies

### Production Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| react | ^18.2.0 | UI library |
| react-dom | ^18.2.0 | React DOM rendering |
| react-router-dom | ^6.20.0 | Client-side routing |
| axios | ^1.6.2 | HTTP client for API calls |
| formik | ^2.4.5 | Form state management |
| yup | ^1.3.3 | Schema validation |
| react-toastify | ^9.1.3 | Toast notifications |
| react-secure-storage | ^1.0.0 | Secure local storage |

### Development Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| vite | ^5.0.0 | Build tool & dev server |
| @vitejs/plugin-react | ^4.2.1 | React support for Vite |
| eslint | ^8.54.0 | Code linting |
| eslint-plugin-react | ^7.33.2 | React ESLint rules |
| prettier | ^3.1.0 | Code formatter |

### External CDN Resources (loaded in index.html)

- **Font Awesome 4.7.0**: Icon library (loaded via CDN)
- **Bootstrap 4.5.2**: CSS framework (loaded via CDN)

---

## 🎯 Available Scripts

```bash
# Start development server with hot reload
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run ESLint
npm run lint

# Format code with Prettier
npm run format
```

---

## 🔐 Authentication Flow

1. User logs in via `/` (Login page)
2. Credentials validated against backend API
3. Auth token stored in secure local storage
4. Redirected to `/dashboard` on successful login
5. Token sent with every API request in Authorization header
6. If unauthorized (401), user redirected to login and storage cleared

---

## 🛣️ Routing

| Route | Component | Purpose |
|-------|-----------|---------|
| `/` | Login | User login page |
| `/dashboard` | Dashboard | Dashboard with statistics |
| `/user` | User | User list page |
| `/addUser` | AddUser | Add new user form |
| `/editUser/:id` | EditUser | Edit user form |
| `/category` | Category | Category list page |
| `/addCategory` | AddCategory | Add new category form |
| `/editCategory/:id` | EditCategory | Edit category form |
| `/product` | Product | Product list page |
| `/addProduct` | AddProduct | Add new product form |
| `/editProduct/:id` | EditProduct | Edit product form |
| `/forgotPassword` | ForgotPassword | Forgot password page |
| `/VerifiedOtp` | VerifiedOtp | OTP verification page |
| `/resetPassword` | ResetPassword | Password reset page |
| `/get_profile` | AdminProfile | Admin profile page |

---

## 🔌 API Integration

### API Base URL
- **Admin API**: `http://localhost:3001/admin`
- **API Config**: `src/config/ApiConfig.js`

### Authentication Header
All authenticated requests include:
```javascript
headers: {
  Authorization: `Bearer ${token}`
}
```

### Common Endpoints (Pattern)

**User Management**
- `POST /admin/user/getAllUser` - Get all users
- `POST /admin/user/addUser` - Add new user
- `POST /admin/user/updateUser` - Update user
- `POST /admin/user/getUserById` - Get user by ID

**Category Management**
- `POST /admin/category/categoryList` - Get all categories
- `POST /admin/category/addCategory` - Add new category
- `POST /admin/category/updateCategory` - Update category
- `POST /admin/category/status` - Toggle category status

**Product Management**
- `POST /admin/product/productList` - Get all products
- `POST /admin/product/addProduct` - Add new product
- `POST /admin/product/updateProduct` - Update product
- `POST /admin/product/status` - Toggle product status

**Authentication**
- `POST /admin/auth/login` - User login
- `POST /admin/auth/forgotPassword` - Request password reset
- `POST /admin/auth/verifyOtp` - Verify OTP
- `POST /admin/auth/resetPassword` - Reset password

---

## 🚨 Error Handling

The app includes global error handling:

```javascript
// src/utils/helper.js - errorHandler function
- HTTP 401: User unauthorized → Redirect to login & clear storage
- Other errors: Display toast notification with error message
```

---

## 💾 State Management

Uses **React Hooks** for state management:
- `useState` - Component state
- `useEffect` - Side effects (data fetching)
- `useNavigate` - Programmatic routing
- `useParams` - Route parameters
- `useFormik` - Form state management

---

## 🎨 Styling

- **Bootstrap 4.5.2** via CDN for layout & components
- **Font Awesome 4.7.0** via CDN for icons
- **Custom CSS** in `src/App.css`
- **Inline styles** for component-specific styling

---

## 🔧 Build Process

### Development Build
```bash
npm run dev
```
- Vite dev server on `http://localhost:3000`
- Hot module replacement (HMR) enabled
- Source maps enabled for debugging

### Production Build
```bash
npm run build
```
- Creates optimized build in `dist/` folder
- Minified JavaScript & CSS
- Optimized asset loading

### Preview Production Build
```bash
npm run preview
```
- Preview production build locally before deployment

---

## ⚙️ Configuration Files

### vite.config.js
- DEV server port: 3000
- Auto-open browser
- API proxy configuration
- Build output: `dist/`

### .env.example
Template for environment variables:
```env
VITE_BACKEND_URL=http://localhost:3001
VITE_API_ADMIN_URL=http://localhost:3001/admin
```

---

## 🐛 Troubleshooting

### Issue: "Cannot find module 'react'"
**Solution**: Run `npm install`

### Issue: "Port 3000 already in use"
**Solution**: Kill process or change port in `vite.config.js`

### Issue: "Backend connection refused"
**Solution**: Ensure backend server is running on `http://localhost:3001`

### Issue: "401 Unauthorized"
**Solution**: Token expired or invalid. User will be redirected to login.

### Issue: "React-secure-storage not found"
**Solution**: Ensure all dependencies are installed with `npm install --save react-secure-storage`

---

## 📝 Node Modules Reference

### Key Packages Installed

**After running `npm install`, these will be installed in `node_modules/`:**

```
node_modules/
├── react/                           # React library
├── react-dom/                       # React DOM rendering
├── react-router-dom/                # Client-side routing
├── axios/                           # HTTP client
├── formik/                          # Form state management
├── yup/                             # Schema validation
├── react-toastify/                  # Notifications
├── react-secure-storage/            # Secure storage
├── vite/                            # Build tool
├── @vitejs/plugin-react/            # React plugin for Vite
└── [other peer dependencies...]
```

**Total packages:** ~150+ (including all dependencies and peer dependencies)

---

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Output Directory
- Production build: `dist/` folder

### Deploy
- Upload contents of `dist/` folder to your hosting service
- Configure server to serve `index.html` for all routes (SPA)
- Update `VITE_API_ADMIN_URL` in production environment

---

## 🔐 Security Notes

1. **Tokens**: Stored in secure local storage, not cookies
2. **API URLs**: Can be customized via `.env` file
3. **CORS**: Backend should allow CORS from frontend domain
4. **HTTPS**: Use HTTPS in production
5. **Environment Variables**: Never commit `.env` files with production secrets

---

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

---

## 📞 Support & Troubleshooting

### Common Issues

**Issue**: npm install fails
```bash
# Clear npm cache
npm cache clean --force
# Reinstall
npm install
```

**Issue**: Vite dev server not starting
```bash
# Check port 3000 is free
# Or update vite.config.js port value
```

**Issue**: API calls fail
- Verify backend is running
- Check API URLs in `.env.local`
- Verify CORS is enabled in backend

---

## 📄 License

This project is proprietary. All rights reserved.

---

## ✅ Checklist Before Running

- [ ] Node.js >= 16 installed
- [ ] npm >= 8 installed
- [ ] Backend running on `http://localhost:3001`
- [ ] Dependencies installed (`npm install`)
- [ ] `.env.local` created with correct API URLs
- [ ] No other service running on port 3000

---

## 🎯 Quick Start Summary

```bash
# 1. Navigate to project
cd frontend

# 2. Install dependencies
npm install

# 3. Setup environment
cp .env.example .env.local
# Edit .env.local with your API URLs

# 4. Start dev server
npm run dev

# 5. Open browser
# http://localhost:3000

# 6. Login with backend credentials
```

---

**Last Updated**: April 2026  
**React Version**: 18+  
**Build Tool**: Vite 5.0+

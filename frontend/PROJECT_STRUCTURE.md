# Project Structure & Detailed Documentation

## Complete Folder Structure

```
frontend/
│
├── 📂 public/                              # Static assets & HTML
│   ├── index.html                          # Main HTML entry point (Vite entry)
│   └── favicon.svg                         # Application favicon
│
├── 📂 src/                                 # Main application source code
│   │
│   ├── index.js                            # React DOM render entry point
│   ├── App.js                              # Root component with all routes
│   ├── App.css                             # Global application styles
│   │
│   ├── 📂 config/                          # Configuration files
│   │   └── ApiConfig.js                    # API endpoints & URLs
│   │                                       # - BACKEND_URL_ADMIN
│   │                                       # - WEB_URL
│   │
│   ├── 📂 utils/                           # Utility functions
│   │   └── helper.js                       # Helper functions
│   │                                       # - setItem (secure storage)
│   │                                       # - getItem (secure storage)
│   │                                       # - removeItem (storage)
│   │                                       # - clearStorage (storage cleanup)
│   │                                       # - errorHandler (API error handling)
│   │
│   └── 📂 components/                      # React components
│       │
│       ├── 🔐 Authentication Pages
│       │   ├── Login.jsx                   # Login page
│       │   ├── forgotPassword.jsx          # Forgot password form
│       │   ├── VerifiedOtp.jsx             # OTP verification page
│       │   └── ResetPassword.jsx           # Password reset form
│       │
│       ├── 📊 Core Pages
│       │   ├── Dashboard.jsx               # Dashboard with statistics
│       │   │
│       │   ├── 👥 User Management
│       │   │   ├── User/
│       │   │   │   ├── User.jsx            # User list table page
│       │   │   │   ├── AddUser.jsx         # ✅ NEW: Add user form
│       │   │   │   └── EditUser.jsx        # ✅ NEW: Edit user form
│       │   │   │
│       │   │   ├── 📦 Category Management
│       │   │   │   ├── Category/
│       │   │   │   │   ├── Category.jsx    # Category list page
│       │   │   │   │   ├── AddCategory.jsx # Add category form
│       │   │   │   │   └── EditCategory.jsx # Edit category form
│       │   │   │   │
│       │   │   ├── 🏷️ Product Management
│       │   │   │   └── Product/
│       │   │   │       ├── product.jsx     # Product list page
│       │   │   │       ├── AddProduct.jsx  # Add product form
│       │   │   │       └── EditProduct.jsx # Edit product form
│       │   │   │
│       │   │   └── 👤 Admin
│       │   │       └── Admin/
│       │   │           └── AdminProfile.jsx # Admin profile page
│       │   │
│       │   └── 🎨 Layout Components
│       │       └── Layout/
│       │           ├── Layout.jsx          # Main layout wrapper (header + sidebar + content)
│       │           ├── Header.jsx          # Top navigation header
│       │           └── Sidebar.jsx         # Left sidebar navigation
│       │
│       └── [More to be organized as needed]
│
├── 📄 Configuration Files
│   ├── package.json                        # Project dependencies & scripts
│   ├── vite.config.js                      # Vite build configuration
│   ├── .env.example                        # Environment variables template
│   ├── .gitignore                          # Git ignore rules
│   └── README.md                           # Project documentation
│
└── 📂 node_modules/                        # Installed dependencies (~150+ packages)
    ├── react/
    ├── react-dom/
    ├── react-router-dom/
    ├── axios/
    ├── formik/
    ├── yup/
    ├── react-toastify/
    ├── react-secure-storage/
    ├── vite/
    └── [all peer dependencies...]
```

---

## 📊 Component Map & Relationships

### Page Components (Full Page Routes)

```
App.js (Router)
│
├─ Login.jsx                      [Route: /]
├─ Dashboard.jsx                  [Route: /dashboard]
├─ forgotPassword.jsx             [Route: /forgotPassword]
├─ VerifiedOtp.jsx                [Route: /VerifiedOtp]
├─ ResetPassword.jsx              [Route: /resetPassword]
│
├─ User/User.jsx                  [Route: /user]
├─ User/AddUser.jsx ✅ NEW         [Route: /addUser]
├─ User/EditUser.jsx ✅ NEW        [Route: /editUser/:id]
│
├─ Category/Category.jsx          [Route: /category]
├─ Category/AddCategory.jsx       [Route: /addCategory]
├─ Category/EditCategory.jsx      [Route: /editCategory/:id]
│
├─ Product/product.jsx            [Route: /product]
├─ Product/AddProduct.jsx         [Route: /addProduct]
├─ Product/EditProduct.jsx        [Route: /editProduct/:id]
│
└─ Admin/AdminProfile.jsx         [Route: /get_profile]
```

### Layout Components (Reusable)

```
Layout/Layout.jsx (Wrapper)
│
├─ Layout/Header.jsx             (Navigation bar)
└─ Layout/Sidebar.jsx            (Side navigation)
```

---

## 🔌 API Integration Map

### Backend API Endpoints Used

**Base URL**: `http://localhost:3001/admin`

#### Authentication
```
POST /auth/login
POST /auth/forgotPassword
POST /auth/verifyOtp
POST /auth/resetPassword
```

#### User Management
```
POST /user/getAllUser           (Get all users)
POST /user/addUser              (Add new user) ✅ AddUser.jsx
POST /user/updateUser           (Update user) ✅ EditUser.jsx
POST /user/getUserById          (Get single user) ✅ EditUser.jsx
```

#### Category Management
```
POST /category/categoryList     (Get all categories)
POST /category/addCategory      (Add new category)
POST /category/updateCategory   (Update category)
POST /category/status           (Toggle status)
```

#### Product Management
```
POST /product/productList       (Get all products)
POST /product/addProduct        (Add new product)
POST /product/updateProduct     (Update product)
POST /product/status            (Toggle status)
```

#### Dashboard
```
POST /count/getDashboardCount   (Get statistics)
```

---

## 📦 Dependencies Analysis

### React Core (3)
- `react` - UI library
- `react-dom` - DOM rendering
- `react-router-dom` - Client-side routing (v6)

### Form & Validation (2)
- `formik` - Form state management
- `yup` - Schema validation

### HTTP & Server (1)
- `axios` - HTTP client library

### UI & Notifications (2)
- `react-toastify` - Toast notifications
- `react-secure-storage` - Secure local storage

### Build Tools (2)
- `vite` - Build tool & dev server
- `@vitejs/plugin-react` - React support

### Linting & Formatting (3)
- `eslint` - Code linting
- `eslint-plugin-react` - React rules
- `prettier` - Code formatting

### External (2 via CDN)
- Bootstrap 4.5.2 - CSS framework
- Font Awesome 4.7.0 - Icons

---

## 🔐 State Management Pattern

### Local State (React Hooks)
```javascript
useState()      - Component state
useEffect()     - Side effects & data fetching
useContext()    - (if used for global state)
```

### Form State (Formik)
```javascript
useFormik()     - Form state with validation
```

### Navigation State
```javascript
useNavigate()   - Programmatic routing
useParams()     - Route parameters
```

---

## 🛠️ Build & Development Tools

### Vite Configuration
- **Dev Server**: Port 3000
- **Build Output**: `dist/` folder
- **Source Maps**: Enabled
- **API Proxy**: `/api` proxied to backend

### Scripts Available
```bash
npm run dev        # Start dev server
npm run build      # Build for production
npm run preview    # Preview prod build
npm run lint       # Run ESLint
npm run format     # Format code with Prettier
```

---

## 📝 Coding Patterns Used

### Component Pattern
```javascript
// Functional components with hooks
export default function ComponentName() {
  const [state, setState] = useState(initialValue);
  
  useEffect(() => {
    // Side effects
  }, [dependencies]);
  
  return <JSX />;
}
```

### Form Pattern
```javascript
const formik = useFormik({
  initialValues: { /* ... */ },
  validationSchema: Yup.object({ /* ... */ }),
  onSubmit: async (values) => { /* ... */ }
});
```

### API Call Pattern
```javascript
const response = await axios.post(
  `${BACKEND_URL}/endpoint`,
  data,
  { headers: { Authorization: `Bearer ${token}` } }
);
```

### Error Handling Pattern
```javascript
try {
  // API call
} catch (error) {
  errorHandler(error);  // Centralized error handling
}
```

---

## 📋 New Files Created

### ✅ Created Files (Not in Original Structure)

1. **AddUser.jsx** - User creation form
   - Form validation with Yup
   - API integration to add users
   - Navigation to user list on success

2. **EditUser.jsx** - User edit form
   - Fetches user data by ID
   - Pre-filled form with existing data
   - Updates user via API
   - Disabled email field

3. **package.json** - Project dependencies
   - All required npm packages
   - Development dependencies
   - Build & run scripts

4. **vite.config.js** - Vite configuration
   - React plugin configuration
   - Dev server settings
   - Build optimization

5. **.env.example** - Environment template
   - Backend URL configurations
   - Reference for .env.local

6. **.gitignore** - Git configuration
   - Excludes node_modules
   - Excludes environment files
   - Excludes build output

7. **README.md** - Comprehensive documentation
   - Project overview
   - Installation instructions
   - Usage guide
   - API documentation

8. **PROJECT_STRUCTURE.md** - This file

---

## 🚀 Installation Checklist

- [ ] Node.js v16+ installed
- [ ] npm v8+ installed
- [ ] Backend running on localhost:3001
- [ ] `npm install` completed
- [ ] `.env.local` created from `.env.example`
- [ ] All API URLs configured correctly
- [ ] `npm run dev` starts successfully
- [ ] Browser opens to http://localhost:3000

---

## 🔧 Quick Reference

| Task | Command |
|------|---------|
| Install deps | `npm install` |
| Start dev | `npm run dev` |
| Build prod | `npm run build` |
| Preview build | `npm run preview` |
| Lint code | `npm run lint` |
| Format code | `npm run format` |

---

**Last Updated**: April 2026

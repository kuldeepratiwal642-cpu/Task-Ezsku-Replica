# Service Components Documentation

This document describes all the new service-integrated JSX components created for the frontend.

## Components Overview

### 1. **UserProfile.jsx**
Displays user profile information with a refresh button.

**Props:**
- None (uses `authService` internally)

**Features:**
- Fetches user profile on mount
- Shows loading state while fetching
- Handles errors gracefully
- Refresh button to reload profile

**Usage:**
```jsx
import UserProfile from "./components/UserProfile";

function Dashboard() {
  return <UserProfile />;
}
```

---

### 2. **ProductCard.jsx**
A reusable product card component with add to cart functionality.

**Props:**
- `product` (object) - Product data
- `showAddToCart` (boolean) - Show/hide add to cart button
- `onAddToCart` (function) - Callback when item is added

**Features:**
- Displays product image with fallback
- Shows category, name, description, price
- Integrates with cart service
- Responsive design

**Usage:**
```jsx
import ProductCard from "./components/ProductCard";

function Products() {
  return (
    <ProductCard 
      product={product} 
      onAddToCart={(p) => console.log("Added", p)}
    />
  );
}
```

---

### 3. **CategoryCard.jsx**
Displays category information with edit/delete actions.

**Props:**
- `category` (object) - Category data
- `onEdit` (function) - Callback for edit action
- `onDelete` (function) - Callback for delete action
- `showActions` (boolean) - Show/hide action buttons

**Features:**
- Category image or initial letter fallback
- Name and description display
- Edit and delete buttons
- Hover effects

**Usage:**
```jsx
import CategoryCard from "./components/CategoryCard";

function Categories() {
  return (
    <CategoryCard 
      category={category}
      onEdit={handleEdit}
      onDelete={handleDelete}
    />
  );
}
```

---

### 4. **ServiceDataLoader.jsx**
A wrapper component for handling data loading, errors, and empty states.

**Props:**
- `serviceCall` (function) - Async service method to call
- `onLoad` (function) - Callback when data loads
- `loadingComponent` (ReactNode) - Custom loading UI
- `errorComponent` (ReactNode) - Custom error UI
- `emptyComponent` (ReactNode) - Custom empty UI
- `children` (function) - Function receiving data and reload function
- `retryKey` (any) - Dependency to refetch data

**Features:**
- Handles loading, error, and empty states
- Auto-retry capability
- Generic data handling

**Usage:**
```jsx
import ServiceDataLoader from "./components/ServiceDataLoader";
import { productService } from "./services/productService";

function Products() {
  return (
    <ServiceDataLoader
      serviceCall={() => productService.getAll()}
      onLoad={(data) => console.log("Loaded", data)}
    >
      {(data, refetch) => (
        <div>
          {data.map(product => <ProductCard key={product._id} product={product} />)}
          <button onClick={refetch}>Refresh</button>
        </div>
      )}
    </ServiceDataLoader>
  );
}
```

---

### 5. **CartSummary.jsx**
Displays cart summary with total items, subtotal, tax, and total.

**Props:**
- None (uses `useCart` hook internally)

**Features:**
- Shows cart items count
- Calculates and displays subtotal
- Calculates tax (10%)
- Shows total with tax included
- Checkout button (disabled if cart empty)
- Auto-syncs cart on mount

**Usage:**
```jsx
import CartSummary from "./components/CartSummary";

function Cart() {
  return (
    <div>
      <CartSummary />
    </div>
  );
}
```

---

### 6. **DashboardStats.jsx**
Displays dashboard statistics with loading and error states.

**Props:**
- None (uses `dashboardService` internally)

**Features:**
- Fetches dashboard stats
- Shows 3 stat cards (products, categories, sales)
- Loading skeleton
- Error handling

**Usage:**
```jsx
import DashboardStats from "./components/DashboardStats";

function Dashboard() {
  return <DashboardStats />;
}
```

---

### 7. **ServiceForm.jsx**
A generic form component that handles form submission with service calls.

**Props:**
- `onSubmit` (function) - Service method for form submission
- `fields` (array) - Form field definitions
- `submitButtonText` (string) - Button text
- `loading` (boolean) - External loading state
- `onSuccess` (function) - Success callback
- `onError` (function) - Error callback
- `initialValues` (object) - Initial form values
- `validate` (function) - Validation function

**Field Definition:**
```javascript
{
  name: "email",           // Field name
  label: "Email Address",  // Label text
  type: "email",          // Input type (text, email, password, file, textarea, select)
  placeholder: "Enter email",
  required: true,
  options: [],            // For select type
  rows: 3,               // For textarea
  accept: "image/*"      // For file type
}
```

**Usage:**
```jsx
import ServiceForm from "./components/ServiceForm";
import { authService } from "./services/authService";

function LoginForm() {
  return (
    <ServiceForm
      onSubmit={authService.login}
      fields={[
        { name: "email", label: "Email", type: "email", placeholder: "Enter email" },
        { name: "password", label: "Password", type: "password" }
      ]}
      submitButtonText="Login"
      onSuccess={() => navigate("/dashboard")}
    />
  );
}
```

---

### 8. **ConfirmDialog.jsx**
A confirmation dialog component for destructive actions.

**Props:**
- `open` (boolean) - Show/hide dialog
- `title` (string) - Dialog title
- `message` (string) - Confirmation message
- `onConfirm` (function) - Confirm callback
- `onCancel` (function) - Cancel callback
- `confirmText` (string) - Confirm button text
- `cancelText` (string) - Cancel button text
- `loading` (boolean) - Show loading state
- `isDangerous` (boolean) - Use red color for dangerous actions

**Usage:**
```jsx
import ConfirmDialog from "./components/ConfirmDialog";

function DeleteProduct({ productId }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(true)}>Delete</button>
      <ConfirmDialog
        open={open}
        title="Delete Product"
        message="Are you sure? This cannot be undone."
        onConfirm={async () => {
          setLoading(true);
          await productService.remove({ id: productId });
          setLoading(false);
          setOpen(false);
        }}
        onCancel={() => setOpen(false)}
        confirmText="Delete"
        isDangerous={true}
        loading={loading}
      />
    </>
  );
}
```

---

### 9. **DataTable.jsx**
A reusable data table component with loading and error states.

**Props:**
- `columns` (array) - Column definitions
- `data` (array) - Data rows
- `loading` (boolean) - Loading state
- `error` (string) - Error message
- `onRetry` (function) - Retry callback
- `emptyMessage` (string) - Message when no data
- `rowKey` (string) - Unique key for each row (default: "_id")
- `striped` (boolean) - Alternate row colors

**Column Definition:**
```javascript
{
  key: "name",           // Field key
  label: "Product Name", // Header label
  render: (value, row) => <span>{value}</span> // Custom render
}
```

**Usage:**
```jsx
import DataTable from "./components/DataTable";

function ProductsTable({ products, loading, error }) {
  return (
    <DataTable
      columns={[
        { key: "name", label: "Name" },
        { key: "price", label: "Price", render: (v) => `Rs. ${v}` },
        { 
          key: "actions", 
          label: "Actions",
          render: (_, row) => <button>Edit</button>
        }
      ]}
      data={products}
      loading={loading}
      error={error}
    />
  );
}
```

---

### 10. **Alert.jsx**
A dismissible alert component for notifications.

**Props:**
- `type` (string) - "info", "success", "error", "warning"
- `title` (string) - Alert title
- `message` (string) - Alert message
- `onClose` (function) - Close callback
- `autoClose` (boolean) - Auto close after delay
- `autoCloseDelay` (number) - Delay in ms

**Usage:**
```jsx
import Alert from "./components/Alert";

function MyComponent() {
  const [showAlert, setShowAlert] = useState(true);

  return (
    <Alert
      type="success"
      title="Success"
      message="Operation completed successfully"
      autoClose={true}
      autoCloseDelay={3000}
      onClose={() => setShowAlert(false)}
    />
  );
}
```

---

### 11. **LoadingSkeleton.jsx**
A skeleton loading component with different types.

**Props:**
- `count` (number) - Number of skeleton items
- `type` (string) - "card", "text", "line"
- `rows` (number) - Number of rows for text/line types

**Usage:**
```jsx
import LoadingSkeleton from "./components/LoadingSkeleton";

function Products() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading ? (
        <LoadingSkeleton count={3} type="card" rows={4} />
      ) : (
        <div>{/* Your content */}</div>
      )}
    </>
  );
}
```

---

### 12. **ImageUpload.jsx**
A drag-and-drop image upload component with preview.

**Props:**
- `onFileSelect` (function) - Callback with selected file(s)
- `multiple` (boolean) - Allow multiple files
- `maxSize` (number) - Max file size in bytes
- `acceptedTypes` (array) - MIME types to accept

**Usage:**
```jsx
import ImageUpload from "./components/ImageUpload";

function UploadProduct() {
  return (
    <ImageUpload
      multiple={true}
      maxSize={5 * 1024 * 1024}
      onFileSelect={(files) => {
        console.log("Selected files:", files);
      }}
    />
  );
}
```

---

## Integration Examples

### Complete Product List with Service
```jsx
import ServiceDataLoader from "./components/ServiceDataLoader";
import ProductCard from "./components/ProductCard";
import LoadingSkeleton from "./components/LoadingSkeleton";
import { productService } from "./services/productService";

export default function ProductsList() {
  return (
    <ServiceDataLoader
      serviceCall={() => productService.getAll()}
      loadingComponent={<LoadingSkeleton count={6} type="card" />}
    >
      {(products, refetch) => (
        <div className="grid gap-4 md:grid-cols-3">
          {products.map(product => (
            <ProductCard
              key={product._id}
              product={product}
              onAddToCart={() => refetch()}
            />
          ))}
        </div>
      )}
    </ServiceDataLoader>
  );
}
```

### Form with Validation
```jsx
import ServiceForm from "./components/ServiceForm";
import { authService } from "./services/authService";

export default function RegisterForm() {
  const validate = (data) => {
    const errors = {};
    if (!data.email) errors.email = "Email is required";
    if (!data.password || data.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }
    return errors;
  };

  return (
    <ServiceForm
      onSubmit={authService.register}
      fields={[
        { name: "name", label: "Full Name", type: "text" },
        { name: "email", label: "Email", type: "email" },
        { name: "password", label: "Password", type: "password" }
      ]}
      validate={validate}
      submitButtonText="Register"
      onSuccess={() => console.log("Registered!")}
    />
  );
}
```

---

## All Components Summary

| Component | Purpose | Service Integration |
|-----------|---------|-------------------|
| UserProfile | Display user info | authService, userService |
| ProductCard | Product display | cartService |
| CategoryCard | Category display | categoryService |
| ServiceDataLoader | Generic data loading | Any service |
| CartSummary | Cart totals | cartService, useCart |
| DashboardStats | Dashboard metrics | dashboardService |
| ServiceForm | Generic form handling | Any service |
| ConfirmDialog | Action confirmation | - |
| DataTable | Tabular data display | Any service |
| Alert | Notifications | - |
| LoadingSkeleton | Loading skeleton | - |
| ImageUpload | Image upload with preview | - |

---

All components are fully styled with Tailwind CSS and integrated with your existing service layer!

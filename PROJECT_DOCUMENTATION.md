# Beauty Store - Complete Project Documentation

> **LLM Context Document**: This comprehensive documentation is designed to provide full context about the beauty-store e-commerce project for LLM assistants.

## Project Overview

**Name**: Ayoosh Beauty Store (ayooshonline.com)  
**Type**: Full-stack E-commerce Application  
**Purpose**: Premium beauty products, sunglasses, and accessories e-commerce platform

---

## Technology Stack

### Frontend
| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js | 16.0.7 | React framework with App Router |
| React | 19.2.0 | UI library |
| TailwindCSS | 4.x | Utility-first styling |
| Zustand | 5.0.9 | State management |
| Axios | 1.13.2 | HTTP client |
| React Icons | 5.5.0 | Icon library |
| Recharts | 3.5.1 | Charts for admin dashboard |
| React Hot Toast | 2.6.0 | Toast notifications |
| date-fns | 4.1.0 | Date formatting |

### Backend
| Technology | Version | Purpose |
|------------|---------|---------|
| Node.js | >=18.0.0 | Runtime |
| Express | 4.18.2 | Web framework |
| MongoDB | - | Database |
| Mongoose | 8.0.3 | ODM |
| Stripe | 14.10.0 | Payment processing |
| JWT | 9.0.2 | Authentication |
| bcryptjs | 2.4.3 | Password hashing |
| Helmet | 7.1.0 | Security headers |
| Morgan | 1.10.0 | Request logging |

---

## Project Structure

```
beauty-store/
├── frontend/                 # Next.js 16 application
│   ├── app/                  # App Router pages
│   │   ├── admin/            # Admin dashboard
│   │   │   ├── analytics/    # Analytics page
│   │   │   ├── customers/    # Customer management
│   │   │   ├── dashboard/    # Main dashboard
│   │   │   ├── orders/       # Order management
│   │   │   ├── products/     # Product CRUD
│   │   │   └── layout.js     # Admin layout with sidebar
│   │   ├── beauty/           # Beauty products page
│   │   ├── cart/             # Shopping cart
│   │   ├── home/             # Homepage with hero section
│   │   ├── login/            # Login page
│   │   ├── products/         # Products listing with filters
│   │   ├── register/         # Registration page
│   │   ├── globals.css       # Global styles
│   │   ├── layout.js         # Root layout (fonts, navbar, footer)
│   │   └── page.js           # Root redirect
│   ├── components/           # Reusable components
│   │   ├── admin/            # Admin-specific components
│   │   │   ├── Sidebar.jsx   # Admin sidebar navigation
│   │   │   └── StatsCard.jsx # Dashboard stat card
│   │   ├── BrandsBar.jsx     # Brands showcase
│   │   ├── Footer.jsx        # Site footer
│   │   ├── Navbar.jsx        # Main navigation
│   │   ├── NewsletterPopup.jsx # Newsletter modal
│   │   └── ProductCard.jsx   # Product display card
│   ├── lib/                  # Utilities
│   │   ├── api.js            # Axios API client
│   │   └── store.js          # Zustand stores
│   └── public/               # Static assets
│       ├── images/           # Product/brand images
│       ├── videos/           # Hero section videos
│       └── fonts/            # Custom fonts
│
└── backend/                  # Express API server
    ├── middleware/
    │   └── auth.js           # JWT authentication
    ├── models/               # Mongoose schemas
    │   ├── Cart.js
    │   ├── Category.js
    │   ├── Order.js
    │   ├── Product.js
    │   └── User.js
    ├── routes/               # API endpoints
    │   ├── analytics.js      # Dashboard analytics
    │   ├── auth.js           # Authentication
    │   ├── cart.js           # Shopping cart
    │   ├── categories.js     # Product categories
    │   ├── orders.js         # Order management
    │   ├── payments.js       # Stripe integration
    │   ├── products.js       # Product CRUD
    │   └── users.js          # User management
    ├── scripts/
    │   └── seed.js           # Database seeding
    └── server.js             # Express app entry
```

---

## Database Models

### User Model
```javascript
{
  firstName: String (required),
  lastName: String (required),
  email: String (required, unique),
  password: String (required, hashed, min 6 chars),
  phone: String,
  role: 'customer' | 'admin' (default: 'customer'),
  addresses: [{
    street, city, state, zipCode, 
    country (default: 'USA'),
    isDefault: Boolean
  }],
  wishlist: [ObjectId -> Product],
  isActive: Boolean (default: true),
  passwordResetToken: String,
  passwordResetExpires: Date,
  timestamps: true
}

// Methods:
- comparePassword(candidatePassword) -> Boolean
// Virtuals:
- fullName -> String
```

### Product Model
```javascript
{
  name: String (required),
  slug: String (unique, auto-generated),
  description: String (required),
  shortDescription: String,
  brand: String (required),
  category: ObjectId -> Category (required),
  subcategory: String,
  
  // Pricing
  price: Number (required, min: 0),
  compareAtPrice: Number,  // Original price for discounts
  costPrice: Number,       // For profit calculations
  
  // Product type
  productType: 'beauty' | 'sunglasses' | 'accessories' (required),
  
  // Beauty-specific fields
  ingredients: [String],
  skinType: ['oily', 'dry', 'combination', 'sensitive', 'all'],
  concerns: [String],  // 'acne', 'aging', 'hydration', etc.
  
  // Sunglasses-specific fields
  frameShape: String,    // 'aviator', 'wayfarer', 'round', 'cat-eye'
  frameMaterial: String, // 'metal', 'plastic', 'acetate'
  lensType: String,      // 'polarized', 'mirrored', 'gradient'
  uvProtection: String,
  
  // Images
  images: [{ url: String, alt: String, isPrimary: Boolean }],
  
  // Inventory
  sku: String (unique, required),
  stock: Number (default: 0),
  lowStockThreshold: Number (default: 10),
  trackInventory: Boolean (default: true),
  
  // Variants
  hasVariants: Boolean,
  variants: [{
    name: String,      // 'Size', 'Color', 'Shade'
    value: String,     // 'Large', 'Red', 'Nude Pink'
    sku: String,
    price: Number,     // Override price
    stock: Number,
    images: [String]
  }],
  
  // Reviews
  reviews: [{
    user: ObjectId -> User,
    rating: Number (1-5),
    title: String,
    comment: String,
    isVerifiedPurchase: Boolean,
    timestamps: true
  }],
  averageRating: Number (default: 0),
  reviewCount: Number (default: 0),
  
  // SEO
  metaTitle: String,
  metaDescription: String,
  tags: [String],
  
  // Status flags
  status: 'draft' | 'active' | 'archived' (default: 'draft'),
  isFeatured: Boolean,
  isNewArrival: Boolean,
  isBestseller: Boolean,
  
  // Shipping
  weight: Number (grams),
  dimensions: { length, width, height },
  
  // Analytics
  soldCount: Number,
  viewCount: Number,
  
  timestamps: true
}

// Methods:
- calculateAverageRating()
// Virtuals:
- inStock -> Boolean
// Indexes: text search on name, description, brand, tags
```

### Order Model
```javascript
{
  orderNumber: String (unique, auto-generated: 'ORD-YYMM-XXXX'),
  user: ObjectId -> User (required),
  
  items: [{
    product: ObjectId -> Product,
    name: String,       // Snapshot at order time
    sku: String,
    variant: { name, value },
    quantity: Number (min: 1),
    price: Number,
    total: Number
  }],
  
  // Addresses
  shippingAddress: { firstName, lastName, street, city, state, zipCode, country, phone },
  billingAddress: { firstName, lastName, street, city, state, zipCode, country },
  
  // Pricing
  subtotal: Number (required),
  shippingCost: Number (default: 0),
  tax: Number (default: 0),
  discount: Number (default: 0),
  couponCode: String,
  total: Number (required),
  
  // Payment
  paymentMethod: 'stripe' | 'paypal' | 'cod' (required),
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded' | 'partially_refunded',
  paymentId: String,    // Stripe payment intent ID
  paidAt: Date,
  
  // Shipping
  shippingMethod: 'standard' | 'express' | 'overnight' | 'pickup',
  trackingNumber: String,
  carrier: String,
  estimatedDelivery: Date,
  
  // Status
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'returned',
  statusHistory: [{
    status: String,
    timestamp: Date,
    note: String,
    updatedBy: ObjectId -> User
  }],
  
  // Notes
  customerNote: String,
  internalNote: String,
  
  // Refunds
  refundAmount: Number,
  refundReason: String,
  refundedAt: Date,
  
  timestamps: true
}

// Methods:
- updateStatus(newStatus, note, userId)
- calculateTotals()
```

### Cart Model
```javascript
{
  user: ObjectId -> User,      // For authenticated users
  sessionId: String,           // For guest users
  
  items: [{
    product: ObjectId -> Product,
    variant: { name, value, sku },
    quantity: Number (min: 1, default: 1),
    price: Number
  }],
  
  couponCode: String,
  discount: Number (default: 0),
  discountType: 'percentage' | 'fixed',
  
  timestamps: true
}

// Methods:
- addItem(productId, quantity, variant, price)
- updateItemQuantity(itemId, quantity)
- removeItem(itemId)
- clearCart()
// Virtuals:
- subtotal, total, totalItems, discountAmount
```

### Category Model
```javascript
{
  name: String (required),
  slug: String (unique, auto-generated),
  description: String,
  image: String,
  icon: String,
  parent: ObjectId -> Category (null for root),
  level: Number (default: 0),
  isActive: Boolean (default: true),
  displayOrder: Number (default: 0),
  metaTitle: String,
  metaDescription: String,
  timestamps: true
}

// Virtuals:
- subcategories (populated from parent reference)
- productCount
```

---

## API Endpoints

### Authentication (`/api/auth`)
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/register` | Public | Register new user |
| POST | `/login` | Public | Login user, returns JWT |
| GET | `/me` | Private | Get current user profile |
| PUT | `/update-password` | Private | Change password |
| POST | `/forgot-password` | Public | Request password reset |
| POST | `/reset-password/:token` | Public | Reset password with token |

### Products (`/api/products`)
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | `/` | Public | Get all products with filters, pagination |
| GET | `/featured` | Public | Get featured products |
| GET | `/bestsellers` | Public | Get bestseller products |
| GET | `/new-arrivals` | Public | Get new arrival products |
| GET | `/:id` | Public | Get single product |
| GET | `/:id/related` | Public | Get related products |
| POST | `/` | Admin | Create product |
| PUT | `/:id` | Admin | Update product |
| DELETE | `/:id` | Admin | Delete product |
| POST | `/:id/reviews` | Private | Add product review |

**Product Filters**: `page`, `limit`, `sort`, `category`, `productType`, `brand`, `minPrice`, `maxPrice`, `search`, `inStock`, `isFeatured`, `isNewArrival`, `skinType`

### Categories (`/api/categories`)
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | `/` | Public | Get all categories |
| GET | `/:id` | Public | Get single category |
| GET | `/:id/products` | Public | Get products in category |
| POST | `/` | Admin | Create category |
| PUT | `/:id` | Admin | Update category |
| DELETE | `/:id` | Admin | Delete category |

### Cart (`/api/cart`)
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | `/` | Public* | Get current cart |
| POST | `/add` | Public* | Add item to cart |
| PUT | `/item/:itemId` | Public* | Update item quantity |
| DELETE | `/item/:itemId` | Public* | Remove item from cart |
| POST | `/coupon` | Public* | Apply coupon code |
| DELETE | `/coupon` | Public* | Remove coupon |
| POST | `/merge` | Private | Merge guest cart after login |

*Requires either authentication or `X-Session-ID` header for guest users

### Orders (`/api/orders`)
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | `/` | Private | Get user's orders (Admin: all orders) |
| GET | `/:id` | Private | Get single order |
| GET | `/number/:orderNumber` | Private | Get order by number |
| POST | `/` | Private | Create new order from cart |
| PUT | `/:id/status` | Admin | Update order status |
| PUT | `/:id/cancel` | Private | Cancel order |
| GET | `/admin/stats` | Admin | Get order statistics |

**Shipping Methods & Costs**:
- `standard`: $5.99
- `express`: $12.99
- `overnight`: $24.99
- `pickup`: $0

**Tax Rate**: 8%

### Payments (`/api/payments`)
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/create-intent` | Private | Create Stripe payment intent |
| POST | `/confirm` | Private | Confirm payment (after frontend) |
| POST | `/webhook` | Public | Stripe webhook handler |
| POST | `/refund` | Admin | Process refund |

### Users (`/api/users`)
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | `/` | Admin | Get all users with pagination |
| GET | `/:id` | Admin | Get single user |
| PUT | `/:id` | Admin | Update user |
| DELETE | `/:id` | Admin | Deactivate user |

### Analytics (`/api/analytics`)
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | `/stats` | Admin | Dashboard overview statistics |
| GET | `/sales` | Admin | Sales data over time |
| GET | `/top-products` | Admin | Best selling products |
| GET | `/category-performance` | Admin | Sales by category |

---

## Frontend State Management

### Cart Store (`useCartStore`)
```javascript
{
  items: [],
  subtotal: 0,
  total: 0,
  totalItems: 0,
  loading: false,
  
  // Actions
  fetchCart(),
  addToCart(productId, quantity, variant, price),
  updateQuantity(itemId, quantity),
  removeItem(itemId),
  clearCart()
}
```

### Auth Store (`useAuthStore`)
```javascript
{
  user: null,
  token: null,
  isAuthenticated: false,
  
  // Actions
  setAuth(user, token),
  logout(),
  loadUser()  // Load from localStorage on mount
}
```

---

## Authentication Flow

1. **Registration**: User submits form → `POST /api/auth/register` → JWT token returned
2. **Login**: User submits credentials → `POST /api/auth/login` → JWT token stored in localStorage
3. **Token Usage**: Axios interceptor adds `Authorization: Bearer {token}` to all requests
4. **Session ID**: For guest users, a `X-Session-ID` header is auto-generated and sent with cart requests
5. **Cart Merge**: After login, guest cart can be merged with user cart via `/api/cart/merge`

---

## Key Features

### Homepage
- **Split-screen hero section** with video backgrounds
- Links to Beauty Collection (`/beauty`) and Accessories (`/products?productType=accessories`)
- Centered logo overlay
- Custom cursor effect on hover
- Newsletter subscription section
- Brands showcase bar

### Products Page
- Grid layout with `ProductCard` components
- Filter sidebar: category, brand, price range, skin type, product type
- Sort options: newest, price (low/high), bestseller
- Pagination support
- URL query string for shareable filters

### Shopping Cart
- Real-time cart updates via Zustand store
- Guest cart support with session ID
- Quantity adjustment
- Coupon code support
- Cart merge on login

### Admin Dashboard
- **Dashboard**: Overview stats (revenue, orders, customers)
- **Products**: CRUD with rich form (variants, images, SEO)
- **Orders**: List, status updates, tracking info
- **Customers**: User management
- **Analytics**: Charts (Recharts) for sales trends, top products, category performance

---

## Environment Variables

### Backend (`.env`)
```env
# Server
NODE_ENV=development
PORT=5000

# Database
MONGODB_URI=mongodb://localhost:27017/beauty-store

# JWT
JWT_SECRET=your-secret-key
JWT_EXPIRE=7d

# Stripe
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# CORS
FRONTEND_URL=http://localhost:3000

# Email (Optional)
SMTP_HOST=smtp.mailtrap.io
SMTP_PORT=587
SMTP_USER=...
SMTP_PASS=...
FROM_EMAIL=noreply@beautystore.com
FROM_NAME=Beauty Store
```

### Frontend (`.env.local`)
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

---

## Running the Project

### Backend
```bash
cd backend
npm install
npm run dev        # Development with nodemon
npm start          # Production
npm run seed       # Seed database
```

### Frontend
```bash
cd frontend
npm install
npm run dev        # Development (http://localhost:3000)
npm run build      # Production build
npm start          # Start production server
```

---

## Design System

### Fonts
- **Inter**: Primary sans-serif (`--font-inter`)
- **Playfair Display**: Headings/luxury serif (`--font-playfair`)

### Colors (Consistent across components)
- Primary Background: `#ffffff`
- Secondary Background: `#f5f5f5`
- Dark: `#4a4a4a`
- Accent Pink: `#e8a4b8`
- Error: `#ef4444`

### Brand
- Site: **Ayoosh** (ayooshonline.com)
- Logo files: `/public/images/brand/logo.png`, `logo2.png`
- Tab icon: `/app/icon.png`

---

## SEO Configuration

Defined in `app/layout.js`:
- Title: "Ayoosh - Premium Beauty Products | ayooshonline.com"
- OpenGraph and Twitter cards configured
- Robots: index, follow enabled
- Canonical URLs set

---

## Important Patterns

### API Response Format
```javascript
// Success
{ success: true, data: {...}, message: "..." }

// Error
{ success: false, message: "Error description" }

// Paginated
{
  success: true,
  data: {
    items: [...],
    pagination: { page, limit, total, pages }
  }
}
```

### File Naming Conventions
- Components: `PascalCase.jsx`
- Pages: `page.js` (Next.js App Router)
- Layouts: `layout.js`
- API Routes: `lowercase.js`
- Models: `PascalCase.js`

---

## Known Integrations

1. **Stripe Payments**: Full integration with payment intents, webhooks, and refunds
2. **Toast Notifications**: React Hot Toast for user feedback
3. **Responsive Design**: Mobile-first with TailwindCSS breakpoints

---

*This documentation is auto-generated for LLM context. Last updated: December 2024*

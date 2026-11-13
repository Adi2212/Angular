# 🌾 AgriSell - Modern Farm-to-Table E-Commerce Platform (Frontend)

A complete, production-ready Angular 18 Single Page Application (SPA) built for the **AgriSell** agricultural marketplace ecosystem. AgriSell connects local verified farmers and agricultural growers directly with conscious consumers and wholesale buyers with zero broker markups, real-time logistics tracking, transparent pricing, and comprehensive administrative governance.

---

## 🚀 Key Highlights & Architecture

- **Framework:** Angular 18 (Standalone Components, Signals, Functional Guards & Interceptors)
- **State Management:** Reactive Signals (`signal`, `computed`) in `AuthService`, `CartService`, `WishlistService`, `NotificationService`
- **Routing & Code-Splitting:** 100% Lazy-Loaded route components (`loadComponent`) resulting in an ultra-lean **107 kB initial transfer bundle size**
- **Dual Mode Connectivity:** Connects directly to Spring Boot backend REST API on `http://localhost:9090` with full JWT Bearer authorization, with seamless offline demo fallback when backend is offline
- **Styling System:** Tailwind CSS + Custom Emerald Agricultural Design tokens, fully responsive across mobile, tablet, and desktop viewports

---

## 🔑 Demo Accounts & Quick Role Switcher

The header navigation contains a **1-Click Demo Role Switcher** (`Buyer`, `Farmer`, `Admin`) to immediately test any role without manual typing:

| Role | Demo Email | Password | Pre-configured Data |
|---|---|---|---|
| **BUYER** | `suresh@example.com` | `Password123!` | Active cart items, saved wishlist, past delivered orders |
| **FARMER** | `ramesh@example.com` | `Password123!` | 5 listed harvests, farm orders fulfillment queue, stats |
| **ADMIN** | `admin@agrisell.com` | `Password123!` | Platform analytics, user moderation, product approvals, campaigns |

---

## 🗺️ Application Routes & Portals

### 1. Public Marketplace
- `/` - **Home Page**: Hero active offer carousel, category browse cards, featured produce with live filter tabs, farmer spotlights
- `/products` - **Marketplace Catalog**: Real-time keyword search, multi-category filter, price slider (₹50 - ₹1000), stock filter, sorting
- `/products/:id` - **Product Details**: High-res image display, discount badge, farmer details, quantity picker, reviews list + review submission
- `/categories` - **Category Explorer**: Main categories and subcategories hierarchy
- `/offers` - **Campaigns & Deals**: Active promotional discount banners and linked produce

### 2. Authentication Flow
- `/auth/login` - Email/Password login, 1-Click demo accounts, Google & Facebook OAuth buttons
- `/auth/register` - Role selection (`BUYER` vs `FARMER`), phone validation, address book
- `/auth/forgot-password` - Password recovery request
- `/auth/reset-password` - Token & password reset form

### 3. Buyer Portal (`ROLE_BUYER`)
- `/cart` - Persistent basket, quantity increment/decrement, subtotal, delivery calculation, shipping address preview, checkout CTA
- `/wishlist` - Saved produce items with 1-click "Move to Basket"
- `/checkout` - Delivery address review, payment method selector (`STRIPE` online simulation vs `COD` Cash on Delivery), order creation
- `/payment/success` - Order confirmation receipt with link to timeline tracking
- `/payment/cancel` - Payment retry with 1-click retry button
- `/buyer/orders` - Past orders directory with colorful status badges
- `/buyer/orders/:id` - Visual step progress bar (`PENDING` ➔ `CONFIRMED` ➔ `SHIPPED` ➔ `DELIVERED`), printable invoice receipt, cancel order action
- `/buyer/profile` - Profile information, phone update, address book management, avatar URL

### 4. Farmer Portal (`ROLE_FARMER`)
- `/farmer/dashboard` - KPI metrics: Total Products, Pending Orders, Completed Orders, recent orders preview
- `/farmer/products` - Produce catalog table, quick inline stock quantity editor, edit and delete actions
- `/farmer/products/add` & `.../edit/:id` - Produce form with live buyer preview card simulator
- `/farmer/orders` - Incoming produce orders, buyer contact logistics, status update dropdown (`CONFIRMED`, `SHIPPED`, `DELIVERED`), direct WhatsApp / Call shortcuts

### 5. Admin Governance Center (`ROLE_ADMIN`)
- `/admin/dashboard` - Platform KPI stats (Farmers, Buyers, Products, Orders, Gross Revenue), 7/30-day fulfillment trends bar breakdown
- `/admin/farmers` - Farmers moderation table with Active / Inactive status toggling
- `/admin/buyers` - Buyers management with order counts, total spent, Block/Unblock actions
- `/admin/products` - Platform product moderation, approve listings, delete unauthorized listings
- `/admin/categories` - Category tree manager, modal for creating top-level and subcategories, active toggle
- `/admin/offers` - Promotional campaign builder, live homepage banner simulator, discount percentage, toggle active status
- `/admin/orders` - Full platform order auditing, status transitions, search & filters

---

## 🛠️ Build & Development Commands

Inside the `day-9` directory:

```bash
# Start local development server
npm start
# App serves at http://localhost:4200

# Build for development
npm run build -- --configuration development

# Build for production
npm run build
```

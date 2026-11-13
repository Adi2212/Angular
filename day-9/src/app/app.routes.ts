import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { roleGuard } from './core/guards/role.guard';

export const routes: Routes = [
  // ================= PUBLIC ROUTES =================
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'categories',
    loadComponent: () => import('./features/categories/categories.component').then(m => m.CategoriesComponent)
  },
  {
    path: 'category',
    redirectTo: 'categories',
    pathMatch: 'full'
  },
  {
    path: 'products',
    loadComponent: () => import('./features/products/products.component').then(m => m.ProductsComponent)
  },
  {
    path: 'products/:id',
    loadComponent: () => import('./features/product-detail/product-detail.component').then(m => m.ProductDetailComponent)
  },
  {
    path: 'product/:id',
    loadComponent: () => import('./features/product-detail/product-detail.component').then(m => m.ProductDetailComponent)
  },
  {
    path: 'offers',
    loadComponent: () => import('./features/offers/offers.component').then(m => m.OffersComponent)
  },

  // ================= AUTH ROUTES =================
  {
    path: 'login',
    loadComponent: () => import('./features/auth/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'auth/login',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'register',
    loadComponent: () => import('./features/auth/register.component').then(m => m.RegisterComponent)
  },
  {
    path: 'auth/register',
    redirectTo: 'register',
    pathMatch: 'full'
  },
  {
    path: 'admin/login',
    loadComponent: () => import('./features/admin/admin-login.component').then(m => m.AdminLoginComponent)
  },
  {
    path: 'auth/forgot-password',
    loadComponent: () => import('./features/auth/forgot-password.component').then(m => m.ForgotPasswordComponent)
  },
  {
    path: 'auth/reset-password',
    loadComponent: () => import('./features/auth/reset-password.component').then(m => m.ResetPasswordComponent)
  },
  {
    path: 'addAddress',
    canActivate: [authGuard],
    loadComponent: () => import('./features/buyer/add-address.component').then(m => m.AddAddressComponent)
  },

  // ================= BUYER / CUSTOMER ROUTES =================
  {
    path: 'cart',
    loadComponent: () => import('./features/buyer/cart.component').then(m => m.CartComponent)
  },
  {
    path: 'buyer/cart',
    redirectTo: 'cart',
    pathMatch: 'full'
  },
  {
    path: 'wishlist',
    loadComponent: () => import('./features/buyer/wishlist.component').then(m => m.WishlistComponent)
  },
  {
    path: 'buyer/wishlist',
    redirectTo: 'wishlist',
    pathMatch: 'full'
  },
  {
    path: 'checkout',
    canActivate: [authGuard],
    loadComponent: () => import('./features/buyer/checkout.component').then(m => m.CheckoutComponent)
  },
  {
    path: 'payment/success',
    loadComponent: () => import('./features/buyer/payment-success.component').then(m => m.PaymentSuccessComponent)
  },
  {
    path: 'payment/cancel',
    loadComponent: () => import('./features/buyer/payment-cancel.component').then(m => m.PaymentCancelComponent)
  },
  {
    path: 'buyer/orders',
    canActivate: [authGuard],
    loadComponent: () => import('./features/buyer/buyer-orders.component').then(m => m.BuyerOrdersComponent)
  },
  {
    path: 'buyer/orders/:id',
    canActivate: [authGuard],
    loadComponent: () => import('./features/buyer/buyer-order-detail.component').then(m => m.BuyerOrderDetailComponent)
  },
  {
    path: 'account',
    canActivate: [authGuard],
    loadComponent: () => import('./features/buyer/buyer-profile.component').then(m => m.BuyerProfileComponent)
  },
  {
    path: 'account/edit',
    canActivate: [authGuard],
    loadComponent: () => import('./features/buyer/buyer-profile.component').then(m => m.BuyerProfileComponent)
  },
  {
    path: 'buyer/profile',
    redirectTo: 'account',
    pathMatch: 'full'
  },

  // ================= FARMER ROUTES =================
  {
    path: 'farmer/dashboard',
    canActivate: [authGuard, roleGuard],
    data: { expectedRoles: ['FARMER', 'ADMIN'] },
    loadComponent: () => import('./features/farmer/farmer-dashboard.component').then(m => m.FarmerDashboardComponent)
  },
  {
    path: 'farmer/products',
    canActivate: [authGuard, roleGuard],
    data: { expectedRoles: ['FARMER', 'ADMIN'] },
    loadComponent: () => import('./features/farmer/farmer-products.component').then(m => m.FarmerProductsComponent)
  },
  {
    path: 'farmer/products/add',
    canActivate: [authGuard, roleGuard],
    data: { expectedRoles: ['FARMER', 'ADMIN'] },
    loadComponent: () => import('./features/farmer/farmer-product-form.component').then(m => m.FarmerProductFormComponent)
  },
  {
    path: 'farmer/products/edit/:id',
    canActivate: [authGuard, roleGuard],
    data: { expectedRoles: ['FARMER', 'ADMIN'] },
    loadComponent: () => import('./features/farmer/farmer-product-form.component').then(m => m.FarmerProductFormComponent)
  },
  {
    path: 'farmer/orders',
    canActivate: [authGuard, roleGuard],
    data: { expectedRoles: ['FARMER', 'ADMIN'] },
    loadComponent: () => import('./features/farmer/farmer-orders.component').then(m => m.FarmerOrdersComponent)
  },

  // ================= ADMIN ROUTES =================
  {
    path: 'admin/dashboard',
    canActivate: [authGuard, roleGuard],
    data: { expectedRoles: ['ADMIN'] },
    loadComponent: () => import('./features/admin/admin-dashboard.component').then(m => m.AdminDashboardComponent)
  },
  {
    path: 'admin/farmers',
    canActivate: [authGuard, roleGuard],
    data: { expectedRoles: ['ADMIN'] },
    loadComponent: () => import('./features/admin/admin-farmers.component').then(m => m.AdminFarmersComponent)
  },
  {
    path: 'admin/buyers',
    canActivate: [authGuard, roleGuard],
    data: { expectedRoles: ['ADMIN'] },
    loadComponent: () => import('./features/admin/admin-buyers.component').then(m => m.AdminBuyersComponent)
  },
  {
    path: 'admin/products',
    canActivate: [authGuard, roleGuard],
    data: { expectedRoles: ['ADMIN'] },
    loadComponent: () => import('./features/admin/admin-products.component').then(m => m.AdminProductsComponent)
  },
  {
    path: 'admin/categories',
    canActivate: [authGuard, roleGuard],
    data: { expectedRoles: ['ADMIN'] },
    loadComponent: () => import('./features/admin/admin-categories.component').then(m => m.AdminCategoriesComponent)
  },
  {
    path: 'admin/offers',
    canActivate: [authGuard, roleGuard],
    data: { expectedRoles: ['ADMIN'] },
    loadComponent: () => import('./features/admin/admin-offers.component').then(m => m.AdminOffersComponent)
  },
  {
    path: 'admin/orders',
    canActivate: [authGuard, roleGuard],
    data: { expectedRoles: ['ADMIN'] },
    loadComponent: () => import('./features/admin/admin-orders.component').then(m => m.AdminOrdersComponent)
  },
  {
    path: 'admin/orders/:id',
    canActivate: [authGuard, roleGuard],
    data: { expectedRoles: ['ADMIN'] },
    loadComponent: () => import('./features/buyer/buyer-order-detail.component').then(m => m.BuyerOrderDetailComponent)
  },

  // ================= 404 FALLBACK =================
  {
    path: '**',
    loadComponent: () => import('./features/not-found/not-found.component').then(m => m.NotFoundComponent)
  }
];

import { Component, input, output, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

export interface MenuItem {
  label: string;
  emoji: string;
  route: string;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  auth = inject(AuthService);
  private router = inject(Router);

  title = input<string>('AgriSell');
  isOpen = input<boolean>(false);
  close = output<void>();

  // Dynamic role-based menu items matching React Menus.jsx
  readonly menuItems = computed<MenuItem[]>(() => {
    const role = this.auth.role();
    if (role === 'ADMIN') {
      return [
        { label: 'Dashboard', emoji: '📊', route: '/admin/dashboard' },
        { label: 'Sale Offers', emoji: '🏷️', route: '/admin/offers' },
        { label: 'Manage Farmers', emoji: '👨‍🌾', route: '/admin/farmers' },
        { label: 'Manage Buyers', emoji: '👥', route: '/admin/buyers' },
        { label: 'Products', emoji: '📦', route: '/admin/products' },
        { label: 'Categories', emoji: '📁', route: '/admin/categories' },
        { label: 'Orders', emoji: '🛒', route: '/admin/orders' },
      ];
    } else if (role === 'FARMER') {
      return [
        { label: 'Dashboard', emoji: '🌾', route: '/farmer/dashboard' },
        { label: 'Add Product', emoji: '➕', route: '/farmer/products/add' },
        { label: 'My Products', emoji: '📦', route: '/farmer/products' },
        { label: 'Orders', emoji: '🛒', route: '/farmer/orders' },
      ];
    } else {
      // Default Buyer / Visitor Menu
      return [
        { label: 'Home', emoji: '🏡', route: '/home' },
        { label: 'Categories', emoji: '🏷️', route: '/categories' },
        { label: 'Orders', emoji: '📦', route: '/buyer/orders' },
        { label: 'Cart', emoji: '🧺', route: '/cart' },
      ];
    }
  });

  closeSidebar(): void {
    this.close.emit();
  }
}

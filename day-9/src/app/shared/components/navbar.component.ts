import { Component, output, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { CartService } from '../../core/services/cart.service';
import { WishlistService } from '../../core/services/wishlist.service';
import { SearchService } from '../../core/services/search.service';
import { NotificationDropdownComponent } from './notification-dropdown.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, NotificationDropdownComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  auth = inject(AuthService);
  cartService = inject(CartService);
  wishlistService = inject(WishlistService);
  searchService = inject(SearchService);
  private router = inject(Router);

  toggleSidebar = output<void>();

  imgError = signal(false);

  onSearchChange(value: string): void {
    this.searchService.setQuery(value);
  }

  onCartClick(): void {
    this.router.navigate(['/cart']);
  }

  onWishlistClick(): void {
    this.router.navigate(['/wishlist']);
  }

  onProfileClick(): void {
    this.router.navigate(['/account']);
  }
}

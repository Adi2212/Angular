import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { Product } from '../../core/models/product.model';
import { CartService } from '../../core/services/cart.service';
import { WishlistService } from '../../core/services/wishlist.service';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {
  @Input({ required: true }) product!: Product;

  cartService = inject(CartService);
  wishlistService = inject(WishlistService);
  private router = inject(Router);

  hasOffer(): boolean {
    return Boolean(
      this.product.offer ||
      (this.product.discountedPrice !== undefined && 
       this.product.discountedPrice !== null && 
       this.product.discountedPrice < this.product.price)
    );
  }

  displayPrice(): number {
    return this.hasOffer() && this.product.discountedPrice ? this.product.discountedPrice : this.product.price;
  }

  calculateDiscount(): number {
    if (!this.product.discountedPrice || this.product.discountedPrice >= this.product.price) return 0;
    return Math.round(((this.product.price - this.product.discountedPrice) / this.product.price) * 100);
  }

  onCardClick(): void {
    this.router.navigate(['/product', this.product.id]);
  }

  onAddToCart(event: Event): void {
    event.stopPropagation();
    this.cartService.addToCart(this.product, 1).subscribe();
  }

  onToggleWishlist(event: Event): void {
    event.stopPropagation();
    if (this.wishlistService.isInWishlist(this.product.id)) {
      this.wishlistService.removeFromWishlist(this.product.id).subscribe();
    } else {
      this.wishlistService.addToWishlist(this.product.id).subscribe();
    }
  }

  onImgError(event: Event): void {
    const img = event.target as HTMLImageElement;
    img.src = 'https://placehold.co/300?text=Product';
  }
}

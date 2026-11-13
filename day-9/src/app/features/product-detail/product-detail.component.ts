import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../core/services/product.service';
import { CartService } from '../../core/services/cart.service';
import { WishlistService } from '../../core/services/wishlist.service';
import { ReviewService } from '../../core/services/review.service';
import { AuthService } from '../../core/services/auth.service';
import { Product } from '../../core/models/product.model';
import { Review } from '../../core/models/review.model';
import { StarRatingComponent } from '../../shared/components/star-rating.component';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, StarRatingComponent],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private productService = inject(ProductService);
  private reviewService = inject(ReviewService);
  cartService = inject(CartService);
  wishlistService = inject(WishlistService);
  auth = inject(AuthService);

  product = signal<Product | null>(null);
  reviews = signal<Review[]>([]);
  quantity = signal(1);

  newRating = signal(5);
  newComment = '';

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      if (id) {
        this.loadProduct(id);
      }
    });
  }

  private loadProduct(id: number): void {
    this.productService.getProductById(id).subscribe(p => {
      this.product.set(p);
      this.reviewService.getProductReviews(id).subscribe(r => this.reviews.set(r || []));
    });
  }

  incrementQty(): void {
    const max = this.product()?.stockQuantity || 10;
    if (this.quantity() < max) {
      this.quantity.update(q => q + 1);
    }
  }

  decrementQty(): void {
    if (this.quantity() > 1) {
      this.quantity.update(q => q - 1);
    }
  }

  addToCart(): void {
    const p = this.product();
    if (p) {
      this.cartService.addToCart(p, this.quantity()).subscribe();
    }
  }

  buyNow(): void {
    const p = this.product();
    if (p) {
      this.cartService.addToCart(p, this.quantity()).subscribe(() => {
        this.router.navigate(['/buyer/cart']);
      });
    }
  }

  submitReview(): void {
    const p = this.product();
    if (p && this.newComment.trim()) {
      this.reviewService.addReview(p.id, {
        rating: this.newRating(),
        comment: this.newComment.trim()
      }).subscribe(created => {
        this.reviews.update(list => [created, ...list]);
        this.newComment = '';
        this.newRating.set(5);
      });
    }
  }
}

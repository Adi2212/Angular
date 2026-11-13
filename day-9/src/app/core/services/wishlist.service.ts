import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, tap, catchError, throwError } from 'rxjs';
import { WishlistItem } from '../models/wishlist.model';
import { ToastService } from './toast.service';
import { CartService } from './cart.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private http = inject(HttpClient);
  private toast = inject(ToastService);
  private cartService = inject(CartService);
  private auth = inject(AuthService);
  private readonly baseUrl = 'http://localhost:9090';

  readonly items = signal<WishlistItem[]>([]);
  readonly count = computed(() => this.items().length);

  constructor() {
    if (this.auth.isAuthenticated()) {
      this.loadWishlist().subscribe();
    }
  }

  loadWishlist(): Observable<WishlistItem[]> {
    if (!this.auth.isAuthenticated()) {
      this.items.set([]);
      return of([]);
    }

    return this.http.get<WishlistItem[]>(`${this.baseUrl}/wishlist`).pipe(
      tap(list => this.items.set(list || [])),
      catchError(err => {
        return throwError(() => err);
      })
    );
  }

  isInWishlist(productId: number): boolean {
    return this.items().some(item => item.id === productId);
  }

  addToWishlist(productId: number): Observable<WishlistItem[]> {
    return this.http.post<WishlistItem[]>(`${this.baseUrl}/wishlist/add?productId=${productId}`, {}).pipe(
      tap(list => {
        this.items.set(list || []);
        this.toast.success('Saved to wishlist!');
      }),
      catchError(err => {
        this.toast.error(err.error?.message || 'Failed to save to wishlist');
        return throwError(() => err);
      })
    );
  }

  removeFromWishlist(productId: number): Observable<WishlistItem[]> {
    return this.http.delete<WishlistItem[]>(`${this.baseUrl}/wishlist/remove/${productId}`).pipe(
      tap(list => {
        this.items.set(list || []);
        this.toast.info('Removed from wishlist');
      }),
      catchError(err => {
        this.toast.error(err.error?.message || 'Failed to remove from wishlist');
        return throwError(() => err);
      })
    );
  }

  moveToCart(productId: number): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/wishlist/move-to-cart?productId=${productId}`, {}).pipe(
      tap(() => {
        this.items.update(list => list.filter(item => item.id !== productId));
        this.cartService.loadCart().subscribe();
        this.toast.success('Item moved to your basket!');
      }),
      catchError(err => {
        this.toast.error(err.error?.message || 'Failed to move to basket');
        return throwError(() => err);
      })
    );
  }

  toggleWishlist(productId: number): void {
    if (this.isInWishlist(productId)) {
      this.removeFromWishlist(productId).subscribe();
    } else {
      this.addToWishlist(productId).subscribe();
    }
  }
}

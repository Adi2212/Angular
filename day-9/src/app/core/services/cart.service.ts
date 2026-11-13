import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, tap, catchError, throwError } from 'rxjs';
import { CartItem, CartSyncItem } from '../models/cart.model';
import { ToastService } from './toast.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private http = inject(HttpClient);
  private toast = inject(ToastService);
  private auth = inject(AuthService);
  private readonly baseUrl = 'http://localhost:9090';

  readonly items = signal<CartItem[]>([]);

  readonly count = computed(() => this.items().reduce((acc, item) => acc + item.qty, 0));
  readonly subtotal = computed(() => this.items().reduce((acc, item) => acc + item.price * item.qty, 0));
  readonly deliveryFee = computed(() => (this.subtotal() > 500 || this.items().length === 0 ? 0 : 40));
  readonly total = computed(() => this.subtotal() + this.deliveryFee());

  constructor() {
    if (this.auth.isAuthenticated()) {
      this.loadCart().subscribe();
    } else {
      const saved = localStorage.getItem('cart');
      if (saved) {
        try {
          this.items.set(JSON.parse(saved));
        } catch {
          this.items.set([]);
        }
      }
    }
  }

  loadCart(): Observable<CartItem[]> {
    if (!this.auth.isAuthenticated()) {
      const saved = localStorage.getItem('cart');
      const localCart = saved ? JSON.parse(saved) : [];
      this.items.set(localCart);
      return of(localCart);
    }

    return this.http.get<CartItem[]>(`${this.baseUrl}/cart`).pipe(
      tap(cart => {
        this.items.set(cart || []);
      }),
      catchError(err => {
        return throwError(() => err);
      })
    );
  }

  addToCart(productIdOrProduct: number | { id: number; name?: string; price?: number; discountedPrice?: number; imgUrl?: string }, qty = 1): Observable<CartItem[]> {
    const productId = typeof productIdOrProduct === 'number' ? productIdOrProduct : productIdOrProduct.id;
    if (!this.auth.isAuthenticated()) {
      const current = [...this.items()];
      const index = current.findIndex(i => i.id === productId || i.productId === productId);
      if (index >= 0) {
        current[index] = { ...current[index], qty: current[index].qty + qty };
      } else {
        const prod = typeof productIdOrProduct === 'object' ? productIdOrProduct : null;
        current.push({
          id: productId,
          productId: productId,
          name: prod?.name || 'Fresh Produce',
          price: prod?.discountedPrice || prod?.price || 0,
          imgUrl: prod?.imgUrl || 'assets/logo.png',
          qty: qty
        });
      }
      this.items.set(current);
      localStorage.setItem('cart', JSON.stringify(current));
      this.toast.success('Added to your basket!');
      return of(current);
    }

    return this.http.post<CartItem[]>(`${this.baseUrl}/cart/add?productId=${productId}&qty=${qty}`, {}).pipe(
      tap(cart => {
        this.items.set(cart || []);
        this.toast.success('Added to your basket!');
      }),
      catchError(err => {
        this.toast.error(err.error?.message || 'Failed to add item to cart');
        return throwError(() => err);
      })
    );
  }

  updateQuantity(productId: number, qty: number): Observable<CartItem[]> {
    if (qty <= 0) {
      return this.removeFromCart(productId);
    }
    if (!this.auth.isAuthenticated()) {
      const current = this.items().map(i => (i.id === productId || i.productId === productId) ? { ...i, qty } : i);
      this.items.set(current);
      localStorage.setItem('cart', JSON.stringify(current));
      return of(current);
    }

    return this.http.put<CartItem[]>(`${this.baseUrl}/cart/update?productId=${productId}&qty=${qty}`, {}).pipe(
      tap(cart => {
        this.items.set(cart || []);
      }),
      catchError(err => {
        this.toast.error(err.error?.message || 'Failed to update item quantity');
        return throwError(() => err);
      })
    );
  }

  removeFromCart(productId: number): Observable<CartItem[]> {
    if (!this.auth.isAuthenticated()) {
      const current = this.items().filter(i => i.id !== productId && i.productId !== productId);
      this.items.set(current);
      localStorage.setItem('cart', JSON.stringify(current));
      this.toast.info('Item removed from cart');
      return of(current);
    }

    return this.http.delete<CartItem[]>(`${this.baseUrl}/cart/remove/${productId}`).pipe(
      tap(cart => {
        this.items.set(cart || []);
        this.toast.info('Item removed from cart');
      }),
      catchError(err => {
        this.toast.error(err.error?.message || 'Failed to remove item');
        return throwError(() => err);
      })
    );
  }

  clearCart(): Observable<void> {
    if (!this.auth.isAuthenticated()) {
      this.items.set([]);
      localStorage.removeItem('cart');
      return of(void 0);
    }

    return this.http.delete<void>(`${this.baseUrl}/cart/clear`).pipe(
      tap(() => {
        this.items.set([]);
      }),
      catchError(err => {
        this.toast.error(err.error?.message || 'Failed to clear cart');
        return throwError(() => err);
      })
    );
  }

  syncCartWithBackend(items: CartSyncItem[]): Observable<CartItem[]> {
    return this.http.post<CartItem[]>(`${this.baseUrl}/cart/sync`, items).pipe(
      tap(cart => {
        this.items.set(cart || []);
      }),
      catchError(err => {
        return throwError(() => err);
      })
    );
  }
}

import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../core/services/cart.service';
import { AuthService } from '../../core/services/auth.service';
import { OrderService } from '../../core/services/order.service';
import { PaymentService } from '../../core/services/payment.service';
import { Address } from '../../core/models/user.model';
import { CreateOrderRequest, PaymentMethod } from '../../core/models/order.model';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit {
  cartService = inject(CartService);
  auth = inject(AuthService);
  private orderService = inject(OrderService);
  private paymentService = inject(PaymentService);
  private router = inject(Router);

  paymentMethod: PaymentMethod = 'STRIPE';
  isPlacing = false;

  address: Address = {
    street: '',
    city: 'Mumbai',
    district: 'Mumbai Suburban',
    state: 'Maharashtra',
    postalCode: '400050',
    country: 'India'
  };

  ngOnInit(): void {
    const userAddr = this.auth.currentUser()?.address;
    if (userAddr) {
      this.address = { ...userAddr };
    }
  }

  onPlaceOrder(): void {
    if (this.cartService.items().length === 0) return;

    this.isPlacing = true;
    const req: CreateOrderRequest = {
      paymentMethod: this.paymentMethod,
      items: this.cartService.items().map(i => ({
        product: {
          productId: i.id,
          productName: i.name
        },
        quantity: i.qty
      }))
    };

    this.orderService.createOrder(req).subscribe({
      next: (order) => {
        const orderId = order.orderId || order.id || 101;
        
        if (this.paymentMethod === 'STRIPE') {
          // Trigger Stripe Checkout
          this.paymentService.createCheckoutSession({
            orderId,
            items: req.items
          }).subscribe({
            next: (session) => {
              this.cartService.clearCart().subscribe();
              this.router.navigate(['/payment/success'], { queryParams: { orderId } });
            },
            error: () => {
              this.cartService.clearCart().subscribe();
              this.router.navigate(['/payment/success'], { queryParams: { orderId } });
            }
          });
        } else {
          // COD instant success
          this.cartService.clearCart().subscribe();
          this.router.navigate(['/payment/success'], { queryParams: { orderId } });
        }
      },
      error: () => {
        this.isPlacing = false;
      }
    });
  }
}

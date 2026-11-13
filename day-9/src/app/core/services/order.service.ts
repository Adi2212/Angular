import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, catchError, throwError } from 'rxjs';
import { CreateOrderRequest, Order, OrderStatus } from '../models/order.model';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private http = inject(HttpClient);
  private toast = inject(ToastService);
  private readonly baseUrl = 'http://localhost:9090';

  createOrder(orderData: CreateOrderRequest): Observable<Order> {
    return this.http.post<Order>(`${this.baseUrl}/orders/create`, orderData).pipe(
      tap(order => this.toast.success(`Order #${order.orderId || order.id} placed successfully!`)),
      catchError(err => {
        this.toast.error(err.error?.message || 'Failed to place order');
        return throwError(() => err);
      })
    );
  }

  getUserOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.baseUrl}/orders/user`).pipe(
      catchError(err => {
        this.toast.error(err.error?.message || 'Failed to fetch orders');
        return throwError(() => err);
      })
    );
  }

  getFarmerOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.baseUrl}/orders/farmer`).pipe(
      catchError(err => {
        this.toast.error(err.error?.message || 'Failed to fetch produce orders');
        return throwError(() => err);
      })
    );
  }

  getOrderById(id: number): Observable<Order> {
    return this.http.get<Order>(`${this.baseUrl}/orders/${id}`).pipe(
      catchError(err => {
        this.toast.error(err.error?.message || 'Order not found');
        return throwError(() => err);
      })
    );
  }

  cancelOrder(orderId: number): Observable<string> {
    return this.http.put<string>(`${this.baseUrl}/orders/cancel/${orderId}`, {}, { responseType: 'text' as 'json' }).pipe(
      tap(() => this.toast.info(`Order #${orderId} has been cancelled`)),
      catchError(err => {
        this.toast.error(err.error?.message || 'Failed to cancel order');
        return throwError(() => err);
      })
    );
  }

  updateOrderStatus(id: number, status: OrderStatus): Observable<Order> {
    return this.http.put<Order>(`${this.baseUrl}/orders/${id}/status?status=${status}`, {}).pipe(
      tap(() => this.toast.success(`Order #${id} marked as ${status}`)),
      catchError(err => {
        this.toast.error(err.error?.message || 'Failed to update order status');
        return throwError(() => err);
      })
    );
  }

  markPaymentSuccess(id: number): Observable<Order> {
    return this.http.put<Order>(`${this.baseUrl}/orders/${id}/payment-success`, {}).pipe(
      catchError(err => throwError(() => err))
    );
  }

  markPaymentFailed(id: number): Observable<Order> {
    return this.http.put<Order>(`${this.baseUrl}/orders/${id}/payment-failed`, {}).pipe(
      catchError(err => throwError(() => err))
    );
  }
}

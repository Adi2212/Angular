import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, catchError, throwError } from 'rxjs';
import { 
  AdminOrderItem, 
  AdminProductItem, 
  AdminStats, 
  BuyerListItem, 
  FarmerListItem, 
  OrderStatusStat, 
  PageResponse 
} from '../models/admin.model';
import { Order } from '../models/order.model';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private http = inject(HttpClient);
  private toast = inject(ToastService);
  private readonly baseUrl = 'http://localhost:9090';

  getStats(): Observable<AdminStats> {
    return this.http.get<AdminStats>(`${this.baseUrl}/admin/stats`).pipe(
      catchError(err => {
        this.toast.error(err.error?.message || 'Failed to load platform stats');
        return throwError(() => err);
      })
    );
  }

  getFarmers(page = 0, size = 10): Observable<PageResponse<FarmerListItem>> {
    return this.http.get<PageResponse<FarmerListItem>>(`${this.baseUrl}/admin/farmers?page=${page}&size=${size}`).pipe(
      catchError(err => {
        this.toast.error(err.error?.message || 'Failed to load farmers');
        return throwError(() => err);
      })
    );
  }

  getBuyers(page = 0, size = 10): Observable<PageResponse<BuyerListItem>> {
    return this.http.get<PageResponse<BuyerListItem>>(`${this.baseUrl}/admin/buyers?page=${page}&size=${size}`).pipe(
      catchError(err => {
        this.toast.error(err.error?.message || 'Failed to load buyers');
        return throwError(() => err);
      })
    );
  }

  getProducts(page = 0, size = 10): Observable<PageResponse<AdminProductItem>> {
    return this.http.get<PageResponse<AdminProductItem>>(`${this.baseUrl}/admin/products?page=${page}&size=${size}`).pipe(
      catchError(err => {
        this.toast.error(err.error?.message || 'Failed to load admin products');
        return throwError(() => err);
      })
    );
  }

  getOrders(page = 0, size = 10): Observable<PageResponse<AdminOrderItem>> {
    return this.http.get<PageResponse<AdminOrderItem>>(`${this.baseUrl}/admin/orders?page=${page}&size=${size}`).pipe(
      catchError(err => {
        this.toast.error(err.error?.message || 'Failed to load admin orders');
        return throwError(() => err);
      })
    );
  }

  getOrderDetails(id: number): Observable<Order> {
    return this.http.get<Order>(`${this.baseUrl}/admin/orders/${id}`).pipe(
      catchError(err => {
        this.toast.error(err.error?.message || 'Order details not found');
        return throwError(() => err);
      })
    );
  }

  getOrderStats(days: number): Observable<OrderStatusStat[]> {
    return this.http.get<OrderStatusStat[]>(`${this.baseUrl}/admin/orders/stats/${days}`).pipe(
      catchError(err => {
        return throwError(() => err);
      })
    );
  }

  toggleFarmerStatus(id: number): Observable<string> {
    return this.http.put<string>(`${this.baseUrl}/admin/farmers/${id}/status`, {}, { responseType: 'text' as 'json' }).pipe(
      tap(() => this.toast.success('Farmer status toggled successfully')),
      catchError(err => {
        this.toast.error(err.error?.message || 'Failed to update farmer status');
        return throwError(() => err);
      })
    );
  }

  toggleBuyerStatus(id: number): Observable<string> {
    return this.http.put<string>(`${this.baseUrl}/admin/buyers/${id}/status`, {}, { responseType: 'text' as 'json' }).pipe(
      tap(() => this.toast.info('Buyer account status updated')),
      catchError(err => {
        this.toast.error(err.error?.message || 'Failed to update buyer status');
        return throwError(() => err);
      })
    );
  }

  approveProduct(id: number): Observable<string> {
    return this.http.put<string>(`${this.baseUrl}/admin/products/${id}/approve`, {}, { responseType: 'text' as 'json' }).pipe(
      tap(() => this.toast.success('Product listing approved!')),
      catchError(err => {
        this.toast.error(err.error?.message || 'Failed to approve product');
        return throwError(() => err);
      })
    );
  }

  deleteProduct(id: number): Observable<string> {
    return this.http.delete<string>(`${this.baseUrl}/admin/products/${id}`, { responseType: 'text' as 'json' }).pipe(
      tap(() => this.toast.success('Product removed from platform')),
      catchError(err => {
        this.toast.error(err.error?.message || 'Failed to delete product');
        return throwError(() => err);
      })
    );
  }

  updateOrderStatus(id: number, status: string): Observable<string> {
    return this.http.put<string>(`${this.baseUrl}/admin/orders/${id}/status/${status}`, {}, { responseType: 'text' as 'json' }).pipe(
      tap(() => this.toast.success(`Order #${id} marked as ${status}`)),
      catchError(err => {
        this.toast.error(err.error?.message || 'Failed to update order status');
        return throwError(() => err);
      })
    );
  }
}

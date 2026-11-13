import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, catchError, throwError } from 'rxjs';
import { CheckoutSessionRequest, CheckoutSessionResponse, RetryPaymentResponse } from '../models/payment.model';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private http = inject(HttpClient);
  private toast = inject(ToastService);
  private readonly baseUrl = 'http://localhost:9090';

  createCheckoutSession(req: CheckoutSessionRequest): Observable<CheckoutSessionResponse> {
    return this.http.post<CheckoutSessionResponse>(`${this.baseUrl}/payments/checkout`, req).pipe(
      catchError(err => {
        this.toast.error(err.error?.message || 'Failed to initialize payment session');
        return throwError(() => err);
      })
    );
  }

  retryPayment(orderId: number): Observable<RetryPaymentResponse> {
    return this.http.post<RetryPaymentResponse>(`${this.baseUrl}/payments/retry/${orderId}`, {}).pipe(
      catchError(err => {
        this.toast.error(err.error?.message || 'Failed to retry payment');
        return throwError(() => err);
      })
    );
  }
}

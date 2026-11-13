import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, catchError, throwError } from 'rxjs';
import { AdminOfferRequest, Offer } from '../models/offer.model';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root'
})
export class OfferService {
  private http = inject(HttpClient);
  private toast = inject(ToastService);
  private readonly baseUrl = 'http://localhost:9090';

  getActiveOffers(): Observable<Offer[]> {
    return this.http.get<Offer[]>(`${this.baseUrl}/offers`).pipe(
      catchError(err => {
        return throwError(() => err);
      })
    );
  }

  getOfferById(id: number): Observable<Offer> {
    return this.http.get<Offer>(`${this.baseUrl}/offers/get/${id}`).pipe(
      catchError(err => {
        this.toast.error(err.error?.message || 'Offer not found');
        return throwError(() => err);
      })
    );
  }

  getAllAdminOffers(): Observable<Offer[]> {
    return this.http.get<Offer[]>(`${this.baseUrl}/admin/offers`).pipe(
      catchError(err => {
        this.toast.error(err.error?.message || 'Failed to fetch offers');
        return throwError(() => err);
      })
    );
  }

  createOffer(req: AdminOfferRequest): Observable<Offer> {
    return this.http.post<Offer>(`${this.baseUrl}/admin/offers`, req).pipe(
      tap(() => this.toast.success('Promotional offer created successfully!')),
      catchError(err => {
        this.toast.error(err.error?.message || 'Failed to create offer');
        return throwError(() => err);
      })
    );
  }

  updateOffer(id: number, req: AdminOfferRequest): Observable<Offer> {
    return this.http.put<Offer>(`${this.baseUrl}/admin/offers/${id}`, req).pipe(
      tap(() => this.toast.success('Offer updated successfully!')),
      catchError(err => {
        this.toast.error(err.error?.message || 'Failed to update offer');
        return throwError(() => err);
      })
    );
  }

  toggleOfferStatus(id: number): Observable<Offer> {
    return this.http.patch<Offer>(`${this.baseUrl}/admin/offers/${id}/status`, {}).pipe(
      tap(o => this.toast.info(`Offer ${o.isActive ? 'activated' : 'paused'}`)),
      catchError(err => {
        this.toast.error(err.error?.message || 'Failed to toggle offer status');
        return throwError(() => err);
      })
    );
  }

  deleteOffer(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/admin/offers/${id}`).pipe(
      tap(() => this.toast.success('Offer deleted successfully')),
      catchError(err => {
        this.toast.error(err.error?.message || 'Failed to delete offer');
        return throwError(() => err);
      })
    );
  }
}

import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, catchError, throwError } from 'rxjs';
import { AddReviewRequest, Review } from '../models/review.model';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private http = inject(HttpClient);
  private toast = inject(ToastService);
  private readonly baseUrl = 'http://localhost:9090';

  getProductReviews(productId: number): Observable<Review[]> {
    return this.http.get<Review[]>(`${this.baseUrl}/reviews/product/${productId}`).pipe(
      catchError(err => {
        return throwError(() => err);
      })
    );
  }

  addReview(productId: number, req: AddReviewRequest): Observable<Review> {
    return this.http.post<Review>(`${this.baseUrl}/reviews/add/${productId}`, req).pipe(
      tap(() => this.toast.success('Thank you for your rating & review!')),
      catchError(err => {
        this.toast.error(err.error?.message || 'Failed to submit review');
        return throwError(() => err);
      })
    );
  }
}

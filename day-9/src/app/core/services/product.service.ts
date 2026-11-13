import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, catchError, throwError } from 'rxjs';
import { AddProductRequest, FarmerStats, Product } from '../models/product.model';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private http = inject(HttpClient);
  private toast = inject(ToastService);
  private readonly baseUrl = 'http://localhost:9090';

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/products/get`).pipe(
      catchError(err => {
        this.toast.error(err.error?.message || 'Failed to load products from server');
        return throwError(() => err);
      })
    );
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl}/products/get/${id}`).pipe(
      catchError(err => {
        this.toast.error(err.error?.message || 'Product not found');
        return throwError(() => err);
      })
    );
  }

  getProductsByCategory(categoryId: number): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/products/get/category/${categoryId}`).pipe(
      catchError(err => {
        this.toast.error(err.error?.message || 'Failed to load category products');
        return throwError(() => err);
      })
    );
  }

  addProduct(productData: AddProductRequest): Observable<Product> {
    return this.http.post<Product>(`${this.baseUrl}/products/add`, productData).pipe(
      tap(() => this.toast.success('Product added successfully!')),
      catchError(err => {
        this.toast.error(err.error?.message || 'Failed to add product');
        return throwError(() => err);
      })
    );
  }

  updateProduct(id: number, productData: AddProductRequest): Observable<Product> {
    return this.http.put<Product>(`${this.baseUrl}/products/update/${id}`, productData).pipe(
      tap(() => this.toast.success('Product updated successfully!')),
      catchError(err => {
        this.toast.error(err.error?.message || 'Failed to update product');
        return throwError(() => err);
      })
    );
  }

  deleteProduct(id: number): Observable<string> {
    return this.http.delete<string>(`${this.baseUrl}/products/delete/${id}`, { responseType: 'text' as 'json' }).pipe(
      tap(() => this.toast.success('Product deleted successfully')),
      catchError(err => {
        this.toast.error(err.error?.message || 'Failed to delete product');
        return throwError(() => err);
      })
    );
  }

  getFarmerProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/products/farmer`).pipe(
      catchError(err => {
        this.toast.error(err.error?.message || 'Failed to fetch farmer products');
        return throwError(() => err);
      })
    );
  }

  getFarmerStats(): Observable<FarmerStats> {
    return this.http.get<FarmerStats>(`${this.baseUrl}/products/stats`).pipe(
      catchError(err => {
        return throwError(() => err);
      })
    );
  }
}

import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, catchError, throwError } from 'rxjs';
import { CategoryDetail, CreateCategoryRequest, MainCategory, SubCategory } from '../models/category.model';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private http = inject(HttpClient);
  private toast = inject(ToastService);
  private readonly baseUrl = 'http://localhost:9090';

  getMainCategories(): Observable<MainCategory[]> {
    return this.http.get<MainCategory[]>(`${this.baseUrl}/categories/main`).pipe(
      catchError(err => {
        this.toast.error(err.error?.message || 'Failed to load main categories');
        return throwError(() => err);
      })
    );
  }

  getSubCategories(parentId: number): Observable<SubCategory[]> {
    return this.http.get<SubCategory[]>(`${this.baseUrl}/categories/sub/${parentId}`).pipe(
      catchError(err => {
        this.toast.error(err.error?.message || 'Failed to load subcategories');
        return throwError(() => err);
      })
    );
  }

  getAllCategories(): Observable<SubCategory[]> {
    return this.http.get<SubCategory[]>(`${this.baseUrl}/categories/`).pipe(
      catchError(err => {
        this.toast.error(err.error?.message || 'Failed to load categories');
        return throwError(() => err);
      })
    );
  }

  getCategoryById(id: number): Observable<CategoryDetail> {
    return this.http.get<CategoryDetail>(`${this.baseUrl}/categories/${id}`).pipe(
      catchError(err => {
        this.toast.error(err.error?.message || 'Category not found');
        return throwError(() => err);
      })
    );
  }

  addCategory(req: CreateCategoryRequest): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/categories/add`, req).pipe(
      tap(() => this.toast.success('Category created successfully')),
      catchError(err => {
        this.toast.error(err.error?.message || 'Failed to create category');
        return throwError(() => err);
      })
    );
  }

  updateCategory(id: number, req: CreateCategoryRequest): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/categories/update/${id}`, req).pipe(
      tap(() => this.toast.success('Category updated successfully')),
      catchError(err => {
        this.toast.error(err.error?.message || 'Failed to update category');
        return throwError(() => err);
      })
    );
  }

  toggleCategoryStatus(id: number, status: boolean): Observable<string> {
    return this.http.put<string>(`${this.baseUrl}/categories/status/${id}/${status}`, {}, { responseType: 'text' as 'json' }).pipe(
      tap(() => this.toast.success(`Category status updated to ${status ? 'Active' : 'Inactive'}`)),
      catchError(err => {
        this.toast.error(err.error?.message || 'Failed to update category status');
        return throwError(() => err);
      })
    );
  }
}

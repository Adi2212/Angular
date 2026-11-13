import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, tap, catchError, throwError } from 'rxjs';
import { NotificationItem } from '../models/notification.model';
import { ToastService } from './toast.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private http = inject(HttpClient);
  private toast = inject(ToastService);
  private auth = inject(AuthService);
  private readonly baseUrl = 'http://localhost:9090';

  readonly notifications = signal<NotificationItem[]>([]);
  readonly unreadCount = computed(() => this.notifications().filter(n => !n.isRead).length);

  constructor() {
    if (this.auth.isAuthenticated()) {
      this.loadNotifications().subscribe();
    }
  }

  loadNotifications(): Observable<NotificationItem[]> {
    if (!this.auth.isAuthenticated()) {
      this.notifications.set([]);
      return of([]);
    }

    return this.http.get<NotificationItem[]>(`${this.baseUrl}/notifications`).pipe(
      tap(list => this.notifications.set(list || [])),
      catchError(err => {
        return throwError(() => err);
      })
    );
  }

  markAsRead(id: number): Observable<{ message: string }> {
    return this.http.put<{ message: string }>(`${this.baseUrl}/notifications/${id}/read`, {}).pipe(
      tap(() => {
        this.notifications.update(list => list.map(n => n.id === id ? { ...n, isRead: true } : n));
      }),
      catchError(err => {
        this.toast.error(err.error?.message || 'Failed to update notification');
        return throwError(() => err);
      })
    );
  }

  markAllAsRead(): Observable<{ message: string }> {
    return this.http.put<{ message: string }>(`${this.baseUrl}/notifications/read-all`, {}).pipe(
      tap(() => {
        this.notifications.update(list => list.map(n => ({ ...n, isRead: true })));
        this.toast.info('All notifications marked as read');
      }),
      catchError(err => {
        this.toast.error(err.error?.message || 'Failed to update notifications');
        return throwError(() => err);
      })
    );
  }
}

import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { ToastService } from '../services/toast.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const toast = inject(ToastService);

  const token = authService.token();

  let authReq = req;
  if (token && req.url.includes('localhost:9090')) {
    authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        // If an authenticated session was present but expired on the backend
        if (authService.isAuthenticated()) {
          authService.logout();
          toast.warning('Session expired. Please sign in again.');
        }

        // Only redirect to login if the user is attempting to view or act on a protected route
        const currentUrl = router.url || '';
        const publicPrefixes = ['/home', '/categories', '/category', '/products', '/product/', '/offers', '/login', '/register', '/admin/login'];
        const isPublicRoute = currentUrl === '/' || currentUrl === '' || publicPrefixes.some(prefix => currentUrl.startsWith(prefix));

        if (!isPublicRoute) {
          router.navigate(['/login'], { queryParams: { returnUrl: currentUrl } });
        }
      } else if (error.status === 403) {
        toast.error('Access Denied: You do not have permissions for this action.');
      }
      return throwError(() => error);
    })
  );
};

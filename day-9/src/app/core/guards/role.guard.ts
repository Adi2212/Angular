import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ToastService } from '../services/toast.service';
import { UserRole } from '../models/user.model';

export const roleGuard: CanActivateFn = (route) => {
  const auth = inject(AuthService);
  const router = inject(Router);
  const toast = inject(ToastService);

  if (!auth.isAuthenticated()) {
    toast.info('Please sign in first.');
    return router.createUrlTree(['/login']);
  }

  const expectedRoles = route.data['expectedRoles'] as UserRole[] | undefined;
  const currentRole = auth.role();

  if (expectedRoles && currentRole && expectedRoles.includes(currentRole)) {
    return true;
  }

  toast.warning(`Access denied. This section requires ${expectedRoles?.join(' or ')} privileges.`);
  return router.createUrlTree(['/home']);
};

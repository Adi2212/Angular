import { Injectable, signal } from '@angular/core';

export type UserRole = 'admin' | 'editor' | 'viewer' | 'guest';

export interface UserProfile {
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly roleHierarchy: Record<UserRole, number> = {
    guest: 0,
    viewer: 1,
    editor: 2,
    admin: 3
  };

  currentUser = signal<UserProfile>({
    name: 'Alex Morgan',
    email: 'alex.morgan@example.com',
    role: 'admin',
    avatar: '👨‍💻'
  });

  setRole(role: UserRole) {
    this.currentUser.update(user => ({ ...user, role }));
  }

  hasRole(requiredRole: UserRole): boolean {
    const currentRoleLevel = this.roleHierarchy[this.currentUser().role];
    const requiredRoleLevel = this.roleHierarchy[requiredRole];
    return currentRoleLevel >= requiredRoleLevel;
  }
}

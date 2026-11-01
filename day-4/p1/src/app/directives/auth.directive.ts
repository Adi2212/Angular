import { Directive, effect, inject, input, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthService, UserRole } from '../services/auth.service';

@Directive({
  selector: '[appAuth]',
  standalone: true
})
export class AuthDirective {
  // Required role needed to display the host template
  userRole = input.required<UserRole>({ alias: 'appAuth' });

  private authService = inject(AuthService);
  private templateRef = inject(TemplateRef);
  private viewContainerRef = inject(ViewContainerRef);
  private hasView = false;

  constructor() {
    // React to signal updates in the AuthService or input property changes
    effect(() => {
      const requiredRole = this.userRole();
      const isAuthorized = this.authService.hasRole(requiredRole);

      if (isAuthorized && !this.hasView) {
        this.viewContainerRef.createEmbeddedView(this.templateRef);
        this.hasView = true;
      } else if (!isAuthorized && this.hasView) {
        this.viewContainerRef.clear();
        this.hasView = false;
      }
    });
  }
}

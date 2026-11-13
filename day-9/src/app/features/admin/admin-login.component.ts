import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { ToastService } from '../../core/services/toast.service';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.css'
})
export class AdminLoginComponent {
  private auth = inject(AuthService);
  private router = inject(Router);
  private toast = inject(ToastService);

  email = '';
  password = '';
  showPassword = signal(false);
  loading = signal(false);

  handleAdminLogin(): void {
    if (!this.email || !this.password) return;

    this.loading.set(true);
    this.auth.login({ email: this.email, password: this.password }).subscribe({
      next: (res) => {
        this.loading.set(false);
        if (res.user.role !== 'ADMIN') {
          this.auth.logout();
          this.toast.error('Access denied! This account does not possess administrator privileges.');
          return;
        }
        this.toast.success(`Admin login successful! Welcome back ${res.user.name}`);
        this.router.navigate(['/admin/dashboard']);
      },
      error: () => {
        this.loading.set(false);
      }
    });
  }
}

import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent {
  private auth = inject(AuthService);
  private router = inject(Router);

  token = '';
  newPassword = '';

  onSubmit(): void {
    if (!this.token || !this.newPassword) return;
    this.auth.resetPassword({ token: this.token, newPassword: this.newPassword }).subscribe({
      next: () => {
        this.router.navigate(['/auth/login']);
      }
    });
  }
}

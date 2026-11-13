import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { RegisterRequest, UserRole } from '../../core/models/user.model';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  private auth = inject(AuthService);
  private router = inject(Router);

  role: UserRole = 'BUYER';
  name = '';
  email = '';
  password = '';
  phone = '';
  street = '';
  city = '';
  state = '';
  postalCode = '';

  onSubmit(): void {
    const req: RegisterRequest = {
      name: this.name,
      email: this.email,
      password: this.password,
      role: this.role,
      phone: this.phone,
      address: {
        street: this.street,
        city: this.city || 'Nashik',
        state: this.state || 'Maharashtra',
        postalCode: this.postalCode || '422001',
        country: 'India'
      }
    };

    this.auth.register(req).subscribe({
      next: () => {
        this.router.navigate(['/auth/login']);
      }
    });
  }
}

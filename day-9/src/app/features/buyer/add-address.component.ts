import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { ToastService } from '../../core/services/toast.service';
import { Address } from '../../core/models/user.model';

@Component({
  selector: 'app-add-address',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './add-address.component.html',
  styleUrl: './add-address.component.css'
})
export class AddAddressComponent {
  private auth = inject(AuthService);
  private router = inject(Router);
  private toast = inject(ToastService);

  form: Address = {
    street: '',
    city: '',
    district: '',
    state: '',
    postalCode: '',
    country: 'India'
  };

  loading = signal(false);
  error = signal('');

  handleSubmit(): void {
    if (!this.form.street || !this.form.city || !this.form.postalCode) {
      this.error.set('Please fill out all required address fields.');
      return;
    }

    this.loading.set(true);
    this.error.set('');

    this.auth.updateAddress(this.form).subscribe({
      next: () => {
        this.loading.set(false);
        this.toast.success('Address added successfully');
        if (this.auth.isFarmer()) {
          this.router.navigate(['/farmer/dashboard']);
        } else {
          this.router.navigate(['/']);
        }
      },
      error: (err) => {
        this.loading.set(false);
        this.error.set(err.error?.message || 'Failed to save address. Please try again.');
      }
    });
  }
}

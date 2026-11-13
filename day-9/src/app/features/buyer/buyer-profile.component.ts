import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Address } from '../../core/models/user.model';

@Component({
  selector: 'app-buyer-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './buyer-profile.component.html',
  styleUrl: './buyer-profile.component.css'
})
export class BuyerProfileComponent implements OnInit {
  auth = inject(AuthService);

  name = '';
  phone = '';
  avatarUrl = '';
  address: Address = {
    street: '',
    city: '',
    state: '',
    postalCode: ''
  };

  ngOnInit(): void {
    const user = this.auth.currentUser();
    if (user) {
      this.name = user.name;
      this.phone = user.phone || '';
      this.avatarUrl = user.profileUrl || '';
      if (user.address) {
        this.address = { ...user.address };
      }
    }
  }

  onSaveProfile(): void {
    this.auth.updateProfile({ name: this.name, phone: this.phone }).subscribe();
  }

  onSaveAddress(): void {
    this.auth.updateAddress(this.address).subscribe();
  }

  onUpdateAvatar(): void {
    if (this.avatarUrl.trim()) {
      this.auth.updateProfilePhoto(this.avatarUrl.trim()).subscribe();
    }
  }
}

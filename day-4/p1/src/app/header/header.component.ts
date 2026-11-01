import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService, UserRole } from '../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  authService = inject(AuthService);
  roles: UserRole[] = ['admin', 'editor', 'viewer', 'guest'];

  onSelectRole(role: UserRole) {
    this.authService.setRole(role);
  }
}

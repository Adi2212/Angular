import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-payment-badge',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './payment-badge.component.html',
  styleUrl: './payment-badge.component.css'
})
export class PaymentBadgeComponent {
  status = input<string | undefined>('PENDING');
}

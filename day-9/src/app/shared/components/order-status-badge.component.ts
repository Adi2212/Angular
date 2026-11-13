import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderStatus } from '../../core/models/order.model';

@Component({
  selector: 'app-order-status-badge',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-status-badge.component.html',
  styleUrl: './order-status-badge.component.css'
})
export class OrderStatusBadgeComponent {
  @Input() status: OrderStatus | string = 'PENDING';
}

import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { OrderService } from '../../core/services/order.service';
import { Order } from '../../core/models/order.model';
import { OrderStatusBadgeComponent } from '../../shared/components/order-status-badge.component';

@Component({
  selector: 'app-buyer-orders',
  standalone: true,
  imports: [CommonModule, RouterModule, OrderStatusBadgeComponent],
  templateUrl: './buyer-orders.component.html',
  styleUrl: './buyer-orders.component.css'
})
export class BuyerOrdersComponent implements OnInit {
  private orderService = inject(OrderService);

  orders = signal<Order[]>([]);

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.orderService.getUserOrders().subscribe(res => this.orders.set(res));
  }

  cancelOrder(id: number): void {
    if (confirm(`Are you sure you want to cancel Order #${id}?`)) {
      this.orderService.cancelOrder(id).subscribe(() => this.loadOrders());
    }
  }
}

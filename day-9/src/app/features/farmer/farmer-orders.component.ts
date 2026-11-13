import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { OrderService } from '../../core/services/order.service';
import { Order, OrderStatus } from '../../core/models/order.model';
import { OrderStatusBadgeComponent } from '../../shared/components/order-status-badge.component';

@Component({
  selector: 'app-farmer-orders',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, OrderStatusBadgeComponent],
  templateUrl: './farmer-orders.component.html',
  styleUrl: './farmer-orders.component.css'
})
export class FarmerOrdersComponent implements OnInit {
  private orderService = inject(OrderService);

  orders = signal<Order[]>([]);

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.orderService.getFarmerOrders().subscribe(res => this.orders.set(res));
  }

  onUpdateStatus(orderId: number, status: OrderStatus): void {
    this.orderService.updateOrderStatus(orderId, status).subscribe(() => {
      this.loadOrders();
    });
  }
}

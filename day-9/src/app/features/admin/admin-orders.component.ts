import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AdminService } from '../../core/services/admin.service';
import { AdminOrderItem } from '../../core/models/admin.model';
import { Order } from '../../core/models/order.model';
import { OrderStatusBadgeComponent } from '../../shared/components/order-status-badge.component';

@Component({
  selector: 'app-admin-orders',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, OrderStatusBadgeComponent],
  templateUrl: './admin-orders.component.html',
  styleUrl: './admin-orders.component.css'
})
export class AdminOrdersComponent implements OnInit {
  private adminService = inject(AdminService);

  orders = signal<AdminOrderItem[]>([]);
  inspectingOrder = signal<Order | null>(null);

  searchQuery = '';
  selectedStatusFilter = signal('ALL');

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.adminService.getOrders().subscribe(res => this.orders.set(res.content));
  }

  filteredOrders = () => {
    let list = this.orders();
    if (this.searchQuery.trim()) {
      const q = this.searchQuery.toLowerCase();
      list = list.filter(o => o.buyerName.toLowerCase().includes(q) || String(o.id).includes(q));
    }
    const st = this.selectedStatusFilter();
    if (st !== 'ALL') {
      list = list.filter(o => o.status === st);
    }
    return list;
  };

  onStatusChange(orderId: number, status: string): void {
    this.adminService.updateOrderStatus(orderId, status).subscribe(() => {
      this.loadOrders();
    });
  }

  viewOrderModal(id: number): void {
    this.adminService.getOrderDetails(id).subscribe(ord => {
      this.inspectingOrder.set(ord);
    });
  }
}

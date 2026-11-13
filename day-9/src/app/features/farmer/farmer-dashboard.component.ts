import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductService } from '../../core/services/product.service';
import { OrderService } from '../../core/services/order.service';
import { AuthService } from '../../core/services/auth.service';
import { FarmerStats } from '../../core/models/product.model';
import { Order } from '../../core/models/order.model';
import { OrderStatusBadgeComponent } from '../../shared/components/order-status-badge.component';

@Component({
  selector: 'app-farmer-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, OrderStatusBadgeComponent],
  templateUrl: './farmer-dashboard.component.html',
  styleUrl: './farmer-dashboard.component.css'
})
export class FarmerDashboardComponent implements OnInit {
  auth = inject(AuthService);
  private productService = inject(ProductService);
  private orderService = inject(OrderService);

  stats = signal<FarmerStats | null>(null);
  recentOrders = signal<Order[]>([]);

  ngOnInit(): void {
    this.productService.getFarmerStats().subscribe(s => this.stats.set(s));
    this.orderService.getFarmerOrders().subscribe(o => this.recentOrders.set(o.slice(0, 3)));
  }
}

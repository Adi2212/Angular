import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { OrderService } from '../../core/services/order.service';
import { Order } from '../../core/models/order.model';
import { OrderStatusBadgeComponent } from '../../shared/components/order-status-badge.component';

@Component({
  selector: 'app-buyer-order-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, OrderStatusBadgeComponent],
  templateUrl: './buyer-order-detail.component.html',
  styleUrl: './buyer-order-detail.component.css'
})
export class BuyerOrderDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private orderService = inject(OrderService);

  order = signal<Order | null>(null);

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      if (id) {
        this.orderService.getOrderById(id).subscribe(ord => this.order.set(ord));
      }
    });
  }

  getStepClass(step: string): string {
    const current = this.order()?.orderStatus || this.order()?.status || 'PENDING';
    const sequence = ['PENDING', 'CONFIRMED', 'SHIPPED', 'DELIVERED'];
    const currentIdx = sequence.indexOf(current);
    const stepIdx = sequence.indexOf(step);

    if (current === 'CANCELLED') {
      return 'bg-rose-100 text-rose-700';
    }
    if (stepIdx <= currentIdx) {
      return 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30';
    }
    return 'bg-slate-100 text-slate-400';
  }

  printReceipt(): void {
    window.print();
  }

  cancelCurrentOrder(): void {
    const id = this.order()?.orderId || this.order()?.id;
    if (id && confirm(`Cancel Order #${id}?`)) {
      this.orderService.cancelOrder(id).subscribe(() => {
        this.orderService.getOrderById(id).subscribe(ord => this.order.set(ord));
      });
    }
  }
}

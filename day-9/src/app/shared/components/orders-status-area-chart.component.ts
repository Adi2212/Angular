import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminService } from '../../core/services/admin.service';
import { OrderStatusStat } from '../../core/models/admin.model';

@Component({
  selector: 'app-orders-status-area-chart',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './orders-status-area-chart.component.html',
  styleUrl: './orders-status-area-chart.component.css'
})
export class OrdersStatusAreaChartComponent implements OnInit {
  private adminService = inject(AdminService);

  timeRange = signal<string>('30');
  orderData = signal<OrderStatusStat[]>([]);
  loading = signal<boolean>(true);

  ngOnInit(): void {
    this.fetchData();
  }

  onTimeRangeChange(range: string): void {
    this.timeRange.set(range);
    this.fetchData();
  }

  fetchData(): void {
    this.loading.set(true);
    const days = Number(this.timeRange()) || 30;
    this.adminService.getOrderStats(days).subscribe({
      next: (data) => {
        this.orderData.set(data || []);
        this.loading.set(false);
      },
      error: () => {
        this.orderData.set([]);
        this.loading.set(false);
      }
    });
  }

  getSegmentWidth(item: any, key: string): number {
    const p = item.pending || 0;
    const c = item.confirmed || 0;
    const s = item.shipped || 0;
    const d = item.delivered || 0;
    const ca = item.cancelled || 0;
    const total = p + c + s + d + ca;
    if (!total) return 0;
    return ((item[key] || 0) / total) * 100;
  }
}

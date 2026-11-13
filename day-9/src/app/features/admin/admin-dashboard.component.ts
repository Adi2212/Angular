import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AdminService } from '../../core/services/admin.service';
import { AdminStats, OrderStatusStat } from '../../core/models/admin.model';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent implements OnInit {
  private adminService = inject(AdminService);

  stats = signal<AdminStats | null>(null);
  orderStats = signal<OrderStatusStat[]>([]);
  selectedDays = signal(7);

  ngOnInit(): void {
    this.adminService.getStats().subscribe(s => this.stats.set(s));
    this.loadStats(7);
  }

  onDaysChange(days: number): void {
    this.selectedDays.set(Number(days));
    this.loadStats(Number(days));
  }

  private loadStats(days: number): void {
    this.adminService.getOrderStats(days).subscribe(st => this.orderStats.set(st));
  }
}

import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AdminService } from '../../core/services/admin.service';
import { BuyerListItem } from '../../core/models/admin.model';

@Component({
  selector: 'app-admin-buyers',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './admin-buyers.component.html',
  styleUrl: './admin-buyers.component.css'
})
export class AdminBuyersComponent implements OnInit {
  private adminService = inject(AdminService);
  buyers = signal<BuyerListItem[]>([]);

  ngOnInit(): void {
    this.loadBuyers();
  }

  loadBuyers(): void {
    this.adminService.getBuyers().subscribe(res => this.buyers.set(res.content));
  }

  onToggleBuyer(buyer: BuyerListItem): void {
    this.adminService.toggleBuyerStatus(buyer.id).subscribe(() => {
      buyer.accStatus = buyer.accStatus === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE';
    });
  }
}

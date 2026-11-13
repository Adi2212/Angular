import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AdminService } from '../../core/services/admin.service';
import { FarmerListItem } from '../../core/models/admin.model';

@Component({
  selector: 'app-admin-farmers',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './admin-farmers.component.html',
  styleUrl: './admin-farmers.component.css'
})
export class AdminFarmersComponent implements OnInit {
  private adminService = inject(AdminService);
  farmers = signal<FarmerListItem[]>([]);

  ngOnInit(): void {
    this.loadFarmers();
  }

  loadFarmers(): void {
    this.adminService.getFarmers().subscribe(res => this.farmers.set(res.content));
  }

  onToggleStatus(farmer: FarmerListItem): void {
    this.adminService.toggleFarmerStatus(farmer.id).subscribe(() => {
      farmer.accStatus = farmer.accStatus === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE';
    });
  }
}

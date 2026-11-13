import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AdminService } from '../../core/services/admin.service';
import { AdminProductItem } from '../../core/models/admin.model';

@Component({
  selector: 'app-admin-products',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './admin-products.component.html',
  styleUrl: './admin-products.component.css'
})
export class AdminProductsComponent implements OnInit {
  private adminService = inject(AdminService);
  products = signal<AdminProductItem[]>([]);

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.adminService.getProducts().subscribe(res => this.products.set(res.content));
  }

  onApproveProduct(id: number): void {
    this.adminService.approveProduct(id).subscribe(() => this.loadProducts());
  }

  onDeleteProduct(id: number): void {
    if (confirm('Are you sure you want to delete this listing from the platform?')) {
      this.adminService.deleteProduct(id).subscribe(() => this.loadProducts());
    }
  }
}

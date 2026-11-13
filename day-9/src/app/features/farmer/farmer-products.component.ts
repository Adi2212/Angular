import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../core/services/product.service';
import { Product } from '../../core/models/product.model';

@Component({
  selector: 'app-farmer-products',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './farmer-products.component.html',
  styleUrl: './farmer-products.component.css'
})
export class FarmerProductsComponent implements OnInit {
  private productService = inject(ProductService);

  products = signal<Product[]>([]);

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getFarmerProducts().subscribe(prods => this.products.set(prods));
  }

  onUpdateStock(prod: Product, event: Event): void {
    const input = event.target as HTMLInputElement;
    const newStock = Number(input.value);
    if (!isNaN(newStock) && newStock >= 0) {
      this.productService.updateProduct(prod.id, {
        name: prod.name,
        description: prod.description,
        price: prod.price,
        categoryId: prod.category.id,
        imgUrl: prod.imgUrl,
        stockQuantity: newStock
      }).subscribe(() => {
        prod.stockQuantity = newStock;
      });
    }
  }

  onDeleteProduct(id: number): void {
    if (confirm('Are you sure you want to delete this produce listing?')) {
      this.productService.deleteProduct(id).subscribe(() => {
        this.loadProducts();
      });
    }
  }
}

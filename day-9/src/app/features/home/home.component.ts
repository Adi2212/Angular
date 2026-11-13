import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductService } from '../../core/services/product.service';
import { SearchService } from '../../core/services/search.service';
import { Product } from '../../core/models/product.model';
import { ProductCardComponent } from '../../shared/components/product-card.component';
import { BannerSliderComponent } from '../../shared/components/banner-slider.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, ProductCardComponent, BannerSliderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  private productService = inject(ProductService);
  searchService = inject(SearchService);

  products = signal<Product[]>([]);
  loading = signal<boolean>(true);
  error = signal<string>('');

  filteredProducts = computed(() => {
    const q = this.searchService.query().toLowerCase().trim();
    if (!q) return this.products();
    return this.products().filter(p => p.name.toLowerCase().includes(q));
  });

  ngOnInit(): void {
    this.fetchProducts();
  }

  fetchProducts(): void {
    this.loading.set(true);
    this.productService.getAllProducts().subscribe({
      next: (res) => {
        // Shuffle array to match React Home.jsx behavior
        const list = Array.isArray(res) ? [...res].sort(() => Math.random() - 0.5) : [];
        this.products.set(list);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Error fetching products:', err);
        this.error.set('Failed to load products');
        this.loading.set(false);
      }
    });
  }
}

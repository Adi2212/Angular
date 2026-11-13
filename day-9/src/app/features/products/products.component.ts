import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../core/services/product.service';
import { CategoryService } from '../../core/services/category.service';
import { Product } from '../../core/models/product.model';
import { SubCategory } from '../../core/models/category.model';
import { ProductCardComponent } from '../../shared/components/product-card.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ProductCardComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
  private productService = inject(ProductService);
  private categoryService = inject(CategoryService);
  private route = inject(ActivatedRoute);

  products = signal<Product[]>([]);
  categories = signal<SubCategory[]>([]);

  searchQuery = '';
  selectedCategoryId = signal<number | null>(null);
  maxPrice = signal(1000);
  inStockOnly = signal(false);
  sortBy = signal('default');

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe(prods => this.products.set(prods || []));
    this.categoryService.getAllCategories().subscribe(cats => this.categories.set(cats || []));

    this.route.queryParams.subscribe(params => {
      if (params['q']) {
        this.searchQuery = params['q'];
      }
      if (params['category']) {
        this.selectedCategoryId.set(Number(params['category']));
      }
    });
  }

  resetFilters(): void {
    this.searchQuery = '';
    this.selectedCategoryId.set(null);
    this.maxPrice.set(1000);
    this.inStockOnly.set(false);
    this.sortBy.set('default');
  }

  filteredProducts = () => {
    let list = this.products();

    // Keyword filter
    if (this.searchQuery.trim()) {
      const q = this.searchQuery.toLowerCase();
      list = list.filter(p => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q));
    }

    // Category filter
    const catId = this.selectedCategoryId();
    if (catId) {
      list = list.filter(p => p.category.id === catId || p.parentCategory?.id === catId);
    }

    // Price filter
    list = list.filter(p => (p.discountedPrice || p.price) <= this.maxPrice());

    // Stock filter
    if (this.inStockOnly()) {
      list = list.filter(p => p.stockQuantity > 0);
    }

    // Sorting
    const sort = this.sortBy();
    if (sort === 'price-asc') {
      list = [...list].sort((a, b) => (a.discountedPrice || a.price) - (b.discountedPrice || b.price));
    } else if (sort === 'price-desc') {
      list = [...list].sort((a, b) => (b.discountedPrice || b.price) - (a.discountedPrice || a.price));
    } else if (sort === 'discount') {
      list = [...list].sort((a, b) => (b.offer?.discountPercentage || 0) - (a.offer?.discountPercentage || 0));
    } else if (sort === 'name') {
      list = [...list].sort((a, b) => a.name.localeCompare(b.name));
    }

    return list;
  };
}

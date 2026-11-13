import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CategoryService } from '../../core/services/category.service';
import { ProductService } from '../../core/services/product.service';
import { MainCategory, SubCategory } from '../../core/models/category.model';
import { Product } from '../../core/models/product.model';
import { ProductCardComponent } from '../../shared/components/product-card.component';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, RouterModule, ProductCardComponent],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent implements OnInit {
  private categoryService = inject(CategoryService);
  private productService = inject(ProductService);

  mainCategories = signal<MainCategory[]>([]);
  subCategories = signal<SubCategory[]>([]);
  products = signal<Product[]>([]);

  selectedMain = signal<MainCategory | null>(null);
  selectedSub = signal<SubCategory | null>(null);

  loading = signal<boolean>(false);
  error = signal<string>('');

  ngOnInit(): void {
    this.fetchMainCategories();
  }

  fetchMainCategories(): void {
    this.loading.set(true);
    this.categoryService.getMainCategories().subscribe({
      next: (res) => {
        this.mainCategories.set(res || []);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Failed to load categories');
        this.loading.set(false);
      }
    });
  }

  handleMainClick(cat: MainCategory): void {
    this.selectedMain.set(cat);
    this.selectedSub.set(null);
    this.products.set([]);
    this.loading.set(true);

    this.categoryService.getSubCategories(cat.id).subscribe({
      next: (subs) => {
        this.subCategories.set(subs || []);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Failed to load subcategories');
        this.loading.set(false);
      }
    });
  }

  handleSubClick(sub: SubCategory): void {
    this.selectedSub.set(sub);
    this.loading.set(true);
    this.error.set('');

    this.productService.getProductsByCategory(sub.id).subscribe({
      next: (prods) => {
        this.products.set(prods || []);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Failed to load products');
        this.loading.set(false);
      }
    });
  }
}

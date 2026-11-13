import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../core/services/product.service';
import { CategoryService } from '../../core/services/category.service';
import { SubCategory } from '../../core/models/category.model';
import { AddProductRequest } from '../../core/models/product.model';

@Component({
  selector: 'app-farmer-product-form',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './farmer-product-form.component.html',
  styleUrl: './farmer-product-form.component.css'
})
export class FarmerProductFormComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private productService = inject(ProductService);
  private categoryService = inject(CategoryService);

  isEditMode = false;
  productId: number | null = null;
  categories: SubCategory[] = [];

  name = '';
  description = '';
  price = 100;
  categoryId = 101;
  stockQuantity = 50;
  imgUrl = 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&fit=crop';

  ngOnInit(): void {
    this.categoryService.getAllCategories().subscribe(cats => {
      this.categories = cats;
      if (cats.length > 0 && !this.categoryId) {
        this.categoryId = cats[0].id;
      }
    });

    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.isEditMode = true;
        this.productId = Number(id);
        this.productService.getProductById(this.productId).subscribe(p => {
          this.name = p.name;
          this.description = p.description;
          this.price = p.price;
          this.categoryId = p.category.id;
          this.stockQuantity = p.stockQuantity;
          this.imgUrl = p.imgUrl;
        });
      }
    });
  }

  onSubmit(): void {
    const req: AddProductRequest = {
      name: this.name,
      description: this.description,
      price: this.price,
      categoryId: this.categoryId,
      imgUrl: this.imgUrl,
      stockQuantity: this.stockQuantity
    };

    if (this.isEditMode && this.productId) {
      this.productService.updateProduct(this.productId, req).subscribe(() => {
        this.router.navigate(['/farmer/products']);
      });
    } else {
      this.productService.addProduct(req).subscribe(() => {
        this.router.navigate(['/farmer/products']);
      });
    }
  }
}

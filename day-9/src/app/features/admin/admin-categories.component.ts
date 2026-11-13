import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CategoryService } from '../../core/services/category.service';
import { MainCategory, SubCategory } from '../../core/models/category.model';

@Component({
  selector: 'app-admin-categories',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './admin-categories.component.html',
  styleUrl: './admin-categories.component.css'
})
export class AdminCategoriesComponent implements OnInit {
  private categoryService = inject(CategoryService);

  mainCategories = signal<MainCategory[]>([]);
  allSubCategories = signal<SubCategory[]>([]);
  showAddModal = signal(false);

  newCatName = '';
  newCatImg = 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&fit=crop';
  newCatParentId: number | null = null;

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.categoryService.getMainCategories().subscribe(m => this.mainCategories.set(m));
    this.categoryService.getAllCategories().subscribe(s => this.allSubCategories.set(s));
  }

  getSubcategories(parentId: number): SubCategory[] {
    return this.allSubCategories().filter(s => s.parent?.id === parentId);
  }

  onToggleSubcategory(sub: SubCategory): void {
    this.categoryService.toggleCategoryStatus(sub.id, !sub.isActive).subscribe(() => {
      sub.isActive = !sub.isActive;
    });
  }

  onCreateCategory(): void {
    if (!this.newCatName || !this.newCatImg) return;
    this.categoryService.addCategory({
      name: this.newCatName,
      imgUrl: this.newCatImg,
      parentId: this.newCatParentId
    }).subscribe(() => {
      this.showAddModal.set(false);
      this.newCatName = '';
      this.loadCategories();
    });
  }
}

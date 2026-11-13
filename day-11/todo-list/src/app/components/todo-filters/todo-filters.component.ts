import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Category, Priority, SortOption, StatusFilter } from '../../models/todo.model';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-todo-filters',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="filters-container">
      <!-- Search & Sort Row -->
      <div class="search-sort-row">
        <!-- Search Bar -->
        <div class="search-box">
          <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>

          <input
            type="text"
            class="search-input"
            placeholder="Search tasks, descriptions, or subtasks..."
            [value]="searchQuery()"
            (input)="onSearchInput($event)"
            aria-label="Search tasks"
          />

          @if (searchQuery()) {
            <button
              type="button"
              class="btn-clear-search"
              (click)="clearSearch()"
              title="Clear search"
              aria-label="Clear search"
            >
              &times;
            </button>
          }
        </div>

        <!-- Sort Control -->
        <div class="sort-control">
          <label for="sort-select" class="sort-label">Sort by:</label>
          <select
            id="sort-select"
            class="sort-select"
            [value]="sortBy()"
            (change)="onSortChange($event)"
          >
            <option value="dueDate">Due Date</option>
            <option value="priority">Priority</option>
            <option value="createdAt">Newest First</option>
            <option value="alphabetical">Title (A-Z)</option>
          </select>
        </div>
      </div>

      <!-- Status Tabs Row -->
      <div class="status-tabs-row" role="tablist" aria-label="Task status filters">
        <button
          type="button"
          class="tab-btn"
          role="tab"
          [attr.aria-selected]="statusFilter() === 'all'"
          [class.active]="statusFilter() === 'all'"
          (click)="setStatus('all')"
        >
          <span>All Tasks</span>
          <span class="count-pill">{{ stats().total }}</span>
        </button>

        <button
          type="button"
          class="tab-btn"
          role="tab"
          [attr.aria-selected]="statusFilter() === 'active'"
          [class.active]="statusFilter() === 'active'"
          (click)="setStatus('active')"
        >
          <span>Active</span>
          <span class="count-pill">{{ stats().active }}</span>
        </button>

        <button
          type="button"
          class="tab-btn"
          role="tab"
          [attr.aria-selected]="statusFilter() === 'completed'"
          [class.active]="statusFilter() === 'completed'"
          (click)="setStatus('completed')"
        >
          <span>Done</span>
          <span class="count-pill">{{ stats().completed }}</span>
        </button>

        <button
          type="button"
          class="tab-btn tab-btn-alert"
          role="tab"
          [attr.aria-selected]="statusFilter() === 'overdue'"
          [class.active]="statusFilter() === 'overdue'"
          (click)="setStatus('overdue')"
        >
          <span>Overdue</span>
          @if (stats().overdue > 0) {
            <span class="count-pill count-alert">{{ stats().overdue }}</span>
          } @else {
            <span class="count-pill">0</span>
          }
        </button>
      </div>

      <!-- Filter Chips Row: Categories & Priority -->
      <div class="chips-row">
        <!-- Categories Chips -->
        <div class="chips-group">
          <span class="chips-group-title">Category:</span>
          <button
            type="button"
            class="chip-btn"
            [class.chip-active]="categoryFilter() === 'all'"
            (click)="setCategory('all')"
          >
            All
          </button>
          @for (cat of categories; track cat) {
            <button
              type="button"
              class="chip-btn"
              [class.chip-active]="categoryFilter() === cat"
              (click)="setCategory(cat)"
            >
              {{ cat }}
            </button>
          }
        </div>

        <!-- Priority Chips -->
        <div class="chips-group">
          <span class="chips-group-title">Priority:</span>
          <button
            type="button"
            class="chip-btn"
            [class.chip-active]="priorityFilter() === 'all'"
            (click)="setPriority('all')"
          >
            All
          </button>
          @for (p of priorities; track p) {
            <button
              type="button"
              class="chip-btn"
              [attr.data-p]="p"
              [class.chip-active]="priorityFilter() === p"
              (click)="setPriority(p)"
            >
              {{ p }}
            </button>
          }
        </div>
      </div>
    </div>
  `,
  styles: [`
    .filters-container {
      display: flex;
      flex-direction: column;
      gap: 0.9rem;
      margin-bottom: 1.25rem;
    }

    .search-sort-row {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .search-box {
      flex: 1;
      display: flex;
      align-items: center;
      background: rgba(30, 41, 59, 0.6);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 10px;
      padding: 0.45rem 0.75rem;
      position: relative;
      transition: all 0.2s ease;
    }

    .search-box:focus-within {
      border-color: rgba(99, 102, 241, 0.45);
      background: rgba(30, 41, 59, 0.85);
      box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.15);
    }

    .search-icon {
      width: 17px;
      height: 17px;
      color: #94a3b8;
      margin-right: 0.5rem;
      flex-shrink: 0;
    }

    .search-input {
      flex: 1;
      background: transparent;
      border: none;
      outline: none;
      color: #f8fafc;
      font-size: 0.875rem;
    }

    .search-input::placeholder {
      color: #64748b;
    }

    .btn-clear-search {
      background: transparent;
      border: none;
      color: #94a3b8;
      font-size: 1.25rem;
      cursor: pointer;
      line-height: 1;
      padding: 0 0.2rem;
    }

    .btn-clear-search:hover {
      color: #f87171;
    }

    .sort-control {
      display: flex;
      align-items: center;
      gap: 0.4rem;
      flex-shrink: 0;
    }

    .sort-label {
      font-size: 0.775rem;
      color: #94a3b8;
      font-weight: 500;
    }

    .sort-select {
      background: rgba(30, 41, 59, 0.6);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 8px;
      padding: 0.45rem 0.65rem;
      color: #e2e8f0;
      font-size: 0.8125rem;
      outline: none;
      cursor: pointer;
    }

    .sort-select option {
      background: #1e293b;
      color: #f8fafc;
    }

    .status-tabs-row {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      padding-bottom: 0.6rem;
      overflow-x: auto;
    }

    .tab-btn {
      display: inline-flex;
      align-items: center;
      gap: 0.45rem;
      background: transparent;
      border: none;
      color: #94a3b8;
      font-size: 0.875rem;
      font-weight: 500;
      padding: 0.45rem 0.8rem;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.2s ease;
      white-space: nowrap;
    }

    .tab-btn:hover {
      color: #f1f5f9;
      background: rgba(255, 255, 255, 0.04);
    }

    .tab-btn.active {
      color: #ffffff;
      background: rgba(99, 102, 241, 0.15);
      border: 1px solid rgba(99, 102, 241, 0.3);
      font-weight: 600;
    }

    .tab-btn.tab-btn-alert.active {
      color: #fca5a5;
      background: rgba(239, 68, 68, 0.15);
      border-color: rgba(239, 68, 68, 0.3);
    }

    .count-pill {
      font-size: 0.7rem;
      font-weight: 600;
      padding: 0.1rem 0.45rem;
      border-radius: 9999px;
      background: rgba(255, 255, 255, 0.08);
      color: #cbd5e1;
    }

    .tab-btn.active .count-pill {
      background: rgba(99, 102, 241, 0.3);
      color: #e0e7ff;
    }

    .count-alert {
      background: rgba(239, 68, 68, 0.25) !important;
      color: #fca5a5 !important;
    }

    .chips-row {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      gap: 0.75rem;
    }

    .chips-group {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 0.35rem;
    }

    .chips-group-title {
      font-size: 0.725rem;
      font-weight: 600;
      text-transform: uppercase;
      color: #64748b;
      margin-right: 0.2rem;
      letter-spacing: 0.03em;
    }

    .chip-btn {
      background: rgba(255, 255, 255, 0.04);
      border: 1px solid rgba(255, 255, 255, 0.06);
      color: #94a3b8;
      border-radius: 9999px;
      padding: 0.2rem 0.6rem;
      font-size: 0.75rem;
      font-weight: 500;
      cursor: pointer;
      text-transform: capitalize;
      transition: all 0.15s ease;
    }

    .chip-btn:hover {
      background: rgba(255, 255, 255, 0.08);
      color: #e2e8f0;
    }

    .chip-btn.chip-active {
      background: rgba(99, 102, 241, 0.2);
      border-color: rgba(99, 102, 241, 0.4);
      color: #c7d2fe;
      font-weight: 600;
    }

    .chip-btn[data-p='urgent'].chip-active {
      background: rgba(239, 68, 68, 0.2);
      border-color: rgba(239, 68, 68, 0.4);
      color: #fca5a5;
    }

    .chip-btn[data-p='high'].chip-active {
      background: rgba(245, 158, 11, 0.2);
      border-color: rgba(245, 158, 11, 0.4);
      color: #fde68a;
    }

    @media (max-width: 640px) {
      .search-sort-row {
        flex-direction: column;
        align-items: stretch;
      }
      .sort-control {
        justify-content: flex-end;
      }
    }
  `],
})
export class TodoFiltersComponent {
  private readonly todoService = inject(TodoService);

  readonly searchQuery = this.todoService.searchQuery;
  readonly statusFilter = this.todoService.statusFilter;
  readonly categoryFilter = this.todoService.categoryFilter;
  readonly priorityFilter = this.todoService.priorityFilter;
  readonly sortBy = this.todoService.sortBy;
  readonly stats = this.todoService.stats;
  readonly categories = this.todoService.categories;
  readonly priorities: Priority[] = ['urgent', 'high', 'medium', 'low'];

  onSearchInput(e: Event): void {
    const val = (e.target as HTMLInputElement).value;
    this.todoService.setSearch(val);
  }

  clearSearch(): void {
    this.todoService.setSearch('');
  }

  onSortChange(e: Event): void {
    const val = (e.target as HTMLSelectElement).value as SortOption;
    this.todoService.setSort(val);
  }

  setStatus(status: StatusFilter): void {
    this.todoService.setStatus(status);
  }

  setCategory(cat: string): void {
    this.todoService.setCategory(cat);
  }

  setPriority(p: string): void {
    this.todoService.setPriority(p);
  }
}

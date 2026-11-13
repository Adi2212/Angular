import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { TodoItemComponent } from '../todo-item/todo-item.component';

@Component({
  selector: 'app-todo-list',
  imports: [TodoItemComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="todo-list-section" aria-label="Tasks list">
      <div class="list-container">
        @for (item of todos(); track item.id) {
          <app-todo-item [todo]="item" />
        } @empty {
          <div class="empty-state">
            <div class="empty-icon-wrap">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            </div>

            @if (searchQuery()) {
              <h3 class="empty-title">No matching tasks found</h3>
              <p class="empty-desc">No tasks match your search query: &ldquo;{{ searchQuery() }}&rdquo;</p>
              <button type="button" class="btn-empty-action" (click)="clearSearch()">
                Clear Search
              </button>
            } @else if (statusFilter() === 'completed') {
              <h3 class="empty-title">No completed tasks</h3>
              <p class="empty-desc">Check off active tasks as you finish them to see them here.</p>
            } @else if (statusFilter() === 'overdue') {
              <h3 class="empty-title">Great news! No overdue tasks</h3>
              <p class="empty-desc">All your deadlines are healthy and on schedule.</p>
            } @else {
              <h3 class="empty-title">Your workspace is clear</h3>
              <p class="empty-desc">Add a task above or load the showcase demo dataset to get started.</p>
              <button type="button" class="btn-empty-action" (click)="loadDemo()">
                Load Demo Dataset
              </button>
            }
          </div>
        }
      </div>
    </section>
  `,
  styles: [`
    .todo-list-section {
      min-height: 200px;
    }

    .list-container {
      display: flex;
      flex-direction: column;
    }

    .empty-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      padding: 3.5rem 1.5rem;
      background: rgba(30, 41, 59, 0.3);
      border: 1px dashed rgba(255, 255, 255, 0.12);
      border-radius: 14px;
      margin: 1rem 0;
    }

    .empty-icon-wrap {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 56px;
      height: 56px;
      border-radius: 16px;
      background: rgba(99, 102, 241, 0.12);
      color: #818cf8;
      margin-bottom: 1rem;
    }

    .empty-icon-wrap svg {
      width: 28px;
      height: 28px;
    }

    .empty-title {
      font-size: 1.125rem;
      font-weight: 600;
      color: #f1f5f9;
      margin: 0 0 0.35rem 0;
    }

    .empty-desc {
      font-size: 0.875rem;
      color: #94a3b8;
      max-width: 360px;
      margin: 0 0 1rem 0;
      line-height: 1.5;
    }

    .btn-empty-action {
      background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
      color: #ffffff;
      border: none;
      padding: 0.5rem 1.1rem;
      border-radius: 8px;
      font-size: 0.8125rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .btn-empty-action:hover {
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(99, 102, 241, 0.35);
    }
  `],
})
export class TodoListComponent {
  private readonly todoService = inject(TodoService);

  readonly todos = this.todoService.filteredTodos;
  readonly searchQuery = this.todoService.searchQuery;
  readonly statusFilter = this.todoService.statusFilter;

  clearSearch(): void {
    this.todoService.setSearch('');
  }

  loadDemo(): void {
    this.todoService.resetToDemo();
  }
}

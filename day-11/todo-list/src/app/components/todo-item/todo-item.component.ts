import {
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  inject,
  input,
  signal,
  viewChild,
} from '@angular/core';
import { SubTask, Todo } from '../../models/todo.model';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-todo-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article
      class="todo-item"
      [class.completed]="todo().completed"
      [class.overdue]="isOverdue()"
      [attr.aria-label]="todo().title"
    >
      <!-- Main Row -->
      <div class="item-main-row">
        <!-- Checkbox -->
        <button
          type="button"
          class="custom-checkbox"
          [class.checked]="todo().completed"
          (click)="onToggleComplete()"
          [attr.aria-checked]="todo().completed"
          role="checkbox"
          title="Toggle completion"
        >
          @if (todo().completed) {
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          }
        </button>

        <!-- Content Area -->
        <div class="content-area">
          @if (isEditing()) {
            <form (submit)="saveEdit($event)" class="inline-edit-form">
              <input
                #editInput
                type="text"
                class="edit-input"
                [value]="editTitle()"
                (input)="onEditInput($event)"
                (keydown.escape)="cancelEdit()"
                aria-label="Edit task title"
                required
              />
              <button type="submit" class="btn-save" title="Save changes">Save</button>
              <button type="button" class="btn-cancel" (click)="cancelEdit()" title="Cancel">Cancel</button>
            </form>
          } @else {
            <div class="title-row">
              <span
                class="item-title"
                (dblclick)="startEditing()"
                title="Double click to edit"
              >
                {{ todo().title }}
              </span>

              <!-- Priority Badge -->
              <span class="badge-priority" [attr.data-priority]="todo().priority">
                {{ todo().priority }}
              </span>

              <!-- Category Badge -->
              <span class="badge-category">
                {{ todo().category }}
              </span>
            </div>

            @if (todo().description) {
              <p class="item-description">{{ todo().description }}</p>
            }

            <!-- Metadata & Due Date Row -->
            <div class="meta-row">
              @if (todo().dueDate) {
                <span class="meta-item date-meta" [class.meta-overdue]="isOverdue()">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                  @if (isOverdue()) {
                    <span>Overdue: {{ todo().dueDate }}</span>
                  } @else {
                    <span>Due: {{ todo().dueDate }}</span>
                  }
                </span>
              }

              <!-- Subtasks Progress Pill -->
              @if (todo().subtasks.length > 0) {
                <button
                  type="button"
                  class="meta-item subtask-toggle"
                  (click)="toggleSubtasks()"
                  title="Toggle subtasks checklist"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M9 11l3 3L22 4" />
                    <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                  </svg>
                  <span>{{ completedSubtasksCount() }}/{{ todo().subtasks.length }} steps</span>
                  <svg class="chevron-icon" [class.rotated]="isSubtasksOpen()" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>
              }
            </div>
          }
        </div>

        <!-- Action Buttons -->
        <div class="action-buttons">
          @if (!isEditing()) {
            <button
              type="button"
              class="btn-action"
              (click)="toggleSubtasks()"
              title="Add or view subtask checklist"
              aria-label="Toggle subtasks"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="8" y1="6" x2="21" y2="6" />
                <line x1="8" y1="12" x2="21" y2="12" />
                <line x1="8" y1="18" x2="21" y2="18" />
                <line x1="3" y1="6" x2="3.01" y2="6" />
                <line x1="3" y1="12" x2="3.01" y2="12" />
                <line x1="3" y1="18" x2="3.01" y2="18" />
              </svg>
            </button>

            <button
              type="button"
              class="btn-action"
              (click)="startEditing()"
              title="Edit task title"
              aria-label="Edit task title"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 20h9" />
                <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
              </svg>
            </button>
          }

          <button
            type="button"
            class="btn-action btn-delete"
            (click)="onDelete()"
            title="Delete task"
            aria-label="Delete task"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="3 6 5 6 21 6" />
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Expandable Subtasks Checklist -->
      @if (isSubtasksOpen()) {
        <div class="subtasks-section">
          <div class="subtasks-header">
            <span class="subtasks-label">Checklist Steps</span>
          </div>

          <ul class="subtasks-list">
            @for (st of todo().subtasks; track st.id) {
              <li class="subtask-row">
                <button
                  type="button"
                  class="subtask-checkbox"
                  [class.checked]="st.completed"
                  (click)="onToggleSubtask(st.id)"
                  role="checkbox"
                  [attr.aria-checked]="st.completed"
                >
                  @if (st.completed) {
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  }
                </button>

                <span class="subtask-title" [class.subtask-completed]="st.completed">
                  {{ st.title }}
                </span>

                <button
                  type="button"
                  class="btn-remove-step"
                  (click)="onDeleteSubtask(st.id)"
                  title="Remove subtask"
                >
                  &times;
                </button>
              </li>
            }
          </ul>

          <!-- Add new step input -->
          <div class="add-subtask-row">
            <input
              type="text"
              class="add-subtask-input"
              placeholder="Add another step and press Enter..."
              [value]="newSubtaskTitle()"
              (input)="onNewSubtaskInput($event)"
              (keydown.enter)="onAddSubtask($event)"
            />
            <button
              type="button"
              class="btn-add-step"
              (click)="onAddSubtask($event)"
              [disabled]="!newSubtaskTitle().trim()"
            >
              Add Step
            </button>
          </div>
        </div>
      }
    </article>
  `,
  styles: [`
    .todo-item {
      background: rgba(30, 41, 59, 0.5);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 12px;
      padding: 0.9rem 1.1rem;
      margin-bottom: 0.65rem;
      transition: all 0.2s ease;
    }

    .todo-item:hover {
      background: rgba(30, 41, 59, 0.75);
      border-color: rgba(255, 255, 255, 0.14);
      transform: translateY(-1px);
    }

    .todo-item.completed {
      opacity: 0.7;
      background: rgba(15, 23, 42, 0.5);
      border-color: rgba(255, 255, 255, 0.04);
    }

    .todo-item.overdue:not(.completed) {
      border-left: 3px solid #ef4444;
    }

    .item-main-row {
      display: flex;
      align-items: flex-start;
      gap: 0.85rem;
    }

    .custom-checkbox {
      width: 22px;
      height: 22px;
      border-radius: 6px;
      border: 2px solid rgba(255, 255, 255, 0.25);
      background: rgba(15, 23, 42, 0.6);
      color: #ffffff;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      flex-shrink: 0;
      margin-top: 0.15rem;
      transition: all 0.2s ease;
      padding: 0;
    }

    .custom-checkbox:hover {
      border-color: #818cf8;
      background: rgba(99, 102, 241, 0.15);
    }

    .custom-checkbox.checked {
      background: #10b981;
      border-color: #10b981;
    }

    .custom-checkbox svg {
      width: 14px;
      height: 14px;
    }

    .content-area {
      flex: 1;
      min-width: 0;
    }

    .title-row {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 0.5rem;
    }

    .item-title {
      font-size: 0.95rem;
      font-weight: 500;
      color: #f1f5f9;
      line-height: 1.4;
      cursor: pointer;
      word-break: break-word;
    }

    .completed .item-title {
      text-decoration: line-through;
      color: #64748b;
    }

    .badge-priority {
      font-size: 0.65rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.04em;
      padding: 0.15rem 0.45rem;
      border-radius: 9999px;
    }

    .badge-priority[data-priority='urgent'] {
      background: rgba(239, 68, 68, 0.18);
      color: #f87171;
      border: 1px solid rgba(239, 68, 68, 0.35);
    }

    .badge-priority[data-priority='high'] {
      background: rgba(245, 158, 11, 0.18);
      color: #fbbf24;
      border: 1px solid rgba(245, 158, 11, 0.35);
    }

    .badge-priority[data-priority='medium'] {
      background: rgba(59, 130, 246, 0.18);
      color: #60a5fa;
      border: 1px solid rgba(59, 130, 246, 0.35);
    }

    .badge-priority[data-priority='low'] {
      background: rgba(16, 185, 129, 0.18);
      color: #34d399;
      border: 1px solid rgba(16, 185, 129, 0.35);
    }

    .badge-category {
      font-size: 0.675rem;
      font-weight: 500;
      padding: 0.15rem 0.45rem;
      border-radius: 6px;
      background: rgba(255, 255, 255, 0.06);
      color: #94a3b8;
      border: 1px solid rgba(255, 255, 255, 0.08);
    }

    .item-description {
      font-size: 0.8125rem;
      color: #94a3b8;
      margin: 0.35rem 0 0 0;
      line-height: 1.45;
    }

    .meta-row {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 0.85rem;
      margin-top: 0.45rem;
    }

    .meta-item {
      display: inline-flex;
      align-items: center;
      gap: 0.35rem;
      font-size: 0.75rem;
      color: #94a3b8;
    }

    .meta-item svg {
      width: 14px;
      height: 14px;
    }

    .date-meta.meta-overdue {
      color: #f87171;
      font-weight: 600;
    }

    .subtask-toggle {
      background: rgba(99, 102, 241, 0.1);
      border: 1px solid rgba(99, 102, 241, 0.2);
      color: #c7d2fe;
      padding: 0.15rem 0.5rem;
      border-radius: 6px;
      cursor: pointer;
      transition: all 0.15s ease;
    }

    .subtask-toggle:hover {
      background: rgba(99, 102, 241, 0.2);
    }

    .chevron-icon {
      transition: transform 0.2s ease;
    }

    .chevron-icon.rotated {
      transform: rotate(180deg);
    }

    .action-buttons {
      display: flex;
      align-items: center;
      gap: 0.25rem;
      opacity: 0.75;
      transition: opacity 0.2s ease;
    }

    .todo-item:hover .action-buttons {
      opacity: 1;
    }

    .btn-action {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 30px;
      height: 30px;
      border-radius: 6px;
      background: transparent;
      border: none;
      color: #94a3b8;
      cursor: pointer;
      transition: all 0.15s ease;
    }

    .btn-action:hover {
      background: rgba(255, 255, 255, 0.08);
      color: #f8fafc;
    }

    .btn-action svg {
      width: 15px;
      height: 15px;
    }

    .btn-delete:hover {
      background: rgba(239, 68, 68, 0.15);
      color: #f87171;
    }

    .inline-edit-form {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      width: 100%;
    }

    .edit-input {
      flex: 1;
      background: rgba(15, 23, 42, 0.8);
      border: 1px solid rgba(99, 102, 241, 0.5);
      border-radius: 6px;
      padding: 0.35rem 0.6rem;
      color: #ffffff;
      font-size: 0.9rem;
      outline: none;
    }

    .btn-save {
      background: #4f46e5;
      color: #ffffff;
      border: none;
      padding: 0.35rem 0.7rem;
      border-radius: 6px;
      font-size: 0.775rem;
      font-weight: 600;
      cursor: pointer;
    }

    .btn-cancel {
      background: transparent;
      border: 1px solid rgba(255, 255, 255, 0.12);
      color: #94a3b8;
      padding: 0.35rem 0.7rem;
      border-radius: 6px;
      font-size: 0.775rem;
      cursor: pointer;
    }

    .subtasks-section {
      margin-top: 0.85rem;
      padding-top: 0.75rem;
      border-top: 1px solid rgba(255, 255, 255, 0.06);
      animation: fadeIn 0.15s ease;
    }

    .subtasks-header {
      font-size: 0.725rem;
      font-weight: 600;
      text-transform: uppercase;
      color: #64748b;
      letter-spacing: 0.04em;
      margin-bottom: 0.45rem;
    }

    .subtasks-list {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: column;
      gap: 0.35rem;
    }

    .subtask-row {
      display: flex;
      align-items: center;
      gap: 0.6rem;
      padding: 0.25rem 0.4rem;
      border-radius: 6px;
      transition: background 0.15s ease;
    }

    .subtask-row:hover {
      background: rgba(255, 255, 255, 0.03);
    }

    .subtask-checkbox {
      width: 17px;
      height: 17px;
      border-radius: 4px;
      border: 1.5px solid rgba(255, 255, 255, 0.2);
      background: rgba(15, 23, 42, 0.6);
      color: #ffffff;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      padding: 0;
    }

    .subtask-checkbox.checked {
      background: #10b981;
      border-color: #10b981;
    }

    .subtask-checkbox svg {
      width: 11px;
      height: 11px;
    }

    .subtask-title {
      flex: 1;
      font-size: 0.8125rem;
      color: #cbd5e1;
    }

    .subtask-completed {
      text-decoration: line-through;
      color: #64748b;
    }

    .btn-remove-step {
      background: transparent;
      border: none;
      color: #64748b;
      cursor: pointer;
      font-size: 1.1rem;
      line-height: 1;
      padding: 0 0.25rem;
    }

    .btn-remove-step:hover {
      color: #f87171;
    }

    .add-subtask-row {
      display: flex;
      gap: 0.5rem;
      margin-top: 0.6rem;
    }

    .add-subtask-input {
      flex: 1;
      background: rgba(15, 23, 42, 0.6);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 6px;
      padding: 0.35rem 0.6rem;
      color: #e2e8f0;
      font-size: 0.8rem;
      outline: none;
    }

    .add-subtask-input:focus {
      border-color: rgba(99, 102, 241, 0.5);
    }

    .btn-add-step {
      background: rgba(255, 255, 255, 0.06);
      border: 1px solid rgba(255, 255, 255, 0.1);
      color: #cbd5e1;
      padding: 0 0.65rem;
      border-radius: 6px;
      font-size: 0.75rem;
      cursor: pointer;
    }

    .btn-add-step:disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }
  `],
})
export class TodoItemComponent {
  private readonly todoService = inject(TodoService);

  readonly todo = input.required<Todo>();

  readonly isEditing = signal(false);
  readonly editTitle = signal('');
  readonly isSubtasksOpen = signal(false);
  readonly newSubtaskTitle = signal('');

  readonly editInputRef = viewChild<ElementRef<HTMLInputElement>>('editInput');

  readonly isOverdue = computed(() => {
    const t = this.todo();
    if (t.completed || !t.dueDate) return false;
    const today = new Date().toISOString().split('T')[0];
    return t.dueDate < today;
  });

  readonly completedSubtasksCount = computed(() => {
    return this.todo().subtasks.filter((st) => st.completed).length;
  });

  onToggleComplete(): void {
    this.todoService.toggleTodo(this.todo().id);
  }

  onDelete(): void {
    this.todoService.deleteTodo(this.todo().id);
  }

  startEditing(): void {
    this.editTitle.set(this.todo().title);
    this.isEditing.set(true);
    setTimeout(() => {
      this.editInputRef()?.nativeElement.focus();
    }, 50);
  }

  onEditInput(e: Event): void {
    this.editTitle.set((e.target as HTMLInputElement).value);
  }

  saveEdit(e: Event): void {
    e.preventDefault();
    const val = this.editTitle().trim();
    if (val) {
      this.todoService.updateTodo(this.todo().id, { title: val });
    }
    this.isEditing.set(false);
  }

  cancelEdit(): void {
    this.isEditing.set(false);
  }

  toggleSubtasks(): void {
    this.isSubtasksOpen.update((v) => !v);
  }

  onToggleSubtask(subtaskId: string): void {
    this.todoService.toggleSubtask(this.todo().id, subtaskId);
  }

  onDeleteSubtask(subtaskId: string): void {
    this.todoService.deleteSubtask(this.todo().id, subtaskId);
  }

  onNewSubtaskInput(e: Event): void {
    this.newSubtaskTitle.set((e.target as HTMLInputElement).value);
  }

  onAddSubtask(e?: Event): void {
    if (e) e.preventDefault();
    const val = this.newSubtaskTitle().trim();
    if (!val) return;
    this.todoService.addSubtask(this.todo().id, val);
    this.newSubtaskTitle.set('');
  }
}

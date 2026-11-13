import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Category, CreateTodoDto, Priority } from '../../models/todo.model';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-todo-input',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="input-card" [class.input-card-expanded]="isExpanded()">
      <!-- Primary Input Row -->
      <form (submit)="onSubmit($event)" class="primary-row">
        <div class="input-prefix-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="16" />
            <line x1="8" y1="12" x2="16" y2="12" />
          </svg>
        </div>

        <input
          type="text"
          class="title-input"
          placeholder="What needs to be done? (Press Enter to add)"
          [value]="title()"
          (input)="onTitleInput($event)"
          (keydown.escape)="collapse()"
          aria-label="New task title"
          required
        />

        <div class="quick-controls">
          <button
            type="button"
            class="btn-toggle-expand"
            (click)="toggleExpanded()"
            [class.active]="isExpanded()"
            title="Toggle extra options (due date, priority, category, subtasks)"
            aria-label="Toggle extra options"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="4" y1="21" x2="4" y2="14" />
              <line x1="4" y1="10" x2="4" y2="3" />
              <line x1="12" y1="21" x2="12" y2="12" />
              <line x1="12" y1="8" x2="12" y2="3" />
              <line x1="20" y1="21" x2="20" y2="16" />
              <line x1="20" y1="12" x2="20" y2="3" />
              <line x1="1" y1="14" x2="7" y2="14" />
              <line x1="9" y1="8" x2="15" y2="8" />
              <line x1="17" y1="16" x2="23" y2="16" />
            </svg>
          </button>

          <button
            type="submit"
            class="btn-submit"
            [disabled]="!title().trim()"
            title="Add task"
          >
            <span class="btn-text">Add Task</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          </button>
        </div>
      </form>

      <!-- Advanced Configuration Panel -->
      @if (isExpanded()) {
        <div class="expanded-panel">
          <!-- Description -->
          <div class="form-group">
            <label for="task-desc" class="group-label">Description / Notes</label>
            <textarea
              id="task-desc"
              class="desc-input"
              rows="2"
              placeholder="Add extra context, specifications, or links..."
              [value]="description()"
              (input)="onDescriptionInput($event)"
            ></textarea>
          </div>

          <!-- Attributes Grid: Category, Priority & Due Date -->
          <div class="attributes-grid">
            <!-- Category -->
            <div class="form-group">
              <label for="task-cat" class="group-label">Category</label>
              <select
                id="task-cat"
                class="select-input"
                [value]="category()"
                (change)="onCategoryChange($event)"
              >
                @for (cat of categories; track cat) {
                  <option [value]="cat">{{ cat }}</option>
                }
              </select>
            </div>

            <!-- Priority -->
            <div class="form-group">
              <label class="group-label">Priority</label>
              <div class="priority-segmented">
                @for (p of priorities; track p) {
                  <button
                    type="button"
                    class="btn-segment"
                    [class.selected]="priority() === p"
                    [attr.data-priority]="p"
                    (click)="setPriority(p)"
                  >
                    {{ p }}
                  </button>
                }
              </div>
            </div>

            <!-- Due Date -->
            <div class="form-group">
              <label for="task-due" class="group-label">Due Date</label>
              <input
                id="task-due"
                type="date"
                class="date-input"
                [value]="dueDate()"
                (change)="onDueDateChange($event)"
              />
            </div>
          </div>

          <!-- Subtasks Entry -->
          <div class="form-group">
            <label class="group-label">Checklist / Subtasks (Optional)</label>
            <div class="subtask-input-row">
              <input
                type="text"
                class="subtask-field"
                placeholder="Type a subtask step and press Enter or Add..."
                [value]="pendingSubtask()"
                (input)="onPendingSubtaskInput($event)"
                (keydown.enter)="addPendingSubtask($event)"
              />
              <button
                type="button"
                class="btn-add-subtask"
                (click)="addPendingSubtask($event)"
                [disabled]="!pendingSubtask().trim()"
              >
                + Add Step
              </button>
            </div>

            @if (subtasks().length > 0) {
              <ul class="subtask-chips-list">
                @for (st of subtasks(); track $index) {
                  <li class="subtask-chip">
                    <span class="subtask-bullet">&bull;</span>
                    <span class="subtask-chip-text">{{ st }}</span>
                    <button
                      type="button"
                      class="btn-remove-subtask"
                      (click)="removeSubtask($index)"
                      title="Remove step"
                    >
                      &times;
                    </button>
                  </li>
                }
              </ul>
            }
          </div>

          <div class="expanded-footer">
            <button type="button" class="btn-cancel" (click)="collapse()">
              Close Options
            </button>
          </div>
        </div>
      }
    </div>
  `,
  styles: [`
    .input-card {
      background: rgba(30, 41, 59, 0.75);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 14px;
      padding: 0.65rem 0.85rem;
      margin-bottom: 1.5rem;
      box-shadow: 0 8px 24px -4px rgba(0, 0, 0, 0.35);
      backdrop-filter: blur(12px);
      transition: all 0.25s ease;
    }

    .input-card:focus-within {
      border-color: rgba(99, 102, 241, 0.5);
      box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.15), 0 8px 24px -4px rgba(0, 0, 0, 0.4);
    }

    .primary-row {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .input-prefix-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      color: #818cf8;
      flex-shrink: 0;
    }

    .input-prefix-icon svg {
      width: 22px;
      height: 22px;
    }

    .title-input {
      flex: 1;
      background: transparent;
      border: none;
      outline: none;
      font-size: 1rem;
      color: #f8fafc;
      font-weight: 500;
    }

    .title-input::placeholder {
      color: #64748b;
      font-weight: 400;
    }

    .quick-controls {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      flex-shrink: 0;
    }

    .btn-toggle-expand {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 36px;
      height: 36px;
      border-radius: 8px;
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.08);
      color: #94a3b8;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .btn-toggle-expand:hover,
    .btn-toggle-expand.active {
      background: rgba(99, 102, 241, 0.2);
      border-color: rgba(99, 102, 241, 0.4);
      color: #a5b4fc;
    }

    .btn-toggle-expand svg {
      width: 17px;
      height: 17px;
    }

    .btn-submit {
      display: inline-flex;
      align-items: center;
      gap: 0.45rem;
      background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
      color: #ffffff;
      border: none;
      padding: 0.55rem 1rem;
      border-radius: 9px;
      font-size: 0.875rem;
      font-weight: 600;
      cursor: pointer;
      box-shadow: 0 4px 12px rgba(79, 70, 229, 0.35);
      transition: all 0.2s ease;
    }

    .btn-submit:hover:not(:disabled) {
      background: linear-gradient(135deg, #4f46e5 0%, #4338ca 100%);
      transform: translateY(-1px);
      box-shadow: 0 6px 16px rgba(79, 70, 229, 0.45);
    }

    .btn-submit:disabled {
      opacity: 0.4;
      cursor: not-allowed;
      box-shadow: none;
    }

    .btn-submit svg {
      width: 15px;
      height: 15px;
    }

    .expanded-panel {
      margin-top: 1rem;
      padding-top: 1rem;
      border-top: 1px solid rgba(255, 255, 255, 0.08);
      display: flex;
      flex-direction: column;
      gap: 0.9rem;
      animation: fadeIn 0.2s ease;
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(-4px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .form-group {
      display: flex;
      flex-direction: column;
      gap: 0.35rem;
    }

    .group-label {
      font-size: 0.75rem;
      font-weight: 600;
      color: #94a3b8;
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }

    .desc-input {
      background: rgba(15, 23, 42, 0.6);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 8px;
      padding: 0.6rem 0.75rem;
      color: #e2e8f0;
      font-size: 0.875rem;
      font-family: inherit;
      resize: vertical;
      outline: none;
    }

    .desc-input:focus {
      border-color: rgba(99, 102, 241, 0.5);
    }

    .attributes-grid {
      display: grid;
      grid-template-columns: 1fr 1.6fr 1fr;
      gap: 0.75rem;
    }

    .select-input,
    .date-input {
      background: rgba(15, 23, 42, 0.6);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 8px;
      padding: 0.5rem 0.65rem;
      color: #e2e8f0;
      font-size: 0.825rem;
      outline: none;
      width: 100%;
      height: 38px;
    }

    .select-input option {
      background: #1e293b;
      color: #f8fafc;
    }

    .priority-segmented {
      display: flex;
      background: rgba(15, 23, 42, 0.6);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 8px;
      padding: 2px;
      height: 38px;
    }

    .btn-segment {
      flex: 1;
      background: transparent;
      border: none;
      border-radius: 6px;
      color: #94a3b8;
      font-size: 0.75rem;
      font-weight: 600;
      text-transform: capitalize;
      cursor: pointer;
      transition: all 0.15s ease;
    }

    .btn-segment.selected[data-priority='low'] {
      background: rgba(16, 185, 129, 0.2);
      color: #34d399;
    }

    .btn-segment.selected[data-priority='medium'] {
      background: rgba(59, 130, 246, 0.2);
      color: #60a5fa;
    }

    .btn-segment.selected[data-priority='high'] {
      background: rgba(245, 158, 11, 0.2);
      color: #fbbf24;
    }

    .btn-segment.selected[data-priority='urgent'] {
      background: rgba(239, 68, 68, 0.25);
      color: #f87171;
    }

    .subtask-input-row {
      display: flex;
      gap: 0.5rem;
    }

    .subtask-field {
      flex: 1;
      background: rgba(15, 23, 42, 0.6);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 8px;
      padding: 0.45rem 0.65rem;
      color: #e2e8f0;
      font-size: 0.825rem;
      outline: none;
    }

    .subtask-field:focus {
      border-color: rgba(99, 102, 241, 0.5);
    }

    .btn-add-subtask {
      background: rgba(255, 255, 255, 0.08);
      border: 1px solid rgba(255, 255, 255, 0.12);
      color: #e2e8f0;
      border-radius: 8px;
      padding: 0 0.85rem;
      font-size: 0.775rem;
      font-weight: 500;
      cursor: pointer;
      white-space: nowrap;
    }

    .btn-add-subtask:disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }

    .subtask-chips-list {
      display: flex;
      flex-wrap: wrap;
      gap: 0.4rem;
      list-style: none;
      padding: 0;
      margin: 0.35rem 0 0 0;
    }

    .subtask-chip {
      display: inline-flex;
      align-items: center;
      gap: 0.4rem;
      background: rgba(99, 102, 241, 0.12);
      border: 1px solid rgba(99, 102, 241, 0.25);
      color: #c7d2fe;
      padding: 0.25rem 0.55rem;
      border-radius: 6px;
      font-size: 0.775rem;
    }

    .subtask-bullet {
      color: #818cf8;
    }

    .btn-remove-subtask {
      background: transparent;
      border: none;
      color: #94a3b8;
      cursor: pointer;
      font-size: 1rem;
      line-height: 1;
      padding: 0;
    }

    .btn-remove-subtask:hover {
      color: #f87171;
    }

    .expanded-footer {
      display: flex;
      justify-content: flex-end;
      padding-top: 0.4rem;
    }

    .btn-cancel {
      background: transparent;
      border: none;
      color: #94a3b8;
      font-size: 0.775rem;
      cursor: pointer;
      padding: 0.25rem 0.5rem;
    }

    .btn-cancel:hover {
      color: #e2e8f0;
      text-decoration: underline;
    }

    @media (max-width: 640px) {
      .btn-submit .btn-text {
        display: none;
      }
      .attributes-grid {
        grid-template-columns: 1fr;
      }
    }
  `],
})
export class TodoInputComponent {
  private readonly todoService = inject(TodoService);

  readonly title = signal('');
  readonly description = signal('');
  readonly category = signal<Category>('General');
  readonly priority = signal<Priority>('medium');
  readonly dueDate = signal('');
  readonly subtasks = signal<string[]>([]);
  readonly pendingSubtask = signal('');
  readonly isExpanded = signal(false);

  readonly categories = this.todoService.categories;
  readonly priorities: Priority[] = ['low', 'medium', 'high', 'urgent'];

  onTitleInput(e: Event): void {
    this.title.set((e.target as HTMLInputElement).value);
  }

  onDescriptionInput(e: Event): void {
    this.description.set((e.target as HTMLTextAreaElement).value);
  }

  onCategoryChange(e: Event): void {
    this.category.set((e.target as HTMLSelectElement).value as Category);
  }

  setPriority(p: Priority): void {
    this.priority.set(p);
  }

  onDueDateChange(e: Event): void {
    this.dueDate.set((e.target as HTMLInputElement).value);
  }

  onPendingSubtaskInput(e: Event): void {
    this.pendingSubtask.set((e.target as HTMLInputElement).value);
  }

  addPendingSubtask(e?: Event): void {
    if (e) e.preventDefault();
    const val = this.pendingSubtask().trim();
    if (!val) return;

    this.subtasks.update((list) => [...list, val]);
    this.pendingSubtask.set('');
  }

  removeSubtask(index: number): void {
    this.subtasks.update((list) => list.filter((_, i) => i !== index));
  }

  toggleExpanded(): void {
    this.isExpanded.update((v) => !v);
  }

  collapse(): void {
    this.isExpanded.set(false);
  }

  onSubmit(e: Event): void {
    e.preventDefault();
    const t = this.title().trim();
    if (!t) return;

    const dto: CreateTodoDto = {
      title: t,
      description: this.description().trim() || undefined,
      category: this.category(),
      priority: this.priority(),
      dueDate: this.dueDate() || undefined,
      subtasks: this.subtasks(),
    };

    this.todoService.addTodo(dto);

    // Reset inputs
    this.title.set('');
    this.description.set('');
    this.dueDate.set('');
    this.subtasks.set([]);
    this.pendingSubtask.set('');
    this.category.set('General');
    this.priority.set('medium');
    this.isExpanded.set(false);
  }
}

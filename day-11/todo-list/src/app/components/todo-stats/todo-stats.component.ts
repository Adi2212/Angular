import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-todo-stats',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="stats-container" aria-label="Task progress and statistics">
      <!-- Overall Progress Card -->
      <div class="progress-card">
        <div class="progress-header">
          <div class="progress-title-wrap">
            <span class="progress-label">Productivity Velocity</span>
            <span class="progress-percentage">{{ stats().completionRate }}%</span>
          </div>
          <div class="progress-sub">
            {{ stats().completed }} of {{ stats().total }} tasks completed
          </div>
        </div>

        <div class="progress-track" role="progressbar" [attr.aria-valuenow]="stats().completionRate" aria-valuemin="0" aria-valuemax="100">
          <div
            class="progress-fill"
            [style.width.%]="stats().completionRate"
            [class.progress-complete]="stats().completionRate === 100"
          ></div>
        </div>
      </div>

      <!-- Quick Metrics Grid -->
      <div class="metrics-grid">
        <div class="metric-card">
          <div class="metric-icon total-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="3" width="7" height="7" rx="1" />
              <rect x="14" y="3" width="7" height="7" rx="1" />
              <rect x="14" y="14" width="7" height="7" rx="1" />
              <rect x="3" y="14" width="7" height="7" rx="1" />
            </svg>
          </div>
          <div class="metric-info">
            <span class="metric-value">{{ stats().total }}</span>
            <span class="metric-label">Total</span>
          </div>
        </div>

        <div class="metric-card">
          <div class="metric-icon active-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
          </div>
          <div class="metric-info">
            <span class="metric-value">{{ stats().active }}</span>
            <span class="metric-label">In Progress</span>
          </div>
        </div>

        <div class="metric-card">
          <div class="metric-icon completed-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
          </div>
          <div class="metric-info">
            <span class="metric-value">{{ stats().completed }}</span>
            <span class="metric-label">Done</span>
          </div>
        </div>

        <div class="metric-card" [class.metric-alert]="stats().overdue > 0">
          <div class="metric-icon overdue-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
              <line x1="12" y1="9" x2="12" y2="13" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
          </div>
          <div class="metric-info">
            <span class="metric-value">{{ stats().overdue }}</span>
            <span class="metric-label">Overdue</span>
          </div>
        </div>
      </div>

      <!-- Batch Actions Bar -->
      <div class="batch-actions">
        <button
          type="button"
          class="btn-batch"
          (click)="onMarkAllComplete()"
          [disabled]="stats().active === 0"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="20 6 9 17 4 12" />
          </svg>
          <span>Mark All Done</span>
        </button>

        <button
          type="button"
          class="btn-batch btn-batch-danger"
          (click)="onClearCompleted()"
          [disabled]="stats().completed === 0"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="3 6 5 6 21 6" />
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
          </svg>
          <span>Clear Completed ({{ stats().completed }})</span>
        </button>
      </div>
    </section>
  `,
  styles: [`
    .stats-container {
      margin-bottom: 1.5rem;
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .progress-card {
      background: linear-gradient(135deg, rgba(30, 41, 59, 0.7) 0%, rgba(15, 23, 42, 0.8) 100%);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 14px;
      padding: 1.1rem 1.25rem;
      box-shadow: 0 4px 20px -2px rgba(0, 0, 0, 0.25);
    }

    .progress-header {
      display: flex;
      align-items: baseline;
      justify-content: space-between;
      margin-bottom: 0.65rem;
    }

    .progress-title-wrap {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .progress-label {
      font-size: 0.875rem;
      font-weight: 600;
      color: #f1f5f9;
      letter-spacing: -0.01em;
    }

    .progress-percentage {
      font-size: 1rem;
      font-weight: 700;
      color: #818cf8;
    }

    .progress-sub {
      font-size: 0.775rem;
      color: #94a3b8;
    }

    .progress-track {
      width: 100%;
      height: 8px;
      background: rgba(255, 255, 255, 0.08);
      border-radius: 9999px;
      overflow: hidden;
      position: relative;
    }

    .progress-fill {
      height: 100%;
      background: linear-gradient(90deg, #6366f1 0%, #a855f7 70%, #ec4899 100%);
      border-radius: 9999px;
      transition: width 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .progress-fill.progress-complete {
      background: linear-gradient(90deg, #10b981 0%, #059669 100%);
    }

    .metrics-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 0.75rem;
    }

    .metric-card {
      display: flex;
      align-items: center;
      gap: 0.85rem;
      background: rgba(30, 41, 59, 0.5);
      border: 1px solid rgba(255, 255, 255, 0.06);
      border-radius: 12px;
      padding: 0.85rem 1rem;
      transition: all 0.2s ease;
    }

    .metric-card:hover {
      background: rgba(30, 41, 59, 0.75);
      border-color: rgba(255, 255, 255, 0.12);
      transform: translateY(-1px);
    }

    .metric-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 36px;
      height: 36px;
      border-radius: 10px;
    }

    .metric-icon svg {
      width: 18px;
      height: 18px;
    }

    .total-icon {
      background: rgba(99, 102, 241, 0.15);
      color: #818cf8;
    }

    .active-icon {
      background: rgba(245, 158, 11, 0.15);
      color: #fbbf24;
    }

    .completed-icon {
      background: rgba(16, 185, 129, 0.15);
      color: #34d399;
    }

    .overdue-icon {
      background: rgba(239, 68, 68, 0.15);
      color: #f87171;
    }

    .metric-alert {
      border-color: rgba(239, 68, 68, 0.3);
      background: rgba(239, 68, 68, 0.05);
    }

    .metric-info {
      display: flex;
      flex-direction: column;
    }

    .metric-value {
      font-size: 1.25rem;
      font-weight: 700;
      color: #f8fafc;
      line-height: 1.1;
    }

    .metric-label {
      font-size: 0.725rem;
      color: #94a3b8;
      text-transform: uppercase;
      letter-spacing: 0.03em;
      margin-top: 0.15rem;
    }

    .batch-actions {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: 0.6rem;
    }

    .btn-batch {
      display: inline-flex;
      align-items: center;
      gap: 0.4rem;
      background: transparent;
      border: 1px solid rgba(255, 255, 255, 0.08);
      color: #cbd5e1;
      padding: 0.35rem 0.7rem;
      border-radius: 7px;
      font-size: 0.775rem;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .btn-batch:hover:not(:disabled) {
      background: rgba(255, 255, 255, 0.06);
      color: #ffffff;
      border-color: rgba(255, 255, 255, 0.18);
    }

    .btn-batch:disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }

    .btn-batch svg {
      width: 14px;
      height: 14px;
    }

    .btn-batch-danger:hover:not(:disabled) {
      background: rgba(239, 68, 68, 0.12);
      color: #f87171;
      border-color: rgba(239, 68, 68, 0.25);
    }

    @media (max-width: 640px) {
      .metrics-grid {
        grid-template-columns: repeat(2, 1fr);
      }
      .batch-actions {
        justify-content: stretch;
      }
      .btn-batch {
        flex: 1;
        justify-content: center;
      }
    }
  `],
})
export class TodoStatsComponent {
  private readonly todoService = inject(TodoService);

  readonly stats = this.todoService.stats;

  onMarkAllComplete(): void {
    this.todoService.markAllCompleted();
  }

  onClearCompleted(): void {
    this.todoService.clearCompleted();
  }
}

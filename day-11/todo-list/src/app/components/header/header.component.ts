import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <header class="app-header">
      <div class="brand">
        <div class="logo-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M9 11l3 3L22 4" />
            <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
          </svg>
        </div>
        <div class="brand-text">
          <div class="brand-title-row">
            <h1>TaskPulse</h1>
            <span class="badge-version">v21</span>
          </div>
          <p class="brand-subtitle">{{ formattedDate() }} &bull; Modern Reactive Task Workspace</p>
        </div>
      </div>

      <div class="header-actions">
        <button
          type="button"
          class="btn-ghost"
          (click)="onExport()"
          title="Backup & Export Tasks to JSON"
          aria-label="Export Tasks to JSON"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          <span class="btn-text">Export</span>
        </button>

        <label class="btn-ghost file-input-label" title="Import Tasks from JSON" aria-label="Import Tasks from JSON">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="17 8 12 3 7 8" />
            <line x1="12" y1="3" x2="12" y2="15" />
          </svg>
          <span class="btn-text">Import</span>
          <input type="file" accept=".json" (change)="onFileImport($event)" class="visually-hidden" />
        </label>

        <button
          type="button"
          class="btn-ghost btn-danger-ghost"
          (click)="onReset()"
          title="Reset tasks to initial sample showcase data"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="1 4 1 10 7 10" />
            <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
          </svg>
          <span class="btn-text">Reset Demo</span>
        </button>
      </div>
    </header>
  `,
  styles: [`
    .app-header {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;
      padding: 1.5rem 0 1.25rem 0;
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      margin-bottom: 1.75rem;
    }

    .brand {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .logo-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 44px;
      height: 44px;
      border-radius: 12px;
      background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%);
      color: #ffffff;
      box-shadow: 0 8px 20px -4px rgba(99, 102, 241, 0.5);
    }

    .logo-icon svg {
      width: 24px;
      height: 24px;
    }

    .brand-title-row {
      display: flex;
      align-items: center;
      gap: 0.6rem;
    }

    .brand-title-row h1 {
      font-size: 1.5rem;
      font-weight: 700;
      letter-spacing: -0.025em;
      margin: 0;
      color: #f8fafc;
      background: linear-gradient(to right, #ffffff, #cbd5e1);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .badge-version {
      font-size: 0.7rem;
      font-weight: 600;
      padding: 0.15rem 0.5rem;
      border-radius: 9999px;
      background: rgba(99, 102, 241, 0.18);
      color: #a5b4fc;
      border: 1px solid rgba(99, 102, 241, 0.35);
    }

    .brand-subtitle {
      font-size: 0.8125rem;
      color: #94a3b8;
      margin: 0.2rem 0 0 0;
    }

    .header-actions {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .btn-ghost {
      display: inline-flex;
      align-items: center;
      gap: 0.4rem;
      padding: 0.45rem 0.8rem;
      border-radius: 8px;
      font-size: 0.8125rem;
      font-weight: 500;
      color: #cbd5e1;
      background: rgba(255, 255, 255, 0.04);
      border: 1px solid rgba(255, 255, 255, 0.08);
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .btn-ghost:hover {
      background: rgba(255, 255, 255, 0.08);
      color: #ffffff;
      border-color: rgba(255, 255, 255, 0.18);
      transform: translateY(-1px);
    }

    .btn-ghost svg {
      width: 15px;
      height: 15px;
    }

    .file-input-label {
      position: relative;
      cursor: pointer;
    }

    .visually-hidden {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      border: 0;
    }

    .btn-danger-ghost:hover {
      color: #fca5a5;
      background: rgba(239, 68, 68, 0.12);
      border-color: rgba(239, 68, 68, 0.3);
    }

    @media (max-width: 640px) {
      .btn-text {
        display: none;
      }
      .brand-subtitle {
        font-size: 0.75rem;
      }
    }
  `],
})
export class HeaderComponent {
  private readonly todoService = inject(TodoService);

  readonly formattedDate = signal(
    new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      month: 'short',
      day: 'numeric',
    }).format(new Date())
  );

  onExport(): void {
    this.todoService.exportData();
  }

  onReset(): void {
    if (confirm('Reset todos to the initial demo showcase dataset?')) {
      this.todoService.resetToDemo();
    }
  }

  onFileImport(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;

    const file = input.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const json = JSON.parse(e.target?.result as string);
        if (Array.isArray(json)) {
          this.todoService.importData(json);
        } else {
          alert('Invalid JSON format: expected an array of tasks.');
        }
      } catch {
        alert('Could not parse JSON file.');
      }
      input.value = '';
    };
    reader.readAsText(file);
  }
}

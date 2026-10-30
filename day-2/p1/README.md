# Day 2: Angular Services, Modern Dependency Injection (`inject()`), Base Card (`<ng-content>`) & Dark/Light Theme Toggle

This project extends the **EasyTask Dashboard** built in Day 1 by decoupling state management and business logic into dedicated services (`TasksService` and `ThemeService`), leveraging Angular's modern `inject()` dependency injection function, introducing a reusable base card component (`CardComponent`) with content projection (`<ng-content>`), and providing a fully responsive **Dark & Light theme toggle** with custom Sun and Moon SVG icons.

---

## 📋 Overview of Features & Changes in Day 2

1. **Dedicated Task Service (`TasksService`)**:
   - Centralized task management (add, get, get-by-user, remove).
   - LocalStorage synchronization with fallback dummy data.
2. **Modern Dependency Injection with `inject()`**:
   - Eliminated constructor parameter injection across all components and services.
   - Removed prop drilling from `App` to child components.
3. **Base Card Component (`CardComponent`)**:
   - Content projection using `<ng-content></ng-content>`.
   - Encapsulated border, shadow, background, and hover elevation styling.
4. **Dark and Light Theme Toggle**:
   - **`ThemeService`**: Angular service managing theme state via Signals (`signal<boolean>`), persisting preferences in `localStorage`, and detecting system OS color scheme preferences.
   - **Interactive Switcher**: Smooth sliding toggle track containing Sun ☀️ and Moon 🌙 SVG icons with active glow effects and status badge.
   - **Comprehensive Dark Theme**: Cohesive dark palette for page background, headers, sidebars, cards, modals, form inputs, badges, and buttons.
5. **Comprehensive Vitest Suite**:
   - 17 unit tests covering `App`, `TasksService`, `ThemeService`, `HeaderComponent`, and `CardComponent`.

---

## 🏗️ Architecture & Component Updates

### 1. Dedicated Task Service (`src/app/tasks/tasks.service.ts`)
Created `@Injectable({ providedIn: 'root' })` service providing:
- **`getTasks(): Task[]`**: Returns all tasks in memory.
- **`getUserTasks(userId: string): Task[]`**: Filters and returns tasks assigned to a specific user.
- **`getTaskById(taskId: string): Task | undefined`**: Finds a specific task by its unique ID.
- **`addTask(taskData: NewTaskPayload | Task, userId?: string): Task`**: Creates and prepends a new task, assigns auto/custom IDs, and persists changes.
- **`removeTask(taskId: string): void`**: Removes a task by ID and updates storage.
- **`localStorage` Synchronization**: Automatically synchronizes state changes with browser storage.

---

### 2. Dark & Light Theme System

#### **`ThemeService`** (`src/app/theme.service.ts`)
- Manages theme mode using Angular Signals: `readonly isDarkMode = signal<boolean>(false)`.
- `toggleTheme()`: Inverts theme mode.
- `setDarkMode(isDark: boolean)`: Applies `dark-theme` class to `document.body` and `data-theme="dark"` attribute to `<html>`.
- Persists user selection to `localStorage` (`easytask_theme`).
- Automatically detects OS preference (`prefers-color-scheme: dark`) when first visited.

#### **Sun & Moon Header Toggle** (`src/app/header/header.component.html`)
- Positioned in the header navigation next to the workspace badge.
- Interactive toggle track with animated sliding thumb indicator.
- Features custom SVG icons:
  - **Sun Icon**: Highlights bright gold in light mode.
  - **Moon Icon**: Highlights soft indigo/lavender in dark mode.
- Includes dynamic text badge ("Light" / "Dark") and accessible ARIA attributes.

---

### 3. Base Card Component with Content Projection (`shared/card`)

A reusable presentation component providing base visual design for cards throughout the application:
- **Selector**: `<app-card>`
- **Content Projection**: Uses `<ng-content></ng-content>` to project any arbitrary markup inside the styled card container.
- **Card Styling**: Rounded corners (`border-radius: 12px`), subtle border (`#e2e8f0`), clean shadow (`box-shadow`), padding, and hover elevation effect.

#### Usage in `TaskComponent` (`src/app/tasks/task/task.component.html`):
```html
<app-card>
  <div class="task-header">
    <div class="task-title-group">
      <span class="task-id-badge">#{{ task.id }}</span>
      <h3>{{ task.title }}</h3>
    </div>
    <span class="task-user-tag">User: {{ task.userId }}</span>
  </div>

  <p class="task-summary">{{ task.summary }}</p>

  <div class="task-footer">
    <div class="due-date">...</div>
    <button type="button" class="complete-btn" (click)="onCompleteTask()">Complete</button>
  </div>
</app-card>
```

---

## 📁 Day 2 Directory Structure

```
day-2/
├── public/
│   └── avatars/                 # Team member avatar assets
├── src/
│   ├── app/
│   │   ├── header/              # Header brand navigation & Theme Toggle
│   │   │   ├── header.component.ts
│   │   │   ├── header.component.html  # Sun and Moon icon toggle
│   │   │   └── header.component.css
│   │   ├── user/                # Sidebar user selection component
│   │   ├── shared/card/         # Base Card component with <ng-content>
│   │   │   ├── card.component.ts
│   │   │   ├── card.component.html
│   │   │   ├── card.component.css
│   │   │   └── index.ts
│   │   ├── shered/card/         # Compatibility alias
│   │   ├── tasks/               # Tasks feature module
│   │   │   ├── tasks.service.ts # Centralized Task Service
│   │   │   ├── tasks.component.ts # Uses inject(TasksService)
│   │   │   ├── tasks.component.html
│   │   │   ├── tasks.component.css
│   │   │   ├── task/            # Task card wrapped in <app-card>
│   │   │   │   ├── task.component.ts
│   │   │   │   ├── task.component.html
│   │   │   │   └── task.component.css
│   │   │   └── new-task/        # Task creation dialog with inject(TasksService)
│   │   ├── theme.service.ts     # Theme Service with Signals & localStorage
│   │   ├── models/              # Task and User TypeScript interfaces
│   │   ├── dummy-data.ts        # Fallback dummy data
│   │   ├── app.ts               # Cleaned root component with inject(TasksService)
│   │   ├── app.html             # Simplified template without prop-drilling
│   │   └── app.css
│   ├── index.html
│   ├── main.ts
│   └── styles.css               # Global theme tokens & dark-theme classes
├── angular.json                 # Configured for day-2 project targets
├── package.json                 # Project named "day-2"
├── tsconfig.json
└── README.md                    # Day 2 documentation
```

---

## 🚀 Running Day 2

### Development Server
```bash
cd day-2
npm start
```
Open `http://localhost:4300/` in your browser (configured for port 4300 to run concurrently with Day 1).

### Building
```bash
cd day-2
npm run build
```
Production build bundles will be emitted to `day-2/dist/day-2`.

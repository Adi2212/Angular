# 📋 TaskPulse — Modern Reactive Todo Workspace (Day 11)

A responsive, high-performance task management workspace built with **Angular 21** showcasing the latest reactive primitives: Signals, `computed()` selectors, `effect()` synchronization, `OnPush` change detection, standalone components, native `@if`/`@for` control flow, and persistent `localStorage` with JSON export/import.

---

## 🚀 Key Highlights & Architecture

- **Framework:** Angular 21 (`@angular/core: ^21.2.0`)
- **State Management:** Reactive Signals (`signal`, `computed`, `effect`) in `TodoService`
- **Change Detection:** `ChangeDetectionStrategy.OnPush` across 100% of components
- **Component Model:** Standalone components (omitting `standalone: true` per Angular v21 standards)
- **Dependency Injection:** Modern `inject()` API
- **Control Flow:** Native `@if`, `@for ... track`, `@empty`, `@switch`
- **Component Inputs:** Modern functional `input.required<Todo>()`
- **Styling:** Custom dark glassmorphism design tokens, CSS variables, glowing card borders, and smooth transitions (no `ngClass`/`ngStyle`)
- **Persistence & Portability:** Automated `localStorage` sync via `effect()`, sample seed dataset with reset option, and 1-click JSON Export / Import
- **Accessibility:** WCAG AA compliant contrast, custom checkboxes with `role="checkbox"` and `aria-checked`, full keyboard navigation (`[Enter]` to submit, `[Esc]` to cancel)

---

## 🗂️ Component & Architecture Breakdown

```
src/app/
├── models/
│   └── todo.model.ts              # Todo, SubTask, Priority, Category, FilterOption types
├── services/
│   ├── todo.service.ts            # Signal store: CRUD, filters, sorting, computed stats & effects
│   └── storage.service.ts         # LocalStorage sync, seed data, and JSON export/import
├── components/
│   ├── header/                    # App brand, live date, export/import buttons & reset demo
│   ├── todo-stats/                # Productivity progress bar, total/pending/done/overdue counters & batch actions
│   ├── todo-input/                # Quick add bar + expandable advanced panel (priority, category, due date, subtasks)
│   ├── todo-filters/              # Real-time search, status tabs, category chips, priority pills, and sorting
│   ├── todo-list/                 # Reactive list container with @for track and dynamic @empty states
│   └── todo-item/                 # Task item with inline double-click editing, subtask checklist & badges
├── app.component.ts               # Root component orchestrating layout
├── app.component.html
├── app.component.css
├── app.config.ts                  # Application configuration & router
└── styles.css                     # Global design tokens & reset
```

---

## 🛠️ Features Showcase

### 1. Advanced Task Management (CRUD)
- Add tasks instantly with `[Enter]`.
- Inline double-click title editing with `[Enter]` to save and `[Esc]` to cancel.
- Categorize by `Work`, `Personal`, `Study`, `Health`, `Finance`, or `General`.
- Priority levels: `Urgent` (🔴), `High` (🟠), `Medium` (🔵), `Low` (🟢).
- Due date tracking with automatic **Overdue** alerts for late tasks.

### 2. Subtasks & Checklists
- Break tasks down into steps directly within the task item or during creation.
- Check off subtasks with mini check controls.
- Dynamic completion tracker (`2/3 steps done`).

### 3. Multi-Faceted Filtering & Search
- Instant real-time search across titles, descriptions, and subtasks.
- Status filters: `All`, `Active`, `Done`, and `Overdue`.
- Category filter chips and priority filter chips.
- Sort by `Due Date`, `Priority (High -> Low)`, `Newest First`, and `Title (A-Z)`.

### 4. Productivity Velocity & Batch Actions
- Live completion percentage meter with visual progress bar.
- Batch "Mark All Done" and "Clear Completed" actions.
- 1-click "Reset Demo" button to instantly restore sample tasks.

---

## 🏃 Running the Application

### Start Development Server:
```bash
cd day-11/todo-list
npm start
```
Navigate to [http://localhost:4200/](http://localhost:4200/) in your browser.

### Build Production Bundle:
```bash
npm run build
```

### Run Unit Tests:
```bash
npm test
```

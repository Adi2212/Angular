# Angular Projects & Exercises

A repository dedicated to Angular learning, hands-on architectural patterns, modern reactive paradigms, and daily projects.

---

## 🗂️ Repository Structure

```
Angular/
├── day-1/                     # Day 1: EasyTask Dashboard (Component State & Inputs/Outputs)
│   ├── public/
│   │   └── avatars/           # Local SVG team avatars
│   ├── src/
│   │   ├── app/
│   │   │   ├── header/        # Header brand & navigation
│   │   │   ├── user/          # Sidebar user list & active state selection
│   │   │   ├── tasks/         # Main article area & task management
│   │   │   │   ├── task/      # Task card component with completion action
│   │   │   │   └── new-task/  # Modal popup form for creating tasks
│   │   │   ├── models/        # TypeScript interfaces for User & Task
│   │   │   ├── dummy-data.ts  # In-memory local data arrays
│   │   │   ├── app.ts         # Root component
│   │   │   ├── app.html       # 3-part layout (Header + Sidebar + Article)
│   │   │   └── app.css        # Responsive styling
│   │   ├── index.html
│   │   ├── main.ts
│   │   └── styles.css
│   ├── angular.json
│   ├── package.json
│   └── tsconfig.json
├── day-2/
│   ├── p1/                    # Day 2 - Project 1: EasyTask Refactored (TasksService, inject() DI & Card Projection)
│   │   ├── public/
│   │   │   └── avatars/
│   │   ├── src/
│   │   │   ├── app/
│   │   │   │   ├── header/
│   │   │   │   ├── user/
│   │   │   │   ├── shared/card/       # CardComponent with <ng-content>
│   │   │   │   ├── tasks/
│   │   │   │   │   ├── tasks.service.ts   # Central TasksService with inject()
│   │   │   │   │   ├── tasks.component.ts
│   │   │   │   │   ├── task/
│   │   │   │   │   └── new-task/
│   │   │   │   ├── models/
│   │   │   │   ├── theme.service.ts       # Signal-based theme manager
│   │   │   │   ├── app.ts
│   │   │   │   ├── app.html
│   │   │   │   └── app.css
│   │   ├── angular.json
│   │   ├── package.json
│   │   └── README.md
│   └── p2/                    # Day 2 - Project 2: Investment Calculator (Signals, Forms & Currency Formatting)
│       ├── public/
│       │   └── investment-calculator-logo.png
│       ├── src/
│       │   ├── app/
│       │   │   ├── header/                # Header branding & logo
│       │   │   ├── user-input/            # 2-way data-bound calculation form
│       │   │   ├── investment-results/    # Dynamic results table with CurrencyPipe
│       │   │   ├── investment.model.ts    # InvestmentInput & InvestmentResult types
│       │   │   ├── investment.service.ts  # Signal-backed InvestmentService
│       │   │   ├── app.component.css      # Page layout styling
│       │   │   ├── app.component.ts
│       │   │   └── app.component.html
│       │   ├── investment-results.ts      # Core calculation logic
│       │   └── styles.css                 # Dark emerald design system & variables
│       ├── angular.json
│       ├── package.json
│       └── README.md
├── .gitignore
└── README.md
```

---

## 🚀 Projects Overview

| Directory | Project | Main Concepts | Default Port |
| :--- | :--- | :--- | :---: |
| [`day-1/`](./day-1) | **EasyTask Dashboard** | `@Input()`, `@Output()`, EventEmitter, local data arrays | **4200** |
| [`day-2/p1/`](./day-2/p1) | **EasyTask Refactored** | `TasksService`, `inject()`, `<ng-content>`, `ThemeService` (Signals) | **4300** |
| [`day-2/p2/`](./day-2/p2) | **Investment Calculator** | Signals (`signal`, `computed`), `inject()`, `[(ngModel)]`, `CurrencyPipe`, Dark Glassmorphism UI | **4400** |

---

### Day 1: EasyTask Management App
A responsive task manager and team assignment dashboard featuring:
- **Modern Layout**: Responsive layout with top Header, Sidebar navigation, and main Article workspace.
- **Sidebar User Component**: Displays team members storing `id`, `name`, and `avatar`. Highlights active member on selection.
- **Tasks Article**: Shows `<User Name>'s Tasks`, pending tasks count, and an `+ Add Task` trigger.
- **Add Task Popup Form**: Modal dialog overlay supporting `task id`, `userid`, `title`, `summary`, and `duedate`.
- **Local Arrays**: In-memory data arrays passed via `@Input()` and `@Output()`.

#### Running Day 1 (Port 4200):
```bash
cd day-1
npm start
```
Navigate to: [http://localhost:4200/](http://localhost:4200/)

---

### Day 2 - Project 1 (`day-2/p1`): TasksService, DI (`inject()`), Base Card & Theme Toggle
Refactored Day 1 architecture into a scalable service-driven design:
- **Centralized `TasksService`**:
  - `getTasks()`, `getUserTasks(userId)`, `getTaskById(taskId)`, `addTask(taskData, userId)`, `removeTask(taskId)`.
  - `localStorage` synchronization with graceful in-memory fallback.
- **Base Card Component (`CardComponent`)**:
  - Encapsulated reusable card layout with content projection (`<ng-content>`).
- **Dark & Light Theme Toggle**:
  - `ThemeService` with Angular Signals & `localStorage` persistence.
  - Interactive Sun ☀️ & Moon 🌙 toggle button in the header.
  - Full dark-mode styles across headers, sidebars, cards, modals, and forms.
- **Modern `inject()` API**:
  - Replaced constructor injection with Angular's `inject()`.
- **Zero Prop-Drilling**:
  - `app.html` no longer drills `[tasks]` or event listeners for task mutations.

#### Running Day 2 - Project 1 (Port 4300):
```bash
cd day-2/p1
npm start
```
Navigate to: [http://localhost:4300/](http://localhost:4300/)

---

### Day 2 - Project 2 (`day-2/p2`): Investment Calculator
A financial investment return calculator demonstrating modern Angular 18 patterns:
- **Signal-backed Service (`InvestmentService`)**:
  - Encapsulates investment projection calculations (`calculateInvestmentResults`).
  - Stores annual data in `resultsData = signal<InvestmentResult[] | undefined>(undefined)`.
- **Modern Dependency Injection**:
  - Injects `InvestmentService` using `inject(InvestmentService)`.
- **Template-driven Two-Way Binding**:
  - Uses `[(ngModel)]` for `initialInvestment`, `annualInvestment`, `expectedReturn`, and `duration`.
- **Computed Results Display**:
  - Dynamic table displaying Year, Investment Value, Interest (Year), Total Interest, and Total Invested Capital.
  - Formatted figures using Angular's `CurrencyPipe`.
- **Zero-State Fallback**:
  - Displays a modern empty-state card when no calculation has been run yet.
- **Modern Dark Emerald Glassmorphic UI**:
  - Unified design tokens, responsive cards, glowing effects, and clean tabular typography.

#### Running Day 2 - Project 2 (Port 4400):
```bash
cd day-2/p2
npm start
```
Navigate to: [http://localhost:4400/](http://localhost:4400/)

---

## 🚀 Running All Three Projects Simultaneously

Open three separate terminal windows:

**Terminal 1 (Day 1 - Port 4200):**
```bash
cd day-1
npm start
```

**Terminal 2 (Day 2 / p1 - Port 4300):**
```bash
cd day-2/p1
npm start
```

**Terminal 3 (Day 2 / p2 - Port 4400):**
```bash
cd day-2/p2
npm start
```

All three apps run side by side without any port collisions!

---

## 🛠️ Build All Projects

```bash
# Day 1
cd day-1
npm run build

# Day 2 / p1
cd ../day-2/p1
npm run build

# Day 2 / p2
cd ../p2
npm run build
```

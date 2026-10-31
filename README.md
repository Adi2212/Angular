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
├── day-3/
│   ├── p1/                    # Day 3 - Project 1: EasyTask Debugging (Standalone Components, Signals & Services)
│   │   ├── public/
│   │   │   └── favicon.ico
│   │   ├── src/
│   │   │   ├── app/
│   │   │   │   ├── header/                # App brand header
│   │   │   │   ├── user/                  # Team member selection sidebar
│   │   │   │   ├── shared/card/           # Reusable card component
│   │   │   │   ├── tasks/                 # Task management container
│   │   │   │   │   ├── new-task/          # Add task modal dialog
│   │   │   │   │   ├── task/              # Task card item component
│   │   │   │   │   ├── tasks.component.ts # Main tasks view
│   │   │   │   │   └── tasks.service.ts   # Central TasksService
│   │   │   │   ├── dummy-users.ts         # Mock team users data
│   │   │   │   ├── app.component.ts       # Root dashboard component
│   │   │   │   ├── app.component.html
│   │   │   │   └── app.component.css
│   │   │   ├── index.html
│   │   │   ├── main.ts
│   │   │   └── styles.css
│   │   ├── angular.json
│   │   ├── package.json
│   │   └── README.md
│   └── p2/                    # Day 3 - Project 2: Components Deep Dive (Dashboard, Server Status, Traffic & Tickets)
│       ├── public/
│       │   ├── globe.png                  # Traffic section icon
│       │   ├── list.png                   # Tickets section icon
│       │   ├── logo.png                   # Header brand logo
│       │   └── status.png                 # Server status icon
│       ├── src/
│       │   ├── app/
│       │   │   ├── dashboard/
│       │   │   │   ├── dashboard-item/    # Reusable dashboard card (`input.required`)
│       │   │   │   ├── server-status/     # Live server pulse monitor component
│       │   │   │   ├── traffic/           # 7-day traffic activity chart component
│       │   │   │   └── tickets/           # Ticket management subsystem
│       │   │   │       ├── new-ticket/    # New ticket form component with validation
│       │   │   │       ├── ticket/        # Individual ticket item component
│       │   │   │       ├── ticket.component.ts # Main tickets list container
│       │   │   │       ├── tickets.service.ts  # In-memory signal-based service (No localStorage)
│       │   │   │       └── ticket.model.ts     # Ticket & NewTicketData models
│       │   │   ├── header/                # Navigation header
│       │   │   ├── app.component.ts       # Root dashboard component
│       │   │   └── app.component.html
│       │   ├── index.html
│       │   ├── main.ts
│       │   └── styles.css
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
| [`day-3/p1/`](./day-3/p1) | **EasyTask Debugging** | Standalone Components, Signal Inputs, Control Flow (`@if`, `@for`), Task Debugging | **4200** |
| [`day-3/p2/`](./day-3/p2) | **Components Deep Dive** | Dashboard Architecture, `input.required`, Signal-based `TicketsService`, Subcomponents (`new-ticket`, `ticket`), Scoped CSS | **4200** |

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

### Day 3 - Project 1 (`day-3/p1`): EasyTask Debugging
An updated task management application focusing on Angular 18 code diagnostics, clean architecture, and debugging practices:
- **Component Decomposition**: Strict single-responsibility components (`Header`, `User`, `Card`, `Tasks`, `Task`, `NewTask`).
- **Centralized Service Logic**: `TasksService` providing task filtering, addition, removal, and lifecycle management.
- **Modern Angular Control Flow**: Refactored to built-in template syntax (`@if`, `@for`, `track`).
- **Clean Type Safety**: Strongly-typed user models (`user.model.ts`) and task models (`task.model.ts`).

#### Running Day 3 - Project 1:
```bash
cd day-3/p1
npm start
```
Navigate to: [http://localhost:4200/](http://localhost:4200/)

---

### Day 3 - Project 2 (`day-3/p2`): Components & Templates Deep Dive (Dashboard & Tickets)
A comprehensive admin operations dashboard featuring server health monitoring, traffic analytics, and an interactive support ticket system:
- **Reusable Card Architecture (`DashboardItemComponent`)**:
  - Built with modern Angular Signal inputs: `image = input.required<{src: string, alt: string}>()` and `title = input.required<string>()`.
  - Supports flexible child projection for dashboard widgets.
- **Live Server Status (`ServerStatusComponent`)**:
  - Displays system operational state (`online`, `offline`, `unknown`) with pulsing status animations.
- **Traffic Analytics (`TrafficComponent`)**:
  - 7-day traffic chart utilizing linear gradient bars scaled dynamically via template control flow (`@for`).
- **Support Ticket Management System**:
  - **In-Memory `TicketsService`**:
    - Purely in-memory reactive signals (`ticketsSignal`, `tickets.asReadonly()`).
    - **No `localStorage` is used** — instant reactive UI updates.
    - Full CRUD support: `addTicket()`, `closeTicket()`, `markAsCompleted()`, and `toggleTicketStatus()`.
  - **Main Tickets Container (`TicketComponent`)**:
    - Injects `TicketsService` to display all tickets.
    - Shows summary counts (`Total`, `Open`, `Closed`) via component getters.
    - Zero-state fallback card when no tickets exist.
  - **Individual Ticket Card (`TicketItemComponent`)**:
    - Scoped ticket card with `open` (purple accent) and `closed` (neutral accent) states.
    - Expandable details toggle and "Mark as Resolved" action.
  - **New Ticket Form (`NewTicketComponent`)**:
    - Two-way binding with `[(ngModel)]`, form validation, and submit button animation matching project theme.
- **Component-Scoped CSS**:
  - Fully scoped styles using the project's color palette (`#691ebe`, `#6a3cb0`, `#76737a`, `#f8f8f8`).

#### Running Day 3 - Project 2:
```bash
cd day-3/p2
npm start
```
Navigate to: [http://localhost:4200/](http://localhost:4200/)

---

## 🛠️ Build Projects

```bash
# Day 1
cd day-1 && npm run build

# Day 2 / p1
cd ../day-2/p1 && npm run build

# Day 2 / p2
cd ../day-2/p2 && npm run build

# Day 3 / p1
cd ../day-3/p1 && npm run build -- --configuration development

# Day 3 / p2
cd ../day-3/p2 && npm run build -- --configuration development
```

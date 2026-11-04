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
├── day-4/
│   ├── p1/                    # Day 4 - Project 1: Directives Deep Dive (Built-in, Custom Attributes & Structural *appAuth)
│   │   ├── src/
│   │   │   ├── app/
│   │   │   │   ├── components/
│   │   │   │   │   ├── attribute-directives/  # [ngClass], [ngStyle], [(ngModel)]
│   │   │   │   │   ├── structural-directives/ # *ngIf, *ngFor, *ngSwitch, *appRepeat
│   │   │   │   │   ├── safe-links/            # a[appSafeLink] with confirmation & query params
│   │   │   │   │   └── role-auth/             # *appAuth structural role gate
│   │   │   │   ├── directives/                # Custom attribute & structural directives
│   │   │   │   ├── services/                  # AuthService with signal role hierarchy
│   │   │   │   └── header/                    # Interactive header with role switcher
│   │   │   ├── main.ts
│   │   │   └── styles.css
│   │   ├── angular.json
│   │   ├── package.json
│   │   └── README.md
│   └── p2/                    # Day 4 - Project 2: Pipes Deep Dive (Built-in, Custom, Pure vs Impure Lab & AsyncPipe)
│       ├── src/
│       │   ├── app/
│       │   │   ├── components/
│       │   │   │   ├── builtin-pipes/         # Date, Currency, Decimal, Slice, KeyValue, Json
│       │   │   │   ├── custom-pipes/          # Temperature, FileSize, TimeAgo, Filter
│       │   │   │   ├── pure-impure/           # Interactive Pure vs Impure Change Detection Lab
│       │   │   │   └── async-pipe/            # Live RxJS Observable Ticker & Promise
│       │   │   ├── pipes/                     # Pure and impure standalone custom pipes
│       │   │   └── header/                    # Live clock header with DatePipe
│       │   ├── main.ts
│       │   └── styles.css
│       ├── angular.json
│       ├── package.json
│       └── README.md
├── day-5/
│   ├── p1/                    # Day 5 - Project 1: Services Deep Dive (Dependency Injection, Signals & InjectionToken)
│   │   ├── src/
│   │   │   ├── app/
│   │   │   │   ├── tasks/
│   │   │   │   │   ├── new-task/          # Add task component with inject()
│   │   │   │   │   ├── tasks-list/        # Filtered task list with computed()
│   │   │   │   │   │   └── task-item/     # Task item with status update & InjectionToken
│   │   │   │   │   ├── task.model.ts      # Task interfaces & TASK_STATUS_OPTIONS InjectionToken
│   │   │   │   │   ├── task.service.ts    # Encapsulated state (private signal + asReadonly)
│   │   │   │   │   ├── tasks.component.ts
│   │   │   │   │   └── tasks.component.html
│   │   │   │   ├── app.component.ts
│   │   │   │   └── app.component.html
│   │   │   ├── main.ts
│   │   │   └── styles.css
│   │   ├── angular.json
│   │   ├── package.json
│   │   └── README.md
│   └── p2/                    # Day 5 - Project 2: Change Detection Deep Dive (Zone.js, OnPush & Signals)
│       ├── src/
│       │   ├── app/
│       │   │   ├── counter/               # Counter with Zone pollution avoidance (runOutsideAngular)
│       │   │   ├── info-message/          # Static component optimized with OnPush
│       │   │   ├── messages/              # Message subsystem with shared MessagesService
│       │   │   │   ├── messages-list/     # OnPush list consuming signals directly
│       │   │   │   ├── new-message/       # OnPush input form triggering service
│       │   │   │   └── messages.service.ts# Singleton service with signal state
│       │   │   ├── app.component.ts
│       │   │   └── app.component.html
│       │   ├── main.ts
│       │   └── styles.css
│       ├── angular.json
│       ├── package.json
│       └── README.md
├── day-6/
│   ├── p1/                    # Day 6 - Project 1: RxJS Deep Dive (Observables, Operators, Subjects & Signals Interop)
│   │   ├── public/
│   │   │   └── rxjs-logo.png          # RxJS flame brand asset
│   │   ├── src/
│   │   │   ├── app/
│   │   │   │   ├── app.component.ts   # Interactive stream labs, operators, custom observables & interop
│   │   │   │   ├── app.component.html # Dashboard tabs, visual meters & stream activity visualizer
│   │   │   │   └── app.component.css  # Dark purple theme & terminal logs
│   │   │   ├── main.ts
│   │   │   └── styles.css
│   │   ├── angular.json
│   │   ├── package.json
│   │   └── README.md
│   └── p2/                    # Day 6 - Project 2: PlacePicker (HTTP Client & Express Backend)
│       ├── backend/           # Node.js Express REST API server
│       │   ├── data/          # places.json & user-places.json
│       │   ├── images/        # 18 global destination photos
│       │   └── app.js         # REST endpoints (GET, PUT, DELETE) & CORS
│       ├── public/
│       │   └── logo.png       # PlacePicker brand logo
│       ├── src/
│       │   ├── app/
│       │   │   ├── places/    # available-places, user-places, places-container, PlacesService
│       │   │   ├── app.component.ts
│       │   │   ├── app.component.html
│       │   │   └── app.component.css
│       │   ├── main.ts        # provideHttpClient()
│       │   └── styles.css
│       ├── angular.json
│       ├── package.json
│       └── README.md
├── day-7/
│   ├── p1/                    # Day 7 - Project 1: Angular Forms (Template-Driven & Reactive Forms)
│   │   ├── public/
│   │   │   ├── favicon.ico
│   │   │   └── logo.jpg
│   │   ├── src/
│   │   │   ├── app/
│   │   │   │   ├── auth/
│   │   │   │   │   ├── login/         # Template-Driven Form (ngModel, ngForm, template validation)
│   │   │   │   │   └── signup/        # Reactive Form (FormGroup, FormControl, cross-field validators, select, radio, checkbox)
│   │   │   │   ├── app.component.ts   # Form paradigm switcher (Signals)
│   │   │   │   ├── app.component.html
│   │   │   │   └── app.component.css
│   │   │   ├── index.html
│   │   │   ├── main.ts
│   │   │   └── styles.css
│   │   ├── angular.json
│   │   ├── package.json
│   │   └── README.md
│   └── p2/                    # Day 7 - Project 2: Routing Deep Dive (EasyTask Multi-View)
│       ├── public/
│       │   ├── users/                 # Team member profile images
│       │   └── task-management-logo.png
│       ├── src/
│       │   ├── app/
│       │   │   ├── header/            # Navigation header with Home routerLink
│       │   │   ├── users/             # Team sidebar, UserComponent (routerLinkActive), UserTasksComponent
│       │   │   ├── tasks/             # TasksComponent (query params), NewTaskComponent (canDeactivate modal), NoTaskComponent
│       │   │   ├── not-found/         # 404 Wildcard fallback component
│       │   │   ├── app.routes.ts      # Top-level routes, resolvers, and title
│       │   │   ├── app.config.ts      # provideRouter, withComponentInputBinding, paramsInheritanceStrategy
│       │   │   ├── app.component.ts   # Main layout with <router-outlet />
│       │   │   └── app.component.html
│       │   ├── dummy-users.ts
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
| [`day-4/p1/`](./day-4/p1) | **Directives Showcase** | `[ngClass]`, `[ngStyle]`, `*ngIf`, `*ngFor`, `*ngSwitch`, `a[appSafeLink]`, `*appAuth`, `*appRepeat` | **4200** |
| [`day-4/p2/`](./day-4/p2) | **Pipes Showcase** | `DatePipe`, `CurrencyPipe`, `JsonPipe`, Pure vs Impure Change Detection Lab, `AsyncPipe` | **4300** |
| [`day-5/p1/`](./day-5/p1) | **Services Deep Dive** | Dependency Injection, `inject()`, Signal Encapsulation (`asReadonly`), Custom `InjectionToken` | **4200** |
| [`day-5/p2/`](./day-5/p2) | **Change Detection Deep Dive** | Zone.js Dirty Checking, `ChangeDetectionStrategy.OnPush`, Signal Reactivity, Zone Pollution Avoidance | **4200** |
| [`day-6/p1/`](./day-6/p1) | **RxJS & Observables Deep Dive** | Observables, `interval`, `DestroyRef`, `pipe()`, `map()`, `filter()`, `debounceTime()`, `new Observable()`, `toSignal()`, `toObservable()`, `BehaviorSubject` | **4200** |
| [`day-6/p2/`](./day-6/p2) | **PlacePicker (HTTP & Backend)** | `HttpClient`, `provideHttpClient()`, Signals (`isLoading`, `error`), Async Fetching, Express REST API | **4200 (App) / 3000 (API)** |
| [`day-7/p1/`](./day-7/p1) | **Angular Forms Deep Dive** | Template-Driven (`ngModel`, `ngForm`), Reactive (`FormGroup`, `FormControl`), Select List, Radio Groups, Checkboxes, Cross-Field Validation | **4200** |
| [`day-7/p2/`](./day-7/p2) | **Routing Deep Dive** | Angular Router, `withComponentInputBinding()`, Nested Child Routes, Resolvers, Dynamic Titles, `CanDeactivateFn`, Query Params, 404 Fallback | **4200** |

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

### Day 4 - Project 1 (`day-4/p1`): Directives Deep Dive & Interactive Showcase
A dedicated showcase exploring Angular Built-in and Custom Directives, DOM manipulation, host listeners, and structural view container lifecycles:
- **Built-in Attribute Directives**:
  - `[ngClass]`: Multi-condition dynamic class binding (highlight, completed, glow, cosmic gradient variants).
  - `[ngStyle]`: Real-time reactive inline styling (background color picker, font size slider, padding, border radius).
  - `[(ngModel)]`: Two-way data binding from `FormsModule` linking form controls to active directives.
- **Built-in Structural Directives**:
  - `*ngIf`: Conditional mounting with `<ng-template #hiddenTmpl>` fallback blocks.
  - `*ngFor`: Rich iteration utilizing all local context variables: `index`, `first`, `last`, `even`, `odd`, `count`, and `trackBy`.
  - `*ngSwitch` / `*ngSwitchCase` / `*ngSwitchDefault`: Dynamic priority level status blocks.
- **Custom Attribute Directives**:
  - `a[appSafeLink]`: Intercepts link clicks, warns user on leaving external domains, sets `target="_blank"`, `rel="noopener noreferrer"`, and appends query parameter `?from=directives-showcase`.
  - `[appHighlight]`: `@HostListener` driven hover elevation, dynamic shadow, and configurable highlight borders.
  - `[appTooltip]`: Floating tooltip nodes injected into the DOM via `Renderer2` with automatic coordinate positioning.
  - `[appCopyClipboard]`: One-click clipboard copy utility with live "✓ Copied!" badge transition.
- **Custom Structural Directives**:
  - `*appAuth="requiredRole"`: Evaluates active user permission levels from `AuthService` (Admin, Editor, Viewer, Guest) using `ViewContainerRef.createEmbeddedView()` and `clear()` to dynamically mount or completely destroy elements in the DOM.
  - `*appRepeat="count; let i = index; let isLast = last"`: Repeats template nodes N times without dummy TypeScript arrays.

#### Running Day 4 - Project 1:
```bash
cd day-4/p1
npm start
```
Navigate to: [http://localhost:4200/](http://localhost:4200/)

---

### Day 4 - Project 2 (`day-4/p2`): Pipes Deep Dive & Interactive Laboratory
An extensive exploration of Angular Built-in and Custom Pipes, change detection mechanics, pure vs. impure behavior, and reactive streams:
- **Built-in Pipes**:
  - `DatePipe`: Date formatting with various localized patterns (`'short'`, `'medium'`, `'fullDate'`, `'MMMM d, yyyy'`).
  - `UpperCasePipe` · `LowerCasePipe` · `TitleCasePipe`: Text casing transformations.
  - `CurrencyPipe`: Dynamic currency symbol/code selection (`USD`, `EUR`, `GBP`, `INR`, `JPY`) with decimal precision.
  - `DecimalPipe` (`number`) & `PercentPipe`: Number formatting and percentage discounts.
  - `SlicePipe`: Dynamic start and end range slicing for arrays and strings.
  - `KeyValuePipe` & `JsonPipe`: Object key/value iteration and live JSON debug inspector.
- **Custom Utility Pipes**:
  - `| temperature:'C':'F':precision`: Converts between Celsius and Fahrenheit with degree symbols.
  - `| fileSize:precision`: Formats raw byte integers into human-readable units (`B`, `KB`, `MB`, `GB`).
  - `| timeAgo`: Computes humanized relative elapsed time ("just now", "12 minutes ago", "2 hours ago").
  - `| filterBy:searchQuery`: Real-time multi-field array search filter.
- **Pure vs. Impure Pipes Laboratory**:
  - Side-by-side interactive comparison demonstrating why pure pipes (`pure: true`) ignore in-place array mutations (`array.push()`) because memory references do not change.
  - Demonstrates how immutable updates (`[...array, item]`) trigger pure pipes.
  - Demonstrates how impure pipes (`pure: false`) re-run on every change detection cycle with real-time execution call counters.
- **Reactive Stream Handling (`AsyncPipe`)**:
  - Automatically subscribes to continuous live RxJS `Observable` tickers (`liveTicker$ | async`) and native JavaScript Promises (`userPromise$ | async`), automatically destroying subscriptions to prevent memory leaks.

#### Running Day 4 - Project 2:
```bash
cd day-4/p2
npm start
```
Navigate to: [http://localhost:4300/](http://localhost:4300/)

---

### Day 5 - Project 1 (`day-5/p1`): Services & Dependency Injection Deep Dive
An in-depth implementation of modern Angular Dependency Injection architectures, signal state encapsulation, and configuration tokens:
- **Centralized `TaskService`**:
  - Implements state encapsulation: `#tasks = signal<Task[]>([])` kept private, exposed via `allTasks = this.tasks.asReadonly()`.
  - Immutable status updates preventing direct state mutation outside service methods.
- **Modern Dependency Injection (`inject()`)**:
  - Replaces traditional constructor injection with constructor-less `inject()` throughout all components.
- **Hierarchical Dependency Injection & `InjectionToken`**:
  - Defines `TASK_STATUS_OPTIONS` custom `InjectionToken` and `taskStatusOptionsProvider`.
  - Injected into `TaskItemComponent` and `TasksListComponent` to dynamically render status dropdown options with `@for`.
- **Computed Filtering**:
  - `TasksListComponent` uses `computed()` to reactively filter tasks (`all`, `open`, `in-progress`, `done`) tracking by unique ID (`track task.id`).

#### Running Day 5 - Project 1:
```bash
cd day-5/p1
npm start
```
Navigate to: [http://localhost:4200/](http://localhost:4200/)

---

### Day 5 - Project 2 (`day-5/p2`): Change Detection Deep Dive
A comprehensive study and interactive diagnostic lab demonstrating how Angular coordinates view updates, Zone.js event triggers, and optimizations:
- **Zone.js Tree-Wide Traversal Visualizer**:
  - Every component includes a diagnostic `debugOutput` getter logging when template bindings re-evaluate during Change Detection cycles.
- **`ChangeDetectionStrategy.OnPush` Optimization**:
  - Applied across `InfoMessageComponent`, `CounterComponent`, `MessagesComponent`, `MessagesListComponent`, and `NewMessageComponent`.
  - Drastically limits re-evaluations: static components and unaffected branches skip CD cycles completely.
- **Zone Pollution Prevention**:
  - Uses `NgZone.runOutsideAngular()` inside `CounterComponent` to run background timers without triggering unnecessary global CD ticks.
- **Shared State with Signals**:
  - Centralized `MessagesService` managing `messages` signal with `asReadonly()`.
  - Direct consumption in `MessagesListComponent` without prop drilling, reacting seamlessly under `OnPush`.

#### Running Day 5 - Project 2:
```bash
cd day-5/p2
npm start
```
Navigate to: [http://localhost:4200/](http://localhost:4200/)

---

### Day 6 - Project 1 (`day-6/p1`): RxJS & Observables Deep Dive
An extensive reactive programming laboratory exploring stream architectures, subscription lifecycle cleanup, RxJS operators, custom producers, and Angular 18 Signals interoperability:
- **Observables & Streams of Data**:
  - Emitting continuous streams with `interval(1000)`.
  - Manual subscription management and memory leak prevention with `DestroyRef.onDestroy(() => subscription.unsubscribe())`.
- **Modern Signals ⇄ RxJS Interoperability (`@angular/core/rxjs-interop`)**:
  - `toObservable(signal)`: Converting synchronous Signals (`clickCount`) into Observables to apply stream operators (`map`, `filter`).
  - `toSignal(observable$, { initialValue })`: Bridging continuous Observables (`interval$`) into readable Signals in templates with automatic lifecycle teardown.
- **Pipeable Operators Laboratory**:
  - `map()` & `filter()`: Real-time mathematical stream transformation and gating pipeline.
  - `debounceTime(400)` & `distinctUntilChanged()`: Asynchronous typeahead search input stream.
  - `tap()`: Diagnostic stream inspection without mutation.
- **Custom Observables (`new Observable()`)**:
  - Custom async data producer with explicit `next()`, `complete()`, `error()`, and teardown function execution.
- **Multicasting with Subjects**:
  - `BehaviorSubject`: Instant state replay to new subscribers.
  - `Subject`: Multicast push event broadcasting.
- **Real-Time Stream Activity Visualizer**:
  - Integrated visual stream terminal tracking every `[NEXT]`, `[COMPLETE]`, `[ERROR]`, `[TEARDOWN]`, and `[INFO]` emission in real time.

#### Running Day 6 - Project 1:
```bash
cd day-6/p1
npm start
```
Navigate to: [http://localhost:4200/](http://localhost:4200/)

---

### Day 6 - Project 2 (`day-6/p2`): PlacePicker (Centralized HTTP Service & Backend Integration)
A full-stack Angular application demonstrating asynchronous HTTP client communication, centralized gateway service architecture, optimistic updates, loading states, and Express REST API integration:
- **Centralized `HttpService` Gateway (`shared/http.service.ts`)**:
  - Strongly-typed CRUD wrappers (`get`, `post`, `put`, `delete`, `patch`).
  - Active request tracking signal (`isLoading`) driving a global top-level animated progress bar.
  - Automatic error normalization, logging, and dispatching to `ErrorService`.
  - Endpoint path resolution (`/places` -> `http://localhost:3000/places`).
- **Domain Service Refactoring (`PlacesService`)**:
  - Injects `HttpService` instead of raw `HttpClient`.
  - Implements optimistic UI updates with automatic state rollback on server failures.
- **Reactive UI States with Signals**:
  - `isLoading`: Signal indicating active HTTP requests, toggling loading feedback.
  - `error`: Signal capturing HTTP network or server errors.
  - `places`: Signal storing fetched destination cards (`Place[]`).
- **Subscription Lifecycle & Memory Safety**:
  - Manages HTTP subscriptions with `DestroyRef.onDestroy(() => subscription.unsubscribe())`.
- **Node.js & Express REST Backend**:
  - Serves static destination images and JSON endpoints (`/places`, `/user-places`).
  - Robust error handling, path resolution, and CORS preflight (`OPTIONS`) support.

#### Running Day 6 - Project 2:
```bash
# Terminal 1: Start the Backend API (Port 3000)
cd day-6/p2/backend
npm start

# Terminal 2: Start the Frontend App (Port 4200)
cd day-6/p2
npm start
```
Navigate to: [http://localhost:4200/](http://localhost:4200/)

---

### Day 7 - Project 1: Angular Forms Deep Dive
A comprehensive Angular 18 forms showcase contrasting Template-Driven and Reactive Form paradigms:
- **Interactive Paradigm Switcher (`AppComponent`)**:
  - Signal-driven tab navigator (`activeForm = signal<'login' | 'signup'>('login')`) dynamically toggles views.
- **Template-Driven Login Form (`LoginComponent`)**:
  - Leverages `FormsModule`, `#form="ngForm"`, and `ngModel` with two-way and template tracking.
  - Built-in validation (`required`, `email`, `minlength="6"`).
  - Validation feedback with `.control-error` responding to dirty/touched states.
  - "Remember session" checkbox and form reset via `form.resetForm()`.
- **Reactive Signup Form (`SignupComponent`)**:
  - Strongly-typed `FormGroup` architecture using `ReactiveFormsModule`.
  - Diverse input controls:
    - **Text inputs**: First name, last name, street, number, postal code (pattern validation `/^[0-9]{4,6}$/`), city.
    - **Email & Passwords**: Passwords nested group with custom `passwordsMatchValidator` ensuring matching passwords.
    - **Select list**: Role dropdown (Student, Teacher, Employee, Founder, Other).
    - **Radio button groups**: Account Type (`personal`, `business`, `academic`) and Billing Cycle (`monthly`, `annually`).
    - **Multi-select checkboxes**: Referral acquisition channels (Google, Friend, LinkedIn, Other).
    - **Required checkbox**: Terms and conditions acceptance (`Validators.requiredTrue`).
  - Error highlighting with helper getters, `markAllAsTouched()`, and real-time validation states.
  - Form reset and interactive submission feedback card rendering parsed reactive data.

#### Running Day 7 - Project 1:
```bash
cd day-7/p1
npm start
```
Navigate to: [http://localhost:4200/](http://localhost:4200/)

---

### Day 7 - Project 2: Angular Routing Deep Dive
A comprehensive Angular 18 routing application refactoring EasyTask into a full-featured multi-view layout:
- **Modern Standalone Router Configuration (`app.config.ts`)**:
  - `provideRouter(routes, withComponentInputBinding(), withRouterConfig({ paramsInheritanceStrategy: 'always' }))`.
  - Seamlessly injects route params (`:userId`), query params (`?order=desc`), and resolver data into `input()` signals.
- **Nested / Child Routes Hierarchy (`users.routes.ts`)**:
  - `users/:userId` parent route mounts `UserTasksComponent`.
  - Child routes render inside `<router-outlet />`:
    - `tasks`: Mounts `TasksComponent` displaying active member tasks.
    - `tasks/new`: Mounts `NewTaskComponent` dialog.
- **Route Resolvers & Dynamic Tab Titles**:
  - `resolveUserName`: Resolves user display name from `UsersService`.
  - `resolveTitle`: Dynamically updates `document.title` to `<User Name>'s Tasks`.
- **Navigation & Active Link Highlighting**:
  - `UserComponent` uses `[routerLink]="['/users', user().id]"` and `routerLinkActive="selected"`.
  - Header logo and title provide convenient one-click navigation back to Home (`/`).
- **Query Parameters & Reactive Sorting (`TasksComponent`)**:
  - Binds query param `order = input<'asc' | 'desc'>('asc')`.
  - Dynamic toggle link re-orders tasks reactively via `computed()` signals.
- **Modal Dialog & `canDeactivate` Guard (`NewTaskComponent`)**:
  - Backdrop and modal dialog overlay rendered upon routing to `tasks/new`.
  - `canLeaveEditPage` guard prompts confirmation before abandoning unsaved task input.
- **Wildcard Route & 404 Fallback (`NotFoundComponent`)**:
  - Gracefully captures unmapped paths and invalid routes.

#### Running Day 7 - Project 2:
```bash
cd day-7/p2
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

# Day 4 / p1 (Directives)
cd ../day-4/p1 && npm run build -- --configuration development

# Day 4 / p2 (Pipes)
cd ../day-4/p2 && npm run build -- --configuration development

# Day 5 / p1 (Services)
cd ../day-5/p1 && npm run build -- --configuration development

# Day 5 / p2 (Change Detection)
cd ../day-5/p2 && npm run build -- --configuration development

# Day 6 / p1 (RxJS & Observables)
cd ../day-6/p1 && npm run build -- --configuration development

# Day 6 / p2 (PlacePicker HTTP)
cd ../day-6/p2 && npm run build -- --configuration development

# Day 7 / p1 (Angular Forms)
cd ../day-7/p1 && npm run build -- --configuration development

# Day 7 / p2 (Angular Routing)
cd ../day-7/p2 && npm run build -- --configuration development
```

# Day 8 - Project 1: Route-based Lazy Loading & Deferrable Views (`@defer`)

A comprehensive hands-on Angular 18 application demonstrating modern performance optimization, code splitting, route-based lazy loading, lazy-loaded services, and template-level deferrable views (`@defer` blocks).

---

## 🎯 Lessons & Concepts Implemented

### 1. Route-based Lazy Loading (`loadComponent` — Lessons 303 & 304)
- Rather than eagerly importing and bundling all components into the initial application bundle (`main.js`), route components are loaded on-demand via dynamic `import()`.
- **`UserTasksComponent` (`app.routes.ts`)**:
  ```typescript
  {
    path: 'users/:userId',
    loadComponent: () =>
      import('./users/user-tasks/user-tasks.component').then(
        (mod) => mod.UserTasksComponent
      ),
    loadChildren: () =>
      import('./users/users.routes').then((mod) => mod.routes),
    ...
  }
  ```
- **`NewTaskComponent` (`users.routes.ts`)**:
  ```typescript
  {
    path: 'tasks/new',
    loadComponent: () =>
      import('../tasks/new-task/new-task.component').then(
        (mod) => mod.NewTaskComponent
      ),
    canDeactivate: [canLeaveEditPage],
  }
  ```
  Only downloaded when the user actually navigates to `/users/:userId/tasks/new`.

### 2. Lazy Loading Entire Route Groups (`loadChildren` — Lesson 305)
- Child routes for the user subsystem are encapsulated in [`users.routes.ts`](./src/app/users/users.routes.ts) and lazy-loaded as a cohesive bundle:
  ```typescript
  loadChildren: () =>
    import('./users/users.routes').then((mod) => mod.routes)
  ```
- Bundles all user child pages and subcomponents into an independent lazy chunk (`users-routes`).

### 3. Using Lazy Loading to Lazy-load Services (Lesson 306)
- **Automatic Code Splitting for Services**:
  - [`TasksService`](./src/app/tasks/tasks.service.ts) is exclusively injected within the lazy-loaded user/task route hierarchy ([`TasksComponent`](./src/app/tasks/tasks.component.ts), [`TaskComponent`](./src/app/tasks/task/task.component.ts), and [`NewTaskComponent`](./src/app/tasks/new-task/new-task.component.ts)).
  - Because no root or eager components reference `TasksService`, Angular's build pipeline automatically extracts `TasksService` into the lazy-loaded route chunk rather than polluting the initial bundle.

### 4. Deferrable Views (`@defer` — Lessons 307 & 308)
- Angular 17+ standalone templates support declarative, inline lazy loading via `@defer`.
- The compiler automatically splits deferred standalone components ([`TaskComponent`](./src/app/tasks/task/task.component.ts)) into their own JavaScript chunks (`task-component`), dramatically trimming down the parent route's bundle footprint.
- Fully compatible with Vite and Angular CLI's Hot Module Replacement (HMR).

### 5. Viewport Visibility Trigger (`on viewport` — Lesson 309)
- Tasks are deferred inside the scrollable tasks list until they enter the user's viewport using the browser's native `IntersectionObserver`:
  ```html
  @defer (on viewport) {
    <app-task [task]="task" />
  } @placeholder {
    <p class="placeholder">Loading task...</p>
  }
  ```
- Content above the fold or offscreen is not rendered until scrolled into view.

### 6. Triggers & Prefetching (Lessons 310 & 311)
- **Built-in Triggers Supported**:
  - `on viewport`: Triggers when the placeholder enters the visible screen area.
  - `on idle`: Triggers when the browser has idle CPU time (default trigger).
  - `on interaction`: Triggers when the placeholder element is clicked or focused.
  - `on hover`: Triggers when the user hovers over the placeholder element.
  - `on timer(time)`: Triggers after a specified timer duration (e.g. `on timer(5s)`).
  - `when <condition>`: Triggers when a custom expression evaluates to true.
- **Prefetching (`prefetch on idle`)**:
  ```html
  @defer (on viewport; prefetch on idle) {
    <app-task [task]="task" />
  } @placeholder {
    <p class="placeholder">Loading task...</p>
  } @loading (after 150ms; minimum 200ms) {
    <p class="loading">Loading task...</p>
  }
  ```
  - **Decoupled Loading**: Angular pre-fetches the `task-component` JavaScript chunk quietly in the background when the browser is idle, and displays it immediately when the user scrolls it into view, eliminating visible network delay.

### 7. Deferrable Views Lifecycle Summary (Lesson 312)
- **`@defer`**: Main content block containing the deferred component.
- **`@placeholder`**: Lightweight placeholder rendered eagerly before the trigger condition is met. Supports optional `(minimum <time>)`.
- **`@loading`**: Content rendered while the lazy chunk is actively downloading over the network. Supports `(after <time>; minimum <time>)` to prevent flickering on fast networks.
- **`@error`**: Fallback template rendered if network failure prevents chunk download.

---

## 📊 Code Splitting & Bundle Analysis

When running `ng build`, the application outputs optimized separate chunks:

| Chunk Type | File / Name | Size | Loading Trigger |
| :--- | :--- | :---: | :--- |
| **Initial Bundle** | `main.js` | **5.42 kB** | Initial page load |
| **Initial Shared** | `polyfills.js` + vendor runtime | ~270 kB | Initial page load |
| **Lazy Route** | `user-tasks-component` | **1.70 kB** | Navigating to `/users/:userId` |
| **Lazy Route Group** | `users-routes` | **2.56 kB** | Navigating to user tasks view |
| **Lazy Route** | `new-task-component` | **30.48 kB** | Navigating to `/users/:userId/tasks/new` |
| **Deferred View** | `task-component` | **2.11 kB** | Scrolled into viewport (`prefetch on idle`) |

---

## 🗂️ Project Structure

```
day-8/p1/
├── public/
│   ├── users/                    # Team user avatar photos
│   └── task-management-logo.png  # Header brand logo
├── src/
│   ├── app/
│   │   ├── header/               # Navigation brand header
│   │   ├── not-found/            # 404 Wildcard fallback component
│   │   ├── shared/card/          # Reusable card component with <ng-content>
│   │   ├── tasks/
│   │   │   ├── new-task/         # Add task form (Lazy loaded via loadComponent)
│   │   │   ├── no-task/          # Empty state fallback placeholder
│   │   │   ├── task/             # Task item card (Deferred via @defer)
│   │   │   ├── tasks.component.ts# Tasks list with resolveUserTasks resolver
│   │   │   ├── tasks.component.html # @defer (on viewport; prefetch on idle)
│   │   │   ├── tasks.component.css
│   │   │   ├── tasks.service.ts  # Code-split TasksService
│   │   │   └── task/task.model.ts# Task interface
│   │   ├── users/
│   │   │   ├── user/             # Sidebar user button with routerLinkActive
│   │   │   ├── user-tasks/       # UserTasksComponent (Lazy loaded via loadComponent)
│   │   │   ├── users.component.ts# Sidebar users list container
│   │   │   ├── users.routes.ts   # Lazy-loaded child route group (loadChildren)
│   │   │   └── users.service.ts  # Team members data service
│   │   ├── app.component.ts      # Main layout component (<router-outlet />)
│   │   ├── app.config.ts         # provideRouter with withComponentInputBinding
│   │   └── app.routes.ts         # loadComponent & loadChildren definitions
│   ├── dummy-users.ts            # Mock user data
│   ├── index.html
│   ├── main.ts
│   └── styles.css
├── angular.json
├── package.json
└── tsconfig.json
```

---

## 🛠️ How to Run

### 1. Install Dependencies
```bash
cd day-8/p1
npm install
```

### 2. Start Development Server
```bash
npm start
```

Navigate to: [http://localhost:4200/](http://localhost:4200/)

### 3. Build & Verify Chunks
```bash
npm run build
```
Notice the generated `Lazy chunk files` in the build terminal output!

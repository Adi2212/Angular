# Day 7 - Project 2: Angular Routing Deep Dive (EasyTask Multi-View)

A comprehensive hands-on Angular 18 application demonstrating modern **Angular Router** features: standalone configuration, component input binding, nested/child routes, route resolvers, dynamic document titles, route guards (`CanDeactivateFn`), query parameters, and 404 wildcard fallback.

---

## 🚀 Key Features

### 1. Modern Standalone Router Configuration
- **Application Config (`app.config.ts`)**:
  - `provideRouter(routes, withComponentInputBinding(), withRouterConfig({ paramsInheritanceStrategy: 'always' }))`.
  - Enables route parameters (`:userId`), query params (`?order=desc`), and resolved data to be bound directly to Angular `input()` and `input.required()` signals.

### 2. Nested & Child Routes Hierarchy
- **Root Layout (`AppComponent`)**:
  - Left column renders the team member list (`UsersComponent`).
  - Right column renders the dynamic view inside `<router-outlet />`.
- **Top-Level Routes (`app.routes.ts`)**:
  - `''` (Home): Renders `NoTaskComponent` instructing user to pick a team member.
  - `'users/:userId'`: Renders `UserTasksComponent` with child routes from `userRoutes`.
  - `'**'`: Wildcard route rendering custom `NotFoundComponent` (404).
- **Child Routes (`users.routes.ts`)**:
  - `''` -> Redirects to `'tasks'`.
  - `'tasks'`: Renders `TasksComponent` listing the active user's tasks.
  - `'tasks/new'`: Renders `NewTaskComponent` modal dialog.

### 3. Route Resolvers & Dynamic Titles
- **`resolveUserName`**: Resolves the selected user's full name from `UsersService` based on `:userId`.
- **`resolveTitle`**: Dynamically updates the browser tab `document.title` to `<User Name>'s Tasks`.

### 4. Navigation & Active Link Highlighting
- **`UserComponent`**:
  - Uses `[routerLink]="['/users', user().id]"` and `routerLinkActive="selected"`.
  - Automatically highlights the active user's card in violet when navigating between users.
- **`HeaderComponent`**:
  - Brand logo and title link back to root `/` (Home).

### 5. Query Parameters & Reactive Sorting
- **`TasksComponent`**:
  - Binds query param `order = input<'asc' | 'desc'>('asc')`.
  - Provides a toggle link `[queryParams]="{ order: order() === 'asc' ? 'desc' : 'asc' }"` on the current route.
  - Reverses task order dynamically via reactive `computed()` signal.

### 6. Modal Dialog & `canDeactivate` Route Guard
- **`NewTaskComponent`**:
  - Renders a backdrop overlay and `<dialog open>` when routed to `tasks/new`.
  - **`canLeaveEditPage`**: Protects users from accidental navigation with dirty unsaved form inputs using `CanDeactivateFn`.
  - Redirects back to `/users/:userId/tasks` upon cancellation or successful creation.

---

## 🛠️ How to Run

```bash
cd day-7/p2
npm start
```

Navigate to: [http://localhost:4200/](http://localhost:4200/)

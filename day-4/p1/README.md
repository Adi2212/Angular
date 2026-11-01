# Day 4 - Project 1: Angular Directives Showcase (`p1`)

A deep dive and interactive playground showcasing **Angular Built-in and Custom Directives**, micro-syntax de-sugaring, host bindings/listeners, and dynamic structural view containers.

---

## 🌟 Features & Directives Demonstrated

### 1. Built-in Attribute Directives
- **`[ngClass]`**: Multi-conditional class binding using expression objects, arrays, and string formats.
- **`[ngStyle]`**: Reactive inline styles using dynamic unit properties (`padding.px`, `font-size.px`, `border-radius.px`).
- **`[(ngModel)]`**: Two-way data binding from `FormsModule` bridging interactive UI controls to template directives.

### 2. Built-in Structural Directives
- **`*ngIf`**: Conditional element rendering with `then` and `else` template fallback blocks (`<ng-template #hiddenTmpl>`).
- **`*ngFor`**: Iteration over datasets utilizing all local context variables:
  - `index`: 0-based iteration index.
  - `first` / `last`: Booleans denoting terminal nodes.
  - `even` / `odd`: Alternating boolean flags for striping rows.
  - `count`: Total collection length.
  - `trackBy`: Performance optimization function preventing unnecessary DOM re-renders.
- **`*ngSwitch` / `*ngSwitchCase` / `*ngSwitchDefault`**: Multi-state branch rendering for priority tags.

### 3. Custom Attribute Directives
- **`a[appSafeLink]`**:
  - Attached exclusively to anchor `<a>` tags.
  - Intercepts clicks using host listener `(click)`.
  - Prompts confirmation before navigating to external domains.
  - Automatically appends tracking query parameters (`?from=directives-showcase`) and secures navigation via `target="_blank"` and `rel="noopener noreferrer"`.
- **`[appHighlight]`**:
  - Listens to `mouseenter` and `mouseleave` events to apply dynamic background, neon border, and 3D elevation.
  - Fully customizable via inputs (`[highlightColor]`, `[highlightBorder]`).
- **`[appTooltip]`**:
  - Dynamically creates floating DOM tooltips via `Renderer2`.
  - Calculates screen coordinates for auto-positioning (`top` / `bottom`).
- **`[appCopyClipboard]`**:
  - One-click clipboard copy utility with live "✓ Copied!" badge transition.

### 4. Custom Structural Directives
- **`*appAuth="requiredRole"`**:
  - Evaluates user role permissions against active `AuthService`.
  - Mounts views via `ViewContainerRef.createEmbeddedView(this.templateRef)` when authorized.
  - Completely clears views via `ViewContainerRef.clear()` when permissions are lacking (ensuring sensitive DOM nodes are completely removed from the page).
- **`*appRepeat="count; let i = index; let isLast = last"`**:
  - Custom structural directive that repeats templates N times without creating a dummy array in TypeScript.
  - Passes rich template context variables (`$implicit`, `index`, `first`, `last`, `even`, `odd`).

---

## 🚀 How to Run

```bash
cd day-4/p1
npm start
```

Open your browser at: **`http://localhost:4200/`**

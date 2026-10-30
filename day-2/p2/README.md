# Day 2 - Project 2: Investment Calculator

An investment calculator application built with Angular 18, demonstrating modern signal-based state management, standalone components, dependency injection with `inject()`, and two-way template-driven form bindings.

---

## 🌟 Features

- **Reactive State Management**: `InvestmentService` uses Angular Signals (`signal<InvestmentResult[] | undefined>`) to track calculation state reactively.
- **Modern Dependency Injection**: Uses `inject(InvestmentService)` instead of constructor injection.
- **Two-Way Binding**: Template-driven forms using `[(ngModel)]` for interactive user inputs.
- **Computed Results Display**: Clean tabular layout rendering year-by-year financial projections formatted with `CurrencyPipe`.
- **Conditional Views**: Shows an inviting zero-state prompt until calculation values are submitted.

---

## 🛠️ Architecture

```
day-2/p2/src/
├── app/
│   ├── header/                      # Application brand & logo header
│   │   ├── header.component.ts
│   │   ├── header.component.html
│   │   └── header.component.css
│   ├── user-input/                  # Form inputs (initial & annual investment, duration, expected return)
│   │   ├── user-input.component.ts
│   │   ├── user-input.component.html
│   │   └── user-input.component.css
│   ├── investment-results/          # Formatted data table of investment returns
│   │   ├── investment-results.component.ts
│   │   ├── investment-results.component.html
│   │   └── investment-results.component.css
│   ├── investment.model.ts          # TypeScript interfaces (InvestmentInput, InvestmentResult)
│   ├── investment.service.ts        # Centralized signal-based service with inject()
│   ├── app.component.ts             # Root standalone component
│   └── app.component.html
├── investment-results.ts            # Core financial calculation algorithm
└── styles.css                       # Global styles & themes
```

---

## 🚀 Running the App

```bash
cd day-2/p2
npm start
```

Navigate to [http://localhost:4400](http://localhost:4400) in your browser.

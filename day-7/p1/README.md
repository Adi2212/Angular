# Day 7 - Project 1: Angular Forms Deep Dive (Template-Driven & Reactive Forms)

A comprehensive hands-on Angular 18 application comparing and mastering both **Template-Driven Forms** and **Reactive Forms**, showcasing various input controls, validation states, and reactive paradigms.

---

## 🚀 Key Features

### 1. Template-Driven Form (`LoginComponent`)
- **Module**: `FormsModule`.
- **Directives & References**: `#form="ngForm"`, `(ngSubmit)="onSubmit(form)"`, `ngModel`, `name` attribute.
- **Form Controls**:
  - `email`: Validated with `required`, `email` validator, and `#email="ngModel"`.
  - `password`: Validated with `required`, `minlength="6"`, and `#password="ngModel"`.
  - `remember`: Checkbox bound with `ngModel` to retain user device preference.
- **Validation Feedback**:
  - Checks `email.touched && email.invalid` and `password.touched && password.invalid`.
  - Renders inline contextual error messages via `.control-error`.
- **Form Actions**:
  - Marks all controls as touched upon invalid submit attempts.
  - Success banner displaying submitted data using Angular Signals.
  - Reset action via `form.resetForm()`.

### 2. Reactive Form (`SignupComponent`)
- **Module**: `ReactiveFormsModule`.
- **Structure**: Strongly-typed nested `FormGroup` with `FormControl` controls.
- **Diverse Input Types**:
  - **Text Inputs**: First Name, Last Name, Street, Number, Postal Code (regex pattern `/^[0-9]{4,6}$/`), City.
  - **Email Input**: `Validators.required` and `Validators.email`.
  - **Password Group with Custom Validator**:
    - `password` (`Validators.minLength(6)`) and `confirmPassword`.
    - Cross-field validator `passwordsMatchValidator` ensuring password confirmation equality.
  - **Select List (Dropdown)**:
    - `<select formControlName="role">`: Options for Student, Teacher, Employee, Founder, and Other.
  - **Radio Button Groups**:
    - **Account Type**: `Personal`, `Business`, `Academic`.
    - **Billing Cycle**: `Monthly ($15/mo)`, `Annually ($144/yr - Save 20%)`.
  - **Checkbox Group (Multi-select)**:
    - `source` nested `FormGroup`: Google Search, Referral by Friend, LinkedIn, and Other.
  - **Single Required Checkbox**:
    - `terms`: `Validators.requiredTrue` ensuring explicit policy acceptance.
- **Form Actions & Reset**:
  - `form.markAllAsTouched()` to highlight unfilled required fields.
  - `form.reset()` restoring clean defaults.
  - Detailed submission card parsing and displaying all reactive form fields and selected acquisition channels.

### 3. Paradigm Switcher (`AppComponent`)
- Top tab navigation toggle driven by Angular `signal<'login' | 'signup'>('login')`.
- Dynamic rendering via Angular 18 `@if` control flow syntax.

---

## 🛠️ How to Run

```bash
cd day-7/p1
npm start
```

Navigate to [http://localhost:4200/](http://localhost:4200/) in your browser.

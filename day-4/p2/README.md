# Day 4 - Project 2: Angular Pipes Showcase (`p2`)

A comprehensive showcase and interactive laboratory exploring **Angular Built-in Pipes**, custom pipe creation, pipe chaining, **Pure vs. Impure Pipe Change Detection**, and reactive stream management with **`AsyncPipe`**.

---

## 🌟 Features & Concepts Demonstrated

### 1. Built-in Pipes
- **`UpperCasePipe` · `LowerCasePipe` · `TitleCasePipe`**: Declarative string transformation without mutating source models.
- **`DatePipe`**: Date and timestamp formatting with customizable patterns (`'short'`, `'medium'`, `'fullDate'`, `'MMMM d, yyyy'`).
- **`CurrencyPipe`**: Currency conversion with dynamic currency codes (`USD`, `EUR`, `GBP`, `INR`, `JPY`), formatting options (`symbol`, `code`), and decimal digits (`'1.2-2'`).
- **`DecimalPipe` (`number`)**: Numerical formatting, thousands separators, and fractional precision control.
- **`PercentPipe`**: Percentage calculations and display (`item.discountRate | percent:'1.0-1'`).
- **`SlicePipe`**: In-template array and string subset slicing with dynamic start/end sliders.
- **`KeyValuePipe`**: Iterating over un-indexed JavaScript objects and maps in templates.
- **`JsonPipe`**: In-template JSON serializer for real-time state debugging.

### 2. Custom Utility Pipes
- **`| temperature:'C':'F':precision`**: Converts between Celsius and Fahrenheit with precision and degree indicators.
- **`| fileSize:precision`**: Formats raw byte counts into human-readable storage units (`B`, `KB`, `MB`, `GB`).
- **`| timeAgo`**: Computes relative humanized elapsed time ("just now", "12 minutes ago", "2 hours ago").
- **`| filterBy:searchQuery`**: Real-time multi-field array filtering across objects.

### 3. Pure vs. Impure Pipes Laboratory
An interactive change detection lab comparing:
- **Pure Pipe (`pure: true`)**:
  - Re-evaluates **only** when primitive inputs change or object references change.
  - Adding an item via `array.push()` does **not** re-run the pure pipe (reference remains unchanged).
  - Adding an item immutably `[...array, item]` creates a new array reference and immediately triggers the pure pipe.
- **Impure Pipe (`pure: false`)**:
  - Re-evaluates on **every** Angular change detection cycle.
  - Detects in-place mutations immediately, but incurs performance overhead on large collections.
- **Real-Time Execution Counters**: Live counters display execution call counts of both pipes side-by-side.

### 4. Reactive Async Stream Unwrapping (`AsyncPipe`)
- **RxJS Observable Streams**:
  - Automatically subscribes to continuous Observable streams (e.g., live crypto/market ticker updates emitted via RxJS `interval`).
  - Automatically destroys and cancels the subscription when the component is unmounted to prevent memory leaks.
- **JavaScript Promises**:
  - Automatically unwraps delayed native Promises (`userPromise$ | async`) without requiring `.then()` callbacks in TypeScript.

---

## 🚀 How to Run

```bash
cd day-4/p2
npm start
```

Open your browser at: **`http://localhost:4300/`**

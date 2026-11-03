# Day 6 - Project 1: Understanding RxJS & Observables

A deep dive into reactive stream programming with **RxJS ~7.8.0** and **Angular 18**. This project explores asynchronous data streams, subscription lifecycle management, pipeable operators, custom observable producers, `BehaviorSubject` / `Subject` multicasting, and modern Angular 18 interoperability with Signals (`toSignal()` & `toObservable()`).

---

## 🌟 Key Features & Lessons Implemented

### 1. Observables & Streams of Data
- **Concept**: Observables represent streams of values emitted over time (zero, one, or multiple values) until they either complete or encounter an error.
- **Continuous Stream**: Demonstrates an infinite timer stream using `interval(1000)`.
- **Subscription Lifecycle & Memory Leaks**:
  - Manual subscriptions via `.subscribe({ next, error, complete })`.
  - Proper unsubscription using Angular's `DestroyRef.onDestroy(() => subscription.unsubscribe())`.

### 2. Angular 18 Signals ⇄ RxJS Interoperability
- **`toObservable(signal)`**:
  - Converts a reactive Signal (`clickCount`) into an RxJS Observable (`clickCount$`).
  - Enables powerful RxJS operators on top of Signal state changes.
- **`toSignal(observable$, { initialValue })`**:
  - Converts an RxJS Observable (`interval$`) into a Signal (`intervalSignal`).
  - Handles automatic subscription and teardown tied to Angular's injection context.

### 3. RxJS Pipeable Operators Laboratory
- **`map()`**: Transforms emitted stream values (e.g., doubling click counts, calculating mathematical multipliers).
- **`filter()`**: Gating stream values based on a boolean predicate (e.g., only emitting when numbers are even).
- **`tap()`**: Performing non-mutating side effects / diagnostic logging on stream emissions.
- **`debounceTime(400)` & `distinctUntilChanged()`**:
  - Asynchronous typeahead / search input stream that delays emission until user pauses typing for 400ms and ignores duplicate values.

### 4. Custom Observables (`new Observable()`)
- Wraps an arbitrary asynchronous producer in `new Observable<T>(subscriber => { ... })`.
- Demonstrates:
  - `subscriber.next(value)`: Emitting intermediate values.
  - `subscriber.complete()`: Gracefully closing the stream.
  - `subscriber.error(err)`: Handling stream interruptions.
  - **Teardown Function**: Returns a cleanup callback that clears interval timers when unsubscribed.

### 5. Multicasting with Subjects
- **`BehaviorSubject`**:
  - Holds an initial state and immediately replays the latest value to new subscribers.
  - Used for application status state (`Online`, `Processing`, `Locked`).
- **`Subject`**:
  - Pure event bus. Emits only to currently active subscribers without holding past state.

### 6. Real-Time Stream Activity Visualizer
- Visual terminal interface tracking every stream emission (`[NEXT]`, `[COMPLETE]`, `[ERROR]`, `[TEARDOWN]`, `[INFO]`) with timestamps and stream origin badges.

---

## 🚀 Running the Project

```bash
# Navigate to day-6 project
cd day-6/p1

# Start the development server
npm start
```

Navigate to: [http://localhost:4200/](http://localhost:4200/)

### 🛠️ Building the Project

```bash
npm run build -- --configuration development
```

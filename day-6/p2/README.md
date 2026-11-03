# Day 6 - Project 2: PlacePicker (Centralized HTTP Service & Backend Integration)

A complete full-stack Angular 18 application and Express REST API implementing a **centralized `HttpService` gateway**, optimistic UI updates, state rollback on error, active request tracking, and error modal dialogs.

---

## 🌟 Architecture & Centralized `HttpService`

### Central `HttpService` Gateway (`shared/http.service.ts`)
All network traffic in the application is managed through a central `HttpService` providing:
- **Base URL & Endpoint Resolution**: Resolves relative endpoints (e.g., `/places`) to `http://localhost:3000`.
- **Active Request Tracking (`isLoading`)**:
  - Automatically increments an internal request counter on subscription and decrements on `finalize()`.
  - Exposes an `isLoading` computed signal that drives a global progress bar at the top of the application.
- **Unified Error Handling**:
  - Normalizes `HttpErrorResponse` codes and server messages.
  - Automatically integrates with `ErrorService` to display global error modals.
- **Request Lifecycle Logging**:
  - Maintains a reactive stream of network logs with method, URL, duration, status, and error states.
- **Typed CRUD Operations**:
  - `get<T>()`, `post<T>()`, `put<T>()`, `delete<T>()`, and `patch<T>()`.

---

## 🌟 Implemented HTTP Methods

### 1. `GET /places` (Fetch Available Catalog)
- **Service Method**: `PlacesService.loadAvailablePlaces()` &rarr; `HttpService.get('/places')`
- **Behavior**: Retrieves 18 global tourist destinations with simulated 3s delay for loading state demonstration.
- **Component**: `AvailablePlacesComponent` displays destination cards.

### 2. `GET /user-places` (Fetch User Saved Favorites)
- **Service Method**: `PlacesService.loadUserPlaces()` &rarr; `HttpService.get('/user-places')`
- **Behavior**: Retrieves the user's saved destinations, piped with `tap()` to populate `userPlaces` signal.
- **Component**: `UserPlacesComponent` displays the list with empty-state fallback.

### 3. `PUT /user-places` (Add Place with Optimistic Update)
- **Service Method**: `PlacesService.addPlaceToUserPlaces(place)` &rarr; `HttpService.put('/user-places', { placeId })`
- **Optimistic UI Pattern**:
  - Immediately updates the local `userPlaces` signal so the user sees the place added instantly.
  - Sends the `PUT` request to Express through `HttpService`.
  - If the server request fails, catches the error, rolls back the local state to the previous snapshot, and displays an error dialog.

### 4. `DELETE /user-places/:id` (Remove Place with Optimistic Update)
- **Service Method**: `PlacesService.removeUserPlace(place)` &rarr; `HttpService.delete('/user-places/:id')`
- **Optimistic UI Pattern**:
  - Immediately removes the place from the local `userPlaces` signal.
  - Sends the `DELETE` request to Express through `HttpService`.
  - If the server request fails, automatically rolls back and notifies the user.

### 5. `ErrorService` & Global Modal Dialog
- Shared reactive error state managed by `ErrorService` using Angular Signals (`_error = signal('')`).
- When any HTTP action encounters a failure, `ErrorService.showError()` displays the `<aside class="error-modal-backdrop">` in `AppComponent` with an animated dialog.

---

## 🚀 Running the Project

### Step 1: Start the Backend REST API (Port 3000)
```bash
cd day-6/p2/backend
npm start
```
*Backend server runs at:* `http://localhost:3000/`

### Step 2: Start the Angular Application (Port 4200)
```bash
cd day-6/p2
npm start
```
*Frontend runs at:* `http://localhost:4200/`

### 🛠️ Build Verification
```bash
npm run build -- --configuration development
```

import { inject, Injectable, signal, computed } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams
} from '@angular/common/http';
import { catchError, finalize, Observable, tap, throwError } from 'rxjs';
import { ErrorService } from './error.service';

export interface HttpRequestOptions {
  headers?: HttpHeaders | { [header: string]: string | string[] };
  params?: HttpParams | { [param: string]: string | number | boolean | ReadonlyArray<string | number | boolean> };
  showGlobalError?: boolean;
  customErrorMessage?: string;
}

export interface NetworkLogEntry {
  id: string;
  timestamp: string;
  method: string;
  url: string;
  status?: number;
  durationMs?: number;
  error?: string;
}

/**
 * Centralized HTTP Service managing all application HTTP communication,
 * active loading state tracking, error normalization, and request logging.
 */
@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private httpClient = inject(HttpClient);
  private errorService = inject(ErrorService);

  // Base API endpoint URL
  private readonly baseUrl = 'http://localhost:3000';

  // Reactive state: tracks active concurrent HTTP requests
  private activeRequestsCount = signal(0);
  readonly isLoading = computed(() => this.activeRequestsCount() > 0);

  // Reactive state: history of dispatched HTTP requests for monitoring
  readonly requestLogs = signal<NetworkLogEntry[]>([]);

  /**
   * Resolves endpoint path to a full URL.
   */
  private resolveUrl(endpoint: string): string {
    if (endpoint.startsWith('http://') || endpoint.startsWith('https://')) {
      return endpoint;
    }
    const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
    return `${this.baseUrl}${cleanEndpoint}`;
  }

  /**
   * Core request dispatcher wrapping HttpClient calls with tracking and error handling.
   */
  private executeRequest<T>(
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH',
    endpoint: string,
    requestFn: (url: string) => Observable<T>,
    options?: HttpRequestOptions
  ): Observable<T> {
    const fullUrl = this.resolveUrl(endpoint);
    const startTime = performance.now();
    const requestId = `${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;

    // Increment active request counter
    this.activeRequestsCount.update((count) => count + 1);

    const logEntry: NetworkLogEntry = {
      id: requestId,
      timestamp: new Date().toLocaleTimeString(),
      method,
      url: fullUrl,
    };

    return requestFn(fullUrl).pipe(
      tap({
        next: () => {
          const durationMs = Math.round(performance.now() - startTime);
          logEntry.status = 200;
          logEntry.durationMs = durationMs;
          this.logRequest(logEntry);
        },
      }),
      catchError((error: unknown) => {
        const durationMs = Math.round(performance.now() - startTime);
        let status = 0;
        let errorMessage = options?.customErrorMessage || 'An unexpected network error occurred.';

        if (error instanceof HttpErrorResponse) {
          status = error.status;
          if (error.error?.message) {
            errorMessage = error.error.message;
          } else if (error.statusText) {
            errorMessage = `HTTP ${error.status}: ${error.statusText}`;
          }
        } else if (error instanceof Error) {
          errorMessage = error.message;
        }

        logEntry.status = status;
        logEntry.durationMs = durationMs;
        logEntry.error = errorMessage;
        this.logRequest(logEntry);

        // Notify user via ErrorService unless explicitly silenced
        if (options?.showGlobalError !== false) {
          this.errorService.showError(errorMessage);
        }

        return throwError(() => new Error(errorMessage));
      }),
      finalize(() => {
        // Guarantee counter decrement regardless of success, error, or unsubscription
        this.activeRequestsCount.update((count) => Math.max(0, count - 1));
      })
    );
  }

  /**
   * Log network activity into the reactive stream.
   */
  private logRequest(entry: NetworkLogEntry): void {
    this.requestLogs.update((logs) => [entry, ...logs.slice(0, 24)]);
  }

  /**
   * GET Request
   */
  get<T>(endpoint: string, options?: HttpRequestOptions): Observable<T> {
    return this.executeRequest<T>(
      'GET',
      endpoint,
      (url) => this.httpClient.get<T>(url, {
        headers: options?.headers,
        params: options?.params,
      }),
      options
    );
  }

  /**
   * POST Request
   */
  post<T>(endpoint: string, body: unknown, options?: HttpRequestOptions): Observable<T> {
    return this.executeRequest<T>(
      'POST',
      endpoint,
      (url) => this.httpClient.post<T>(url, body, {
        headers: options?.headers,
        params: options?.params,
      }),
      options
    );
  }

  /**
   * PUT Request
   */
  put<T>(endpoint: string, body: unknown, options?: HttpRequestOptions): Observable<T> {
    return this.executeRequest<T>(
      'PUT',
      endpoint,
      (url) => this.httpClient.put<T>(url, body, {
        headers: options?.headers,
        params: options?.params,
      }),
      options
    );
  }

  /**
   * DELETE Request
   */
  delete<T>(endpoint: string, options?: HttpRequestOptions): Observable<T> {
    return this.executeRequest<T>(
      'DELETE',
      endpoint,
      (url) => this.httpClient.delete<T>(url, {
        headers: options?.headers,
        params: options?.params,
      }),
      options
    );
  }

  /**
   * PATCH Request
   */
  patch<T>(endpoint: string, body: unknown, options?: HttpRequestOptions): Observable<T> {
    return this.executeRequest<T>(
      'PATCH',
      endpoint,
      (url) => this.httpClient.patch<T>(url, body, {
        headers: options?.headers,
        params: options?.params,
      }),
      options
    );
  }

  /**
   * Clear request history log
   */
  clearLogs(): void {
    this.requestLogs.set([]);
  }
}

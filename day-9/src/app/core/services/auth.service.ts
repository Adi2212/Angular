import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, catchError, throwError } from 'rxjs';
import { 
  Address, 
  ForgotPasswordRequest, 
  LoginRequest, 
  LoginResponse, 
  OAuthRequest, 
  RegisterRequest, 
  RegisterResponse, 
  ResetPasswordRequest, 
  UpdateProfileRequest, 
  User, 
  UserRole 
} from '../models/user.model';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private toast = inject(ToastService);

  private readonly baseUrl = 'http://localhost:9090';
  private readonly TOKEN_KEY = 'agrisell_jwt_token';
  private readonly USER_KEY = 'agrisell_user_data';

  // Signals for user state
  readonly currentUser = signal<User | null>(null);
  readonly token = signal<string | null>(null);

  readonly isAuthenticated = computed(() => !!this.token() && !!this.currentUser());
  readonly role = computed<UserRole | null>(() => this.currentUser()?.role || null);
  readonly isBuyer = computed(() => this.role() === 'BUYER');
  readonly isFarmer = computed(() => this.role() === 'FARMER');
  readonly isAdmin = computed(() => this.role() === 'ADMIN');

  constructor() {
    this.restoreSession();
  }

  private restoreSession(): void {
    try {
      const savedToken = sessionStorage.getItem("token") || localStorage.getItem(this.TOKEN_KEY);
      const savedUser = sessionStorage.getItem("user") || localStorage.getItem(this.USER_KEY);
      if (savedToken && savedUser) {
        this.token.set(savedToken);
        this.currentUser.set(JSON.parse(savedUser));
      }
    } catch {
      this.clearSession();
    }
  }

  private saveSession(token: string, user: User): void {
    this.token.set(token);
    this.currentUser.set(user);
    try {
      sessionStorage.setItem("token", token);
      sessionStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem(this.TOKEN_KEY, token);
      localStorage.setItem(this.USER_KEY, JSON.stringify(user));
    } catch (e) {
      console.error('Failed to save session', e);
    }
  }

  private clearSession(): void {
    this.token.set(null);
    this.currentUser.set(null);
    try {
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("user");
      localStorage.removeItem(this.TOKEN_KEY);
      localStorage.removeItem(this.USER_KEY);
    } catch (e) {
      console.error('Failed to clear session', e);
    }
  }

  login(credentials: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.baseUrl}/auth/login`, credentials).pipe(
      tap(res => {
        this.saveSession(res.token, res.user);
        this.toast.success(`Welcome back, ${res.user.name}!`);
      }),
      catchError(err => {
        const errorMsg = err.error?.message || err.error?.error || 'Login failed. Please check your credentials.';
        this.toast.error(errorMsg);
        return throwError(() => err);
      })
    );
  }

  register(data: RegisterRequest): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(`${this.baseUrl}/auth/register`, data).pipe(
      tap(res => {
        this.toast.success('Registration successful! Please sign in with your credentials.');
      }),
      catchError(err => {
        const errorMsg = err.error?.message || err.error?.error || 'Registration failed. Please check input requirements.';
        this.toast.error(errorMsg);
        return throwError(() => err);
      })
    );
  }

  forgotPassword(email: string): Observable<string> {
    return this.http.post<string>(`${this.baseUrl}/auth/forgot-password`, { email }, { responseType: 'text' as 'json' }).pipe(
      tap(() => this.toast.info('Password reset email sent successfully.')),
      catchError(err => {
        const errorMsg = err.error?.message || 'Failed to send password reset email.';
        this.toast.error(errorMsg);
        return throwError(() => err);
      })
    );
  }

  resetPassword(req: ResetPasswordRequest): Observable<string> {
    return this.http.post<string>(`${this.baseUrl}/auth/reset-password`, req, { responseType: 'text' as 'json' }).pipe(
      tap(() => this.toast.success('Password has been reset successfully. Please sign in.')),
      catchError(err => {
        const errorMsg = err.error?.message || 'Password reset failed. Invalid or expired token.';
        this.toast.error(errorMsg);
        return throwError(() => err);
      })
    );
  }

  oauthLogin(provider: 'google' | 'facebook', token: string): Observable<LoginResponse> {
    const endpoint = provider === 'google' ? '/auth/oauth/google' : '/auth/oauth/facebook';
    return this.http.post<LoginResponse>(`${this.baseUrl}${endpoint}`, { token }).pipe(
      tap(res => {
        this.saveSession(res.token, res.user);
        this.toast.success(`Signed in via ${provider.toUpperCase()}`);
      }),
      catchError(err => {
        const errorMsg = err.error?.message || `Failed to sign in via ${provider}.`;
        this.toast.error(errorMsg);
        return throwError(() => err);
      })
    );
  }

  logout(): void {
    const name = this.currentUser()?.name;
    this.clearSession();
    this.toast.info(name ? `Goodbye, ${name}!` : 'Signed out successfully');
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/user/${id}`);
  }

  updateProfile(data: UpdateProfileRequest): Observable<User> {
    return this.http.patch<User>(`${this.baseUrl}/user/profile`, data).pipe(
      tap(updated => {
        this.currentUser.set(updated);
        localStorage.setItem(this.USER_KEY, JSON.stringify(updated));
        this.toast.success('Profile updated successfully');
      }),
      catchError(err => {
        this.toast.error(err.error?.message || 'Failed to update profile');
        return throwError(() => err);
      })
    );
  }

  updateAddress(address: Address): Observable<User> {
    return this.http.put<User>(`${this.baseUrl}/user/address`, address).pipe(
      tap(updated => {
        this.currentUser.set(updated);
        localStorage.setItem(this.USER_KEY, JSON.stringify(updated));
        this.toast.success('Delivery address saved successfully');
      }),
      catchError(err => {
        this.toast.error(err.error?.message || 'Failed to update address');
        return throwError(() => err);
      })
    );
  }

  updateProfilePhoto(profileUrl: string): Observable<User> {
    return this.http.put<User>(`${this.baseUrl}/user/profile-photo`, { profileUrl }).pipe(
      tap(updated => {
        this.currentUser.set(updated);
        localStorage.setItem(this.USER_KEY, JSON.stringify(updated));
        this.toast.success('Profile photo updated successfully');
      }),
      catchError(err => {
        this.toast.error(err.error?.message || 'Failed to update photo');
        return throwError(() => err);
      })
    );
  }
}

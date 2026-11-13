export type UserRole = 'BUYER' | 'FARMER' | 'ADMIN';
export type AccountStatus = 'ACTIVE' | 'INACTIVE';

export interface Address {
  street?: string;
  city: string;
  district?: string;
  state: string;
  postalCode: string;
  country?: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  phone?: string | null;
  role: UserRole;
  profileUrl?: string | null;
  address?: Address | null;
  accStatus: AccountStatus;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  message: string;
  user: User;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  phone: string;
  address?: Address;
}

export interface RegisterResponse {
  message: string;
  role: UserRole;
  user: User;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  token: string;
  newPassword: string;
}

export interface OAuthRequest {
  token: string;
}

export interface UpdateProfileRequest {
  name: string;
  phone: string;
}

export interface UpdatePhotoRequest {
  profileUrl: string;
}

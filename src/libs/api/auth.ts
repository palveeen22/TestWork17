import type { AuthResponse, LoginCredentials } from '../types';
import { apiClient } from './client';

// Auth API functions
export const loginUser = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  return apiClient.post<AuthResponse>('/auth/login', credentials);
};

export const getCurrentUser = async (): Promise<AuthResponse> => {
  return apiClient.get<AuthResponse>('/auth/me');
};

export const refreshToken = async (refreshToken: string): Promise<AuthResponse> => {
  return apiClient.post<AuthResponse>('/auth/refresh', { refreshToken });
};

// Auth API object (for grouped access)
export const authApi = {
  login: loginUser,
  getMe: getCurrentUser,
  refresh: refreshToken,
} as const;

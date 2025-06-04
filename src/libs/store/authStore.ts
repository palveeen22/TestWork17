import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { AuthState, User, LoginCredentials } from '../types';
import { loginUser } from '../api/auth';

interface AuthActions {
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  setUser: (user: User, token: string) => void;
  updateTokens: (tokens: { accessToken: string; refreshToken: string }) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
}

type AuthStore = AuthState & AuthActions;

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      // Initial state
      user: null,
      token: null,
      refreshToken: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      // Actions
      login: async (credentials: LoginCredentials) => {
        try {
          set({ isLoading: true, error: null });
          
          const response = await loginUser(credentials);
          
          set({
            user: response,
            token: response.accessToken || response.token,
            refreshToken: response.refreshToken,
            isAuthenticated: true,
            isLoading: false,
            error: null
          });
        } catch (error) {
          set({
            user: null,
            token: null,
            refreshToken: null,
            isAuthenticated: false,
            isLoading: false,
            error: error instanceof Error ? error.message : 'Login failed'
          });
          throw error;
        }
      },

      logout: () => {
        set({
          user: null,
          token: null,
          refreshToken: null,
          isAuthenticated: false,
          isLoading: false,
          error: null
        });
      },

      setUser: (user: User, token: string) => {
        set({
          user,
          token,
          isAuthenticated: true,
          error: null
        });
      },

      updateTokens: (tokens: { accessToken: string; refreshToken: string }) => {
        set({
          token: tokens.accessToken,
          refreshToken: tokens.refreshToken,
          error: null
        });
      },

      setLoading: (loading: boolean) => {
        set({ isLoading: loading });
      },

      setError: (error: string | null) => {
        set({ error, isLoading: false });
      },

      clearError: () => {
        set({ error: null });
      }
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        refreshToken: state.refreshToken,
        isAuthenticated: state.isAuthenticated
      })
    }
  )
);

// Setup event listeners for token refresh
if (typeof window !== 'undefined') {
  // Listen for token refresh events
  window.addEventListener('tokenRefreshed', (event: Event) => {
    const customEvent = event as CustomEvent;
    const { updateTokens } = useAuthStore.getState();
    updateTokens(customEvent.detail);
  });

  // Listen for token expiration events
  window.addEventListener('authTokenExpired', () => {
    const { logout } = useAuthStore.getState();
    logout();
  });
}

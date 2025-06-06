import { create } from 'zustand';
import type { User, LoginCredentials } from '../types';
import { getSessionAction, loginAction, logoutAction, refreshTokenAction } from '../actions/authAction';

interface AuthActions {
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => Promise<void>;
  checkSession: () => Promise<void>;
  setUser: (user: User) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
}

interface AuthStateSimplified {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

type AuthStore = AuthStateSimplified & AuthActions;

export const useAuthStore = create<AuthStore>((set, get) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  // Actions
  login: async (credentials: LoginCredentials) => {
    try {
      set({ isLoading: true, error: null });

      const result = await loginAction(credentials);

      if (result.success && result.user) {
        set({
          user: result.user,
          isAuthenticated: true,
          isLoading: false,
          error: null
        });
      } else {
        throw new Error(result.error || 'Login failed');
      }
    } catch (error) {
      set({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Login failed'
      });
      throw error;
    }
  },

  logout: async () => {
    try {
      set({ isLoading: true });

      const result = await logoutAction();

      if (result.success) {
        set({
          user: null,
          isAuthenticated: false,
          isLoading: false,
          error: null
        });
      } else {
        throw new Error(result.error || 'Logout failed');
      }
    } catch (error) {
      set({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null
      });
      console.error('Logout error:', error);
    }
  },

  checkSession: async () => {
    const { isLoading, isAuthenticated } = get();
    if (isLoading) {
      ('🛑 checkSession already running, skipping...');
      return;
    }

    if (isAuthenticated) {
      return;
    }

    try {
      set({ isLoading: true });
      const session = await getSessionAction();

      if (session.isAuthenticated && session.user) {
        set({
          user: session.user,
          isAuthenticated: true,
          isLoading: false,
          error: null
        });
      } else {
        set({
          user: null,
          isAuthenticated: false,
          isLoading: false,
          error: null
        });
      }
    } catch (error) {
      set({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null
      });
    }
  },

  // !!! HERE'S WHERE YOU USE refreshTokenAction, added correctly
  refreshTokens: async () => {
    try {
      await refreshTokenAction();

      // Refresh the session after token refresh
      await get().checkSession();

      return true;
    } catch (error) {
      console.error('Token refresh failed:', error);

      // Force logout on refresh failure
      set({
        user: null,
        isAuthenticated: false,
        error: 'Session expired. Please login again.',
      });

      return false;
    }
  },

  setUser: (user: User) => {
    set({
      user,
      isAuthenticated: true,
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
}));

if (typeof window !== 'undefined') {
  window.addEventListener('authTokenExpired', () => {
    const { logout } = useAuthStore.getState();
    logout();
  });
}
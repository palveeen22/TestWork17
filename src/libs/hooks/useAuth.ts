import { useRouter } from 'next/navigation';
import { useAuthStore } from '../store';
import type { LoginCredentials } from '../types';

export const useAuth = () => {
  const router = useRouter();
  const {
    user,
    token,
    isAuthenticated,
    isLoading,
    error,
    login,
    logout,
    clearError
  } = useAuthStore();

  const handleLogin = async (credentials: LoginCredentials) => {
    try {
      await login(credentials);
      router.push('/');
    } catch (error) {
      // Error is handled in store
      throw error;
    }
  };

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return {
    user,
    token,
    isAuthenticated,
    isLoading,
    error,
    login: handleLogin,
    logout: handleLogout,
    clearError
  };
};
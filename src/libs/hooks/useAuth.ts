import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '../store';
import type { LoginCredentials } from '../types';

export const useAuth = () => {
  const router = useRouter();
  const {
    user,
    isAuthenticated,
    isLoading,
    error,
    login,
    logout,
    checkSession,
    clearError
  } = useAuthStore();

  useEffect(() => {
    checkSession();
  }, []);

  const handleLogin = async (credentials: LoginCredentials) => {
    try {
      await login(credentials);
      router.push('/');
    } catch (error) {
      throw error;
    }
  };

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  return {
    user,
    isAuthenticated,
    isLoading,
    error,
    login: handleLogin,
    logout: handleLogout,
    clearError,
  };
};
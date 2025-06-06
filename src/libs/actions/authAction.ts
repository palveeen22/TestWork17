'use server';

import { cookies } from 'next/headers';
import { createTokenJose, createRefreshTokenJose } from '@/libs/utils/jwt';
import type { LoginCredentials, AuthResponse, AuthState } from '@/libs/types';
import { apiClient } from '@/libs/api/client';

export async function loginAction(credentials: LoginCredentials): Promise<AuthState> {
  try {
    if (!credentials.username || !credentials.password) {
      return {
        success: false,
        error: 'Username and password are required'
      };
    }

    if (credentials.username.length < 3 || credentials.password.length < 3) {
      return {
        success: false,
        error: 'Username and password must be at least 3 characters'
      };
    }

    const userData = await apiClient.post<AuthResponse>('/auth/login', {
      username: credentials.username,
      password: credentials.password,
    });

    const tokenPayload = {
      id: userData.id.toString(),
      email: userData.email,
      username: userData.username,
    };

    const [accessToken, refreshToken] = await Promise.all([
      createTokenJose(tokenPayload),
      createRefreshTokenJose(tokenPayload)
    ]);

    const cookieStore = await cookies();

    cookieStore.set('token', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 15 * 60,
      path: '/',
    });

    cookieStore.set('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60,
      path: '/',
    });

    cookieStore.set('user', JSON.stringify({
      id: userData.id,
      username: userData.username,
      email: userData.email,
      firstName: userData.firstName,
      lastName: userData.lastName,
    }), {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60,
      path: '/',
    });

    return {
      success: true,
      user: {
        id: userData.id,
        username: userData.username,
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
      }
    };

  } catch (error) {
    console.error('Login action error:', error);

    const errorMessage = error instanceof Error
      ? error.message
      : 'Something went wrong. Please try again.';

    return {
      success: false,
      error: errorMessage === 'An error occurred'
        ? 'Invalid username or password'
        : errorMessage
    };
  }
}

export async function logoutAction() {
  try {
    const cookieStore = await cookies();

    cookieStore.delete('token');
    cookieStore.delete('refreshToken');
    cookieStore.delete('user');

    return { success: true };
  } catch (error) {
    console.error('Logout action error:', error);
    return { success: false, error: 'Logout failed' };
  }
}

export async function getSessionAction() {
  try {
    const cookieStore = await cookies();
    const userCookie = cookieStore.get('user');
    const tokenCookie = cookieStore.get('token');

    if (!userCookie || !tokenCookie) {
      return {
        user: null,
        isAuthenticated: false
      };
    }

    return {
      user: JSON.parse(userCookie.value),
      isAuthenticated: true
    };
  } catch (error) {
    console.error('Session action error:', error);
    return {
      user: null,
      isAuthenticated: false
    };
  }
}

export async function refreshTokenAction() {
  try {
    const cookieStore = await cookies();
    const refreshTokenCookie = cookieStore.get('refreshToken');

    if (!refreshTokenCookie) {
      throw new Error('No refresh token');
    }

    const { readPayloadJose } = await import('@/libs/utils/jwt');
    const payload = await readPayloadJose<{ id: string; email: string; username: string }>(
      refreshTokenCookie.value
    );

    const [newAccessToken, newRefreshToken] = await Promise.all([
      createTokenJose(payload),
      createRefreshTokenJose(payload)
    ]);

    cookieStore.set('token', newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 15 * 60,
      path: '/',
    });

    cookieStore.set('refreshToken', newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60,
      path: '/',
    });

    return { success: true };
  } catch (error) {
    console.error('Refresh token action error:', error);

    const cookieStore = await cookies();
    cookieStore.delete('token');
    cookieStore.delete('refreshToken');
    cookieStore.delete('user');

    throw new Error('Token refresh failed');
  }
}
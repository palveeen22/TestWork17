'use client';

import React, { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button/Button';
import { Input } from '@/components/ui/Input/Input';
import { Alert } from '@/components/ui/Alert/Alert';
import { validatePassword, validateUsername } from '@/libs/utils';
import type { LoginCredentials } from '@/libs/types';
import styles from './LoginForm.module.scss';
import { loginAction } from '@/libs/actions/authAction';

export const LoginForm = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState<LoginCredentials>({
    username: '',
    password: '',
  });

  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const validateField = (name: string, value: string) => {
    let error = '';

    if (name === 'username') {
      error = validateUsername(value) || '';
    } else if (name === 'password') {
      error = validatePassword(value) || '';
    }

    setFieldErrors(prev => ({ ...prev, [name]: error }));
    return !error;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (touched[name]) {
      validateField(name, value);
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    validateField(name, value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validate all fields
    const usernameValid = validateField('username', formData.username);
    const passwordValid = validateField('password', formData.password);

    setTouched({ username: true, password: true });

    if (!usernameValid || !passwordValid) {
      return;
    }

    startTransition(async () => {
      try {
        const result = await loginAction(formData);
        
        if (result.success) {
          router.push('/');
          router.refresh();
        } else {
          setError(result.error || 'Login failed');
        }
      } catch (err) {
        setError('Something went wrong. Please try again.');
        console.error('Login error:', err);
      }
    });
  };

  return (
    <div className={styles.loginForm}>
      <h1 className={styles.title}>Login</h1>

      {error && (
        <Alert
          type="error"
          message={error}
          onClose={() => setError(null)}
        />
      )}

      <form onSubmit={handleSubmit} className={styles.form}>
        <Input
          label="Username"
          name="username"
          type="text"
          value={formData.username}
          onChange={handleChange}
          onBlur={handleBlur}
          error={fieldErrors.username}
          touched={touched.username}
          placeholder="Enter username"
          autoComplete="username"
          disabled={isPending}
        />

        <Input
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          onBlur={handleBlur}
          error={fieldErrors.password}
          touched={touched.password}
          placeholder="Enter password"
          autoComplete="current-password"
          disabled={isPending}
        />

        <Button
          type="submit"
          isLoading={isPending}
          className={styles.submitButton}
          disabled={isPending}
        >
          Login
        </Button>
      </form>

      <div className={styles.testCredentials}>
        <p className={styles.credentialsTitle}>Test Credentials:</p>
        <p>Username: <code>emilys</code></p>
        <p>Password: <code>emilyspass</code></p>
      </div>
    </div>
  );
};
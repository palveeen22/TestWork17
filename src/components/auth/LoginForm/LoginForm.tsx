'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button/Button';
import { Input } from '@/components/ui/Input/Input';
import { Alert } from '@/components/ui/Alert/Alert';
import styles from './LoginForm.module.scss';
import { useAuth } from '@/libs/hooks';
import { LoginCredentials } from '@/libs/types';
import { validatePassword, validateUsername } from '@/libs/utils';

export const LoginForm = () => {
  const { login, isLoading, error, clearError } = useAuth();

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
    clearError();

    // Validate all fields
    const usernameValid = validateField('username', formData.username);
    const passwordValid = validateField('password', formData.password);

    setTouched({ username: true, password: true });

    if (!usernameValid || !passwordValid) {
      return;
    }

    try {
      await login(formData);
    } catch (err) {
      // Error is handled by the auth store
      console.log(err);
    }
  };

  return (
    <div className={styles.loginForm}>
      <h1 className={styles.title}>Login</h1>

      {error && (
        <Alert
          type="error"
          message={error}
          onClose={clearError}
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
        />

        <Button
          type="submit"
          isLoading={isLoading}
          className={styles.submitButton}
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
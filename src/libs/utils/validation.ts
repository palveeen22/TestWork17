import type { ValidationError, LoginCredentials } from '../types';

// Individual validation functions
export const validateRequired = (value: string, fieldName: string): string | null => {
  if (!value || value.trim().length === 0) {
    return `${fieldName} is required`;
  }
  return null;
};

export const validateMinLength = (value: string, minLength: number, fieldName: string): string | null => {
  if (value && value.trim().length < minLength) {
    return `${fieldName} must be at least ${minLength} characters long`;
  }
  return null;
};

export const validateMaxLength = (value: string, maxLength: number, fieldName: string): string | null => {
  if (value && value.length > maxLength) {
    return `${fieldName} must be no more than ${maxLength} characters long`;
  }
  return null;
};

export const validateEmail = (email: string): string | null => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (email && !emailRegex.test(email)) {
    return 'Please enter a valid email address';
  }
  return null;
};

export const validateUsername = (username: string): string | null => {
  const required = validateRequired(username, 'Username');
  if (required) return required;

  const minLength = validateMinLength(username, 3, 'Username');
  if (minLength) return minLength;

  return null;
};

export const validatePassword = (password: string): string | null => {
  const required = validateRequired(password, 'Password');
  if (required) return required;

  const minLength = validateMinLength(password, 3, 'Password');
  if (minLength) return minLength;

  return null;
};

export const validateLoginForm = (credentials: LoginCredentials): ValidationError[] => {
  const errors: ValidationError[] = [];

  const usernameError = validateUsername(credentials.username);
  if (usernameError) {
    errors.push({ field: 'username', message: usernameError });
  }

  const passwordError = validatePassword(credentials.password);
  if (passwordError) {
    errors.push({ field: 'password', message: passwordError });
  }

  return errors;
};

// Validation utilities object (for grouped access)
export const validator = {
  required: validateRequired,
  minLength: validateMinLength,
  maxLength: validateMaxLength,
  email: validateEmail,
  username: validateUsername,
  password: validatePassword,
  loginForm: validateLoginForm,
} as const;
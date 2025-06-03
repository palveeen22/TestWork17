import React, { forwardRef } from 'react';
import styles from './Input.module.scss';
import { cn } from '@/libs/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  touched?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, touched, className, id, ...props }, ref) => {
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
    const hasError = touched && error;

    return (
      <div className={styles.inputGroup}>
        {label && (
          <label htmlFor={inputId} className={styles.label}>
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={cn(
            styles.input,
            hasError && styles.error,
            className
          )}
          {...props}
        />
        {hasError && (
          <span className={styles.errorMessage}>{error}</span>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
import React from 'react';
import styles from './Alert.module.scss';
import { AlertType } from '@/libs/types';
import { cn } from '@/libs/utils';

interface AlertProps {
  type: AlertType;
  message: string;
  onClose?: () => void;
  className?: string;
}

export const Alert = ({
  type,
  message,
  onClose,
  className
}: AlertProps) => {
  return (
    <div className={cn(styles.alert, styles[type], className)}>
      <span className={styles.message}>{message}</span>
      {onClose && (
        <button
          onClick={onClose}
          className={styles.closeButton}
          aria-label="Close alert"
        >
          ×
        </button>
      )}
    </div>
  );
};
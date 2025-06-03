import React from 'react';
import styles from './LoadingSpinner.module.scss';
import { cn } from '@/libs/utils';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  text?: string;
}

export const LoadingSpinner = ({
  size = 'md',
  className,
  text
}: LoadingSpinnerProps) => {
  return (
    <div className={cn(styles.container, className)}>
      <div className={cn(styles.spinner, styles[size])} />
      {text && <span className={styles.text}>{text}</span>}
    </div>
  );
};

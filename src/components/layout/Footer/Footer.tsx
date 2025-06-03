'use client';

import React from 'react';
import styles from './Footer.module.scss';
import { useAuth } from '@/libs/hooks';

export const Footer = () => {
  const { user, isAuthenticated } = useAuth();
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.content}>
          {isAuthenticated && user ? (
            <span>{currentYear} - Logged as {user.email}</span>
          ) : (
            <span>{currentYear}</span>
          )}
        </div>
      </div>
    </footer>
  );
};
'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button/Button';
import styles from './Header.module.scss';
import { useAuth } from '@/libs/hooks';

export const Header = () => {
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.info}>
          <span className={styles.infoItem}>
            📞 +021-95-51-84
          </span>
          <span className={styles.infoItem}>
            ✉️ shop@abelohost.com
          </span>
          <span className={styles.infoItem}>
            📍 1734 Stonecoal Road
          </span>
        </div>

        <Link href="/" className={styles.logo}>
          Abelohost Shop<span className={styles.accent}>.</span>
        </Link>

        <div className={styles.auth}>
          {isAuthenticated && user ? (
            <>
              <div className={styles.userInfo}>
                Welcome, {user.firstName} {user.lastName}
              </div>
              <Button variant="outline" onClick={logout}>
                Logout
              </Button>
            </>
          ) : (
            <Link href="/login">
              <Button>Login</Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};
'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Navigation.module.scss';
import { cn, navigationItems } from '@/libs/utils';

export const Navigation = () => {
  const pathname = usePathname();

  return (
    <nav className={styles.nav}>
      <div className={styles.container}>
        <ul className={styles.list}>
          {navigationItems?.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  styles.link,
                  pathname === item.href && styles.active
                )}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};
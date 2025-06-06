'use client';

import React from 'react';
import { ProductCard } from '../ProductCard/ProductCard';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner/LoadingSpinner';
import { Alert } from '@/components/ui/Alert/Alert';
import styles from './ProductGrid.module.scss';
import { Product } from '@/libs/types';

interface ProductGridProps {
  products: Product[];
  isLoading: boolean;
  isInitializing?: boolean;
  error: string | null;
  onRetry?: () => void;
}

export const ProductGrid = ({
  products,
  isLoading,
  isInitializing = false,
  error,
  onRetry
}: ProductGridProps) => {
  if (isLoading || isInitializing) {
    return (
      <div className={styles.loadingContainer}>
        <LoadingSpinner size="lg" text="Loading products..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <Alert
          type="error"
          message={error}
          onClose={onRetry}
        />
        {onRetry && (
          <button onClick={onRetry} className={styles.retryButton}>
            Try Again
          </button>
        )}
      </div>
    );
  }

  if (products.length === 0 && !isInitializing && !isLoading) {
    return (
      <div className={styles.emptyContainer}>
        <p>No products found.</p>
      </div>
    );
  }

  return (
    <div className={styles.grid}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};
'use client';

import React from 'react';
import { ProductGrid } from '../ProductGrid/ProductGrid';
import styles from './ProductsSection.module.scss';
import { useProducts } from '@/libs/hooks';
import { useProductsStore } from '@/libs/store';

export const ProductsSection = () => {
  const { isInitializing } = useProductsStore();
  const { products, isLoading, error, refetch } = useProducts();

  return (
    <section className={styles.section}>
      <div className="container">
        <h1 className={styles.title}>Latest Products</h1>
        <ProductGrid
          products={products}
          isLoading={isLoading}
          error={error}
          isInitializing={isInitializing}
          onRetry={refetch}
        />
      </div>
    </section>
  );
};
'use client';

import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/Button/Button';
import styles from './ProductCard.module.scss';
import { Product } from '@/libs/types';
import { useAuth } from '@/libs/hooks';
import { formatCategory, formatPrice } from '@/libs/utils';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const { isAuthenticated } = useAuth();

  const handleAddToCart = () => {
    // Placeholder for add to cart functionality
    console.log('Added to cart:', product.title);
  };

  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <Image
          src={product.thumbnail}
          alt={product.title}
          fill
          className={styles.image}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      <div className={styles.content}>
        <h3 className={styles.title}>{product.title}</h3>
        <div className={styles.category}>
          {formatCategory(product.category)}
        </div>
        <div className={styles.price}>
          {formatPrice(product.price)}
        </div>

        {isAuthenticated && (
          <Button
            onClick={handleAddToCart}
            className={styles.addButton}
          >
            Add to cart
          </Button>
        )}
      </div>
    </div>
  );
};
import { useEffect, useRef } from 'react';
import { useProductsStore } from '../store';

export const useProducts = (autoFetch = true, limit = 12) => {
  const {
    products,
    isLoading,
    error,
    fetchProducts,
    setLoading,
    setError,
    clearError
  } = useProductsStore();

  const hasFetched = useRef(false);

  useEffect(() => {
    if (autoFetch && products.length === 0 && !isLoading && !hasFetched.current) {
      hasFetched.current = true;
      fetchProducts(limit);
    }
  }, [autoFetch, products.length, isLoading, limit]);

  const refetch = () => {
    hasFetched.current = false;
    fetchProducts(limit);
  };

  return {
    products,
    isLoading,
    error,
    fetchProducts,
    refetch,
    setLoading,
    setError,
    clearError
  };
};
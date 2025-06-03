import { useEffect } from 'react';
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

  useEffect(() => {
    if (autoFetch && products.length === 0 && !isLoading) {
      fetchProducts(limit);
    }
  }, [autoFetch, products.length, isLoading, fetchProducts, limit]);

  const refetch = () => fetchProducts(limit);

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
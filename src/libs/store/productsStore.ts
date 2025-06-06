import { create } from 'zustand';
import type { ProductsState, Product } from '../types';
import { getProductsAction } from '../actions/productAction';

interface ProductsActions {
  fetchProducts: (limit?: number) => Promise<void>;
  setProducts: (products: Product[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
}

type ProductsStore = ProductsState & ProductsActions;

export const useProductsStore = create<ProductsStore>((set) => ({
  // Initial state
  products: [],
  isLoading: false,
  isInitializing: true,
  error: null,

  // Actions
  fetchProducts: async (limit = 12) => {
    try {
      set({ isLoading: true, error: null });

      const result = await getProductsAction(limit);

      if (result.success && result.data) {
        set({
          products: result.data.products,
          isLoading: false,
          isInitializing: false,
          error: null
        });
      } else {
        throw new Error(result.error || 'Failed to fetch products');
      }
    } catch (error) {
      set({
        products: [],
        isLoading: false,
        isInitializing: false,
        error: error instanceof Error ? error.message : 'Failed to fetch products'
      });
    }
  },

  setProducts: (products: Product[]) => {
    set({ products, error: null });
  },

  setLoading: (loading: boolean) => {
    set({ isLoading: loading });
  },

  setError: (error: string | null) => {
    set({ error, isLoading: false });
  },

  clearError: () => {
    set({ error: null });
  }
}));
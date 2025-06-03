import { create } from 'zustand';
import type { ProductsState, Product } from '../types';
import { fetchProducts } from '../api/products';

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
  error: null,

  // Actions
  fetchProducts: async (limit = 12) => {
    try {
      set({ isLoading: true, error: null });
      
      const response = await fetchProducts(limit);
      
      set({
        products: response.products,
        isLoading: false,
        error: null
      });
    } catch (error) {
      set({
        products: [],
        isLoading: false,
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
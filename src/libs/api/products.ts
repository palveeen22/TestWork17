import type { ProductsResponse, Product } from '../types';
import { apiClient } from './client';

// Individual product API functions
export const fetchProducts = async (limit = 12, skip = 0): Promise<ProductsResponse> => {
  return apiClient.get<ProductsResponse>(`/products?limit=${limit}&skip=${skip}`);
};

export const fetchProductById = async (id: number): Promise<Product> => {
  return apiClient.get<Product>(`/products/${id}`);
};

export const fetchProductsByCategory = async (category: string, limit = 12): Promise<ProductsResponse> => {
  return apiClient.get<ProductsResponse>(`/products/category/${category}?limit=${limit}`);
};

export const searchProducts = async (query: string, limit = 12): Promise<ProductsResponse> => {
  return apiClient.get<ProductsResponse>(`/products/search?q=${query}&limit=${limit}`);
};

export const fetchCategories = async (): Promise<string[]> => {
  return apiClient.get<string[]>('/products/categories');
};

// Products API object (for grouped access)
export const productsApi = {
  getProducts: fetchProducts,
  getProduct: fetchProductById,
  getProductsByCategory: fetchProductsByCategory,
  searchProducts,
  getCategories: fetchCategories,
} as const;
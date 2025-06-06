'use server';

import type { ProductsResponse, Product, IProductsActionResponse } from '@/libs/types';
import { apiClient } from '@/libs/api/client';


export async function getProductsAction(limit = 12, skip = 0): Promise<IProductsActionResponse> {
  try {
    const data = await apiClient.get<ProductsResponse>(`/products?limit=${limit}&skip=${skip}`);
    
    return {
      success: true,
      data
    };
  } catch (error) {
    console.error('Get products action error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch products'
    };
  }
}
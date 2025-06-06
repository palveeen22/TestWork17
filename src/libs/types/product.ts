export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

export interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export interface IProductsActionResponse {
  success: boolean;
  error?: string;
  data?: ProductsResponse;
}

export interface ProductsState {
  products: Product[];
  isLoading: boolean;
  isInitializing: boolean;
  error: string | null;
}
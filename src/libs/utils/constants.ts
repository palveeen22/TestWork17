export const API_ENDPOINTS = {
  LOGIN: '/auth/login',
  ME: '/auth/me',
  PRODUCTS: '/products',
  PRODUCT_BY_ID: (id: number) => `/products/${id}`,
  PRODUCTS_BY_CATEGORY: (category: string) => `/products/category/${category}`,
  SEARCH_PRODUCTS: '/products/search',
} as const;

export const STORAGE_KEYS = {
  AUTH: 'auth-storage',
  THEME: 'theme-preference',
  CART: 'shopping-cart',
} as const;

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  PRODUCTS: '/products',
  PROFILE: '/profile',
} as const;

export const VALIDATION_RULES = {
  USERNAME_MIN_LENGTH: 3,
  PASSWORD_MIN_LENGTH: 3,
  USERNAME_MAX_LENGTH: 50,
  PASSWORD_MAX_LENGTH: 100,
} as const;

export const UI_CONSTANTS = {
  PRODUCTS_PER_PAGE: 12,
  LOADING_DELAY: 300,
  TOAST_DURATION: 5000,
  MOBILE_BREAKPOINT: 768,
} as const;

// Test credentials for DummyJSON
export const TEST_CREDENTIALS = {
  username: 'emilys',
  password: 'emilyspass',
} as const;

export const navigationItems = [
  { href: '/', label: 'Home' },
  { href: '/hot-deals', label: 'Hot Deals' },
  { href: '/categories', label: 'Categories' },
  { href: '/laptops', label: 'Laptops' },
  { href: '/smartphones', label: 'Smartphones' },
  { href: '/cameras', label: 'Cameras' },
  { href: '/accessories', label: 'Accessories' },
];

export const MetaTitle = 'Abelohost Shop' as const;

export const MetaDesc = 'electronics, gadgets, laptops, smartphones, cameras, accessories' as const;

export const MetadataKey = 'electronics, gadgets, laptops, smartphones, cameras, accessories' as const;

import axios, { AxiosInstance, AxiosResponse } from 'axios';
import type { RequestConfig } from '../types';

// Create axios instance
const createAxiosInstance = (baseURL: string): AxiosInstance => {
  return axios.create({
    baseURL,
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

// Setup interceptors
const setupInterceptors = (instance: AxiosInstance): void => {
  // Request interceptor
  instance.interceptors.request.use(
    (config) => {
      // Add auth token if available
      if (typeof window !== 'undefined') {
        const authData = localStorage.getItem('auth-storage');
        if (authData) {
          try {
            const { state } = JSON.parse(authData);
            if (state?.token) {
              config.headers.Authorization = `Bearer ${state.token}`;
            }
          } catch (error) {
            console.warn('Failed to parse auth data:', error);
          }
        }
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  // Response interceptor
  instance.interceptors.response.use(
    (response: AxiosResponse) => response.data,
    (error) => {
      const message = error.response?.data?.message || error.message || 'An error occurred';
      return Promise.reject(new Error(message));
    }
  );
};

// Create configured axios instance
// should be using in env for secreat data, but i better using it immediately for this proji ))
const axiosInstance = createAxiosInstance('https://dummyjson.com');
setupInterceptors(axiosInstance);

// API client functions
export const apiClient = {
  async get<T>(url: string, config?: RequestConfig): Promise<T> {
    return axiosInstance.get(url, config);
  },

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async post<T>(url: string, data?: any, config?: RequestConfig): Promise<T> {
    return axiosInstance.post(url, data, config);
  },

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async put<T>(url: string, data?: any, config?: RequestConfig): Promise<T> {
    return axiosInstance.put(url, data, config);
  },

  async delete<T>(url: string, config?: RequestConfig): Promise<T> {
    return axiosInstance.delete(url, config);
  },

  // Helper to update base URL if needed
  updateBaseURL: (newBaseURL: string) => {
    axiosInstance.defaults.baseURL = newBaseURL;
  },

  // Helper to get current instance (for advanced use cases)
  getInstance: () => axiosInstance,
};
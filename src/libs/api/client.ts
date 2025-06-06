import axios, { AxiosInstance, AxiosResponse } from 'axios';
import type { RequestConfig } from '../types';

const createAxiosInstance = (baseURL: string): AxiosInstance => {
  return axios.create({
    baseURL,
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true,
  });
};

const setupInterceptors = (instance: AxiosInstance): void => {
  instance.interceptors.request.use(
    (config) => config,
    (error) => Promise.reject(error)
  );

  instance.interceptors.response.use(
    (response: AxiosResponse) => response.data,
    async (error) => {
      const originalRequest = error.config;

      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          await axiosInstance.post('/auth/refresh');
          return axiosInstance.request(originalRequest);
        } catch (refreshError) {
          window.dispatchEvent(new CustomEvent('authTokenExpired'));
          return Promise.reject(refreshError);
        }
      }

      const message = error.response?.data?.error || error.message || 'An error occurred';
      return Promise.reject(new Error(message));
    }
  );
};

const baseURL = process.env.NEXT_PUBLIC_API_URL || 'url';
const axiosInstance = createAxiosInstance(baseURL);
setupInterceptors(axiosInstance);

export const apiClient = {
  async get<T>(url: string, config?: RequestConfig): Promise<T> {
    return axiosInstance.get(url, config);
  },
  async post<T>(url: string, data?: any, config?: RequestConfig): Promise<T> {
    return axiosInstance.post(url, data, config);
  },
  async put<T>(url: string, data?: any, config?: RequestConfig): Promise<T> {
    return axiosInstance.put(url, data, config);
  },
  async delete<T>(url: string, config?: RequestConfig): Promise<T> {
    return axiosInstance.delete(url, config);
  },
  updateBaseURL: (newBaseURL: string) => {
    axiosInstance.defaults.baseURL = newBaseURL;
  },
  getInstance: () => axiosInstance,
};
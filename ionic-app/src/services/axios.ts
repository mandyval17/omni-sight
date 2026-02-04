import { API_BASE_URL } from '@/config/constants';
import type { CustomError } from '@/types/api.model';
import axios, { type InternalAxiosRequestConfig } from 'axios';

export const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 5_000, // 5 second timeout
  withCredentials: true,
});

let refreshPromise: Promise<unknown> | null = null;
let isRefreshing = false;

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    // Skip refresh for auth endpoints
    const isAuthEndpoint =
      original.url?.includes('/auth/refresh') ||
      original.url?.includes('/auth/login') ||
      original.url?.includes('/auth/me') ||
      original.url?.includes('/auth/register');

    // Auto-refresh on 401 for non-auth endpoints
    if (error.response?.status === 401 && !original._retry && !isAuthEndpoint) {
      original._retry = true;

      if (!isRefreshing) {
        isRefreshing = true;
        refreshPromise = axiosInstance
          .post('/auth/refresh')
          .catch((refreshError) => {
            console.error('Token refresh failed:', refreshError);
            return Promise.reject(refreshError);
          })
          .finally(() => {
            isRefreshing = false;
            refreshPromise = null;
          });
      }

      try {
        await refreshPromise;
        return axiosInstance(original);
      } catch {
        return Promise.reject(error);
      }
    }

    // Extract error message
    const message = error.response?.data?.message ?? error.message ?? 'Request failed';
    const err = new Error(message) as CustomError;
    err.response = error.response;
    return Promise.reject(err);
  }
);

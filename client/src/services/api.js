import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Store CSRF token
let csrfToken = null;

// Get CSRF token
export const getCsrfToken = async () => {
  if (!csrfToken) {
    try {
      const response = await api.get('/csrf-token');
      csrfToken = response.data.csrfToken;
    } catch (error) {
      console.error('Failed to get CSRF token:', error);
    }
  }
  return csrfToken;
};

// Request interceptor - Add CSRF token to mutations
api.interceptors.request.use(
  async (config) => {
    // Add CSRF token to state-changing requests
    if (['post', 'put', 'patch', 'delete'].includes(config.method.toLowerCase())) {
      const token = await getCsrfToken();
      if (token) {
        config.headers['X-CSRF-Token'] = token;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    // If CSRF token invalid, refresh it
    if (error.response?.status === 403 && error.response?.data?.message?.includes('CSRF')) {
      csrfToken = null; // Reset token
      const token = await getCsrfToken();
      
      // Retry original request
      const originalRequest = error.config;
      originalRequest.headers['X-CSRF-Token'] = token;
      return api(originalRequest);
    }

    if (error.response?.status === 401) {
      localStorage.removeItem('user');
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    
    return Promise.reject(error);
  }
);

export default api;
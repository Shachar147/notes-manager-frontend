import axios from 'axios';

// Set the base URL for all requests
axios.defaults.baseURL = '/'; // Use the proxy path

// Add request interceptor to include token in headers
axios.interceptors.request.use(
  config => {
    const token = document.cookie
      .split('; ')
      .find(row => row.startsWith('token='))
      ?.split('=')[1];
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

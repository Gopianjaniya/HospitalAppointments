import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
});

// Add a request interceptor to inject the token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    console.log(`Request to: ${config.url} | Token present: ${!!token}`);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Add a response interceptor to capture error details
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 || error.response?.status === 403) {
      console.error(`Auth Error (${error.response.status}):`, {
        url: error.config.url,
        message: error.response.data.message,
        error: error.response.data.error,
        headers: error.config.headers,
      });
    }
    return Promise.reject(error);
  },
);

export default api;

import axios from 'axios';

const API = axios.create({
  baseURL: process.env.API_BASE_URL,
  // Replace with your API base URL
});

// Request interceptor
API.interceptors.request.use(
  config => {
    const accessToken = process.env.AUTH_TOKEN;

    // If token is present add it to request's Authorization Header
    if (accessToken) {
      if (config.headers) {
        config.headers.token = `Bearer ${accessToken}`;
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
    }
    return config;
  },
  error => {
    // Handle request errors here

    return Promise.reject(error);
  },
);
// End of Request interceptor

// Response interceptor
API.interceptors.response.use(
  response => {
    // Modify the response data here

    return response;
  },
  error => {
    // Handle response errors here

    return Promise.reject(error);
  },
);
// End of Response interceptor

export default API;

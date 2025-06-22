// // import api from './api';

// // export const authService = {
// //   login: async (username, password) => {
// //     const response = await api.post('/auth/login/', { username, password });
// //     return response.data;
// //   },

// //   signup: async (userData) => {
// //     const response = await api.post('/auth/signup/', userData);
// //     return response.data;
// //   },

// //   refreshToken: async (refresh) => {
// //     const response = await api.post('/auth/refresh/', { refresh });
// //     return response.data;
// //   },
// // };

// import axios from 'axios';

// const API_URL = 'http://localhost:8000/api/';

// // Use a separate Axios instance to avoid dataService interceptors
// const authApi = axios.create({
//   baseURL: API_URL,
//   headers: {
//     'Content-Type': 'application/json',
//   },
//   timeout: 10000,
// });

// export const authService = {
//   login: async (username, password) => {
//     try {
//       const response = await authApi.post('/auth/login/', { username, password });
//       const { access, refresh } = response.data;
//       localStorage.setItem('accessToken', access);
//       localStorage.setItem('refreshToken', refresh);
//       console.log('Login successful:', { access, refresh });
//       return response.data;
//     } catch (error) {
//       console.error('Login failed:', {
//         status: error.response?.status,
//         data: error.response?.data,
//         message: error.message,
//       });
//       throw new Error(error.response?.data?.detail || 'Login failed');
//     }
//   },

//   signup: async (userData) => {
//     try {
//       const response = await authApi.post('/auth/signup/', userData);
//       const { access, refresh } = response.data;
//       localStorage.setItem('accessToken', access);
//       localStorage.setItem('refreshToken', refresh);
//       console.log('Signup successful:', { access, refresh });
//       return response.data;
//     } catch (error) {
//       console.error('Signup failed:', {
//         status: error.response?.status,
//         data: error.response?.data,
//         message: error.message,
//       });
//       throw new Error(error.response?.data?.detail || 'Signup failed');
//     }
//   },

//   refreshToken: async () => {
//     try {
//       const refresh = localStorage.getItem('refreshToken');
//       if (!refresh) throw new Error('No refresh token available');
//       const response = await authApi.post('/auth/refresh/', { refresh });
//       const { access } = response.data;
//       localStorage.setItem('accessToken', access);
//       console.log('Token refreshed:', { access });
//       return { access };
//     } catch (error) {
//       console.error('Token refresh failed:', {
//         status: error.response?.status,
//         data: error.response?.data,
//         message: error.message,
//       });
//       throw new Error(error.response?.data?.detail || 'Token refresh failed');
//     }
//   },

//   logout: async () => {
//     try {
//       localStorage.removeItem('accessToken');
//       localStorage.removeItem('refreshToken');
//       console.log('Logged out successfully');
//     } catch (error) {
//       console.error('Logout failed:', error.message);
//       throw error;
//     }
//   },
// };

// src/services/authService.js
import axios from 'axios';

const API_URL = 'http://localhost:8000/api/';

const authApi = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

export const authService = {
  login: async (username, password) => {
    try {
      const response = await authApi.post('/auth/login/', { username, password });
      const { access, user } = response.data;
      localStorage.setItem('token', access);
      localStorage.setItem('user', JSON.stringify(user));
      console.log('Login successful:', { access, user });
      return response.data;
    } catch (error) {
      console.error('Login failed:', {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message,
      });
      throw new Error(error.response?.data?.detail || 'Login failed');
    }
  },

  signup: async (userData) => {
    try {
      const response = await authApi.post('/auth/signup/', userData);
      const { access, user } = response.data;
      localStorage.setItem('token', access);
      localStorage.setItem('user', JSON.stringify(user));
      console.log('Signup successful:', { access, user });
      return response.data;
    } catch (error) {
      console.error('Signup failed:', {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message,
      });
      throw new Error(error.response?.data?.detail || 'Signup failed');
    }
  },

  logout: async () => {
    try {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      console.log('Logged out successfully');
    } catch (error) {
      console.error('Logout failed:', error.message);
      throw error;
    }
  },
};
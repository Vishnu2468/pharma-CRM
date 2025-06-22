import api from './api';

export const authService = {
  login: async (username, password) => {
    const response = await api.post('/auth/login/', { username, password });
    return response.data;
  },

  signup: async (userData) => {
    const response = await api.post('/auth/signup/', userData);
    return response.data;
  },

  refreshToken: async (refresh) => {
    const response = await api.post('/auth/refresh/', { refresh });
    return response.data;
  },
};
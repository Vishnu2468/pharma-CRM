import api from './api';

export const authService = {
  login: async (username: string, password: string) => {
    const response = await api.post('/auth/login/', { username, password });
    return response.data;
  },

  signup: async (userData: any) => {
    const response = await api.post('/auth/signup/', userData);
    return response.data;
  },

  refreshToken: async (refresh: string) => {
    const response = await api.post('/auth/refresh/', { refresh });
    return response.data;
  },
};
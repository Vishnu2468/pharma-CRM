import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { authService } from '../services/authService';
import Toast from 'react-native-toast-message';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStoredAuth();
  }, []);

  const loadStoredAuth = async () => {
    try {
      const [storedToken, storedUser] = await Promise.all([
        AsyncStorage.getItem('token'),
        AsyncStorage.getItem('user')
      ]);
      
      if (storedToken && storedUser) {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error('Error loading stored auth:', error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (username, password) => {
    try {
      const response = await authService.login(username, password);
      if (response.access) {
        setToken(response.access);
        setUser(response.user);
        await AsyncStorage.setItem('token', response.access);
        await AsyncStorage.setItem('user', JSON.stringify(response.user));
        Toast.show({
          type: 'success',
          text1: 'Login Successful',
          text2: 'Welcome back!'
        });
        return true;
      }
      return false;
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Login Failed',
        text2: 'Please check your credentials'
      });
      return false;
    }
  };

  const signup = async (userData) => {
    try {
      const response = await authService.signup(userData);
      if (response.access) {
        setToken(response.access);
        setUser(response.user);
        await AsyncStorage.setItem('token', response.access);
        await AsyncStorage.setItem('user', JSON.stringify(response.user));
        Toast.show({
          type: 'success',
          text1: 'Account Created',
          text2: 'Welcome to PharmaCRM!'
        });
        return true;
      }
      return false;
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Signup Failed',
        text2: 'Please try again'
      });
      return false;
    }
  };

  const logout = async () => {
    setUser(null);
    setToken(null);
    await AsyncStorage.multiRemove(['token', 'user']);
    Toast.show({
      type: 'success',
      text1: 'Logged Out',
      text2: 'See you next time!'
    });
  };

  return (
    <AuthContext.Provider value={{
      user,
      token,
      login,
      signup,
      logout,
      loading
    }}>
      {children}
    </AuthContext.Provider>
  );
};
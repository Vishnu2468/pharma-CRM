import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';
import toast from 'react-hot-toast';

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
    const savedToken = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');
    
    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (username, password) => {
    try {
      const response = await authService.login(username, password);
      if (response.access) {
        setToken(response.access);
        setUser(response.user);
        localStorage.setItem('token', response.access);
        localStorage.setItem('user', JSON.stringify(response.user));
        toast.success('Login successful');
        return true;
      }
      return false;
    } catch (error) {
      toast.error('Login failed');
      return false;
    }
  };

  const signup = async (userData) => {
    try {
      const response = await authService.signup(userData);
      if (response.access) {
        setToken(response.access);
        setUser(response.user);
        localStorage.setItem('token', response.access);
        localStorage.setItem('user', JSON.stringify(response.user));
        toast.success('Account created successfully');
        return true;
      }
      return false;
    } catch (error) {
      toast.error('Signup failed');
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    toast.success('Logged out successfully');
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
import React, { createContext, useState, useContext, useEffect } from 'react';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import { authAPI } from '../api';

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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const token = Cookies.get('token');
    if (token) {
      try {
        const response = await authAPI.getMe();
        setUser(response.data.user);
      } catch (error) {
        Cookies.remove('token');
        Cookies.remove('user');
      }
    }
    setLoading(false);
  };

  const login = async (email, password) => {
    try {
      const response = await authAPI.login({ email, password });
      const { token, user } = response.data;

      // Set cookies
      Cookies.set('token', token, { expires: 30 });
      Cookies.set('user', JSON.stringify(user), { expires: 30 });

      setUser(user);
      toast.success(`Welcome back, ${user.name}! 🎉`);
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || 'Login failed';
      return { success: false, error: message };
    }
  };

  const register = async (name, email, password) => {
    try {
      const response = await authAPI.register({ name, email, password });
      const { token, user } = response.data;

      // Set cookies
      Cookies.set('token', token, { expires: 30 });
      Cookies.set('user', JSON.stringify(user), { expires: 30 });

      setUser(user);
      toast.success(`Welcome to Expense Tracker, ${user.name}! 🎉`);
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || 'Registration failed';
      return { success: false, error: message };
    }
  };

  const logout = () => {
    Cookies.remove('token');
    Cookies.remove('user');
    setUser(null);
    toast.info('Logged out successfully');
    window.location.hash = '#/login';
  };

  const value = {
    user,
    login,
    register,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
import React, { createContext, useState, useEffect } from 'react';
import API from '../api/axios';
import { jwtDecode } from 'jwt-decode';
import { toast } from 'react-toastify';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        if (decoded.exp * 1000 < Date.now()) {
          localStorage.removeItem('token');
        } else {
          setUser(decoded);
        }
      } catch (error) {
        localStorage.removeItem('token');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const response = await API.post('/auth/login', { email, password });
    const { accessToken } = response.data;
    localStorage.setItem('token', accessToken);
    const decoded = jwtDecode(accessToken);
    setUser(decoded);
    toast.success('Login successful!');
    return response.data;
  };

  const register = async (userData) => {
    const response = await API.post('/auth/register', userData);
    const { accessToken } = response.data;
    localStorage.setItem('token', accessToken);
    const decoded = jwtDecode(accessToken);
    setUser(decoded);
    toast.success('Registration successful!');
    return response.data;
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    toast.success('Logged out');
  };

  const isAdmin = () => user?.roles?.includes('ROLE_ADMIN');

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

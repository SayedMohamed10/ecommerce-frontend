import React, { createContext, useState, useEffect } from 'react';
import API from '../api/axios';
import { toast } from 'react-toastify';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCart = async () => {
    try {
      const response = await API.get('/cart');
      setCart(response.data);
    } catch (error) {
      console.error('Failed to fetch cart');
    }
  };

  const addToCart = async (productId, quantity = 1) => {
    await API.post('/cart', { productId, quantity });
    await fetchCart();
    toast.success('Added to cart!');
  };

  const updateQuantity = async (productId, quantity) => {
    await API.put(`/cart/${productId}`, { quantity });
    await fetchCart();
  };

  const removeFromCart = async (productId) => {
    await API.delete(`/cart/${productId}`);
    await fetchCart();
    toast.success('Removed from cart');
  };

  const clearCart = async () => {
    await API.delete('/cart');
    setCart([]);
  };

  const getCartTotal = () => cart.reduce((total, item) => total + (item.subtotal || 0), 0);
  const getCartCount = () => cart.reduce((count, item) => count + item.quantity, 0);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) fetchCart();
  }, []);

  return (
    <CartContext.Provider value={{ cart, loading, addToCart, updateQuantity, removeFromCart, clearCart, getCartTotal, getCartCount, fetchCart }}>
      {children}
    </CartContext.Provider>
  );
};

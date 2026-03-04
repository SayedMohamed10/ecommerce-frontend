import React, { createContext, useState, useEffect } from 'react';
import API from '../api/axios';
import { toast } from 'react-toastify';

export const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchWishlist = async () => {
    try {
      const response = await API.get('/wishlist');
      setWishlist(response.data);
    } catch (error) {
      console.error('Failed to fetch wishlist');
    }
  };

  const addToWishlist = async (productId) => {
    await API.post('/wishlist', { productId });
    await fetchWishlist();
    toast.success('Added to wishlist!');
  };

  const removeFromWishlist = async (productId) => {
    await API.delete(`/wishlist/${productId}`);
    await fetchWishlist();
    toast.success('Removed from wishlist');
  };

  const isInWishlist = (productId) => wishlist.some(item => item.productId === productId);

  const moveToCart = async (productId) => {
    await API.post(`/wishlist/${productId}/move-to-cart`);
    await fetchWishlist();
    toast.success('Moved to cart!');
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) fetchWishlist();
  }, []);

  return (
    <WishlistContext.Provider value={{ wishlist, loading, addToWishlist, removeFromWishlist, isInWishlist, moveToCart, fetchWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import API from '../api/axios';
import { CartContext } from '../context/CartContext';
import { WishlistContext } from '../context/WishlistContext';
import { FiShoppingCart, FiHeart } from 'react-icons/fi';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useContext(CartContext);
  const { addToWishlist, isInWishlist } = useContext(WishlistContext);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const response = await API.get(`/products/${id}`);
      setProduct(response.data);
    } catch (error) {
      console.error('Failed to fetch product:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="container mx-auto px-4 py-12 flex justify-center"><div className="spinner"></div></div>;
  }

  if (!product) {
    return <div className="container mx-auto px-4 py-12 text-center"><p className="text-xl">Product not found</p></div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <img src={product.mainImage || 'https://via.placeholder.com/600'} alt={product.name} className="w-full rounded-lg shadow-md" />
        </div>

        <div>
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-gray-600 mb-6">{product.description}</p>

          <div className="mb-6">
            <span className="text-4xl font-bold text-primary-600">${product.discountPrice || product.price}</span>
            {product.discountPrice && <span className="text-xl text-gray-500 line-through ml-3">${product.price}</span>}
          </div>

          <div className="mb-6">
            {product.stock > 0 ? (
              <span className="text-green-600 font-semibold">In Stock ({product.stock} available)</span>
            ) : (
              <span className="text-red-600 font-semibold">Out of Stock</span>
            )}
          </div>

          <div className="flex items-center space-x-4 mb-6">
            <div className="flex items-center space-x-3">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-10 h-10 rounded border flex items-center justify-center">-</button>
              <span className="w-16 text-center font-semibold">{quantity}</span>
              <button onClick={() => setQuantity(Math.min(product.stock, quantity + 1))} disabled={quantity >= product.stock} className="w-10 h-10 rounded border flex items-center justify-center disabled:opacity-50">+</button>
            </div>
          </div>

          <div className="flex space-x-4">
            <button onClick={() => addToCart(product.id, quantity)} disabled={product.stock === 0} className="flex-1 btn-primary disabled:opacity-50 flex items-center justify-center space-x-2">
              <FiShoppingCart />
              <span>Add to Cart</span>
            </button>
            <button onClick={() => addToWishlist(product.id)} className={`p-3 rounded-lg border-2 ${isInWishlist(product.id) ? 'border-red-500 text-red-500' : 'border-gray-300 text-gray-600 hover:border-red-500 hover:text-red-500'} transition`}>
              <FiHeart className={`w-6 h-6 ${isInWishlist(product.id) ? 'fill-current' : ''}`} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;

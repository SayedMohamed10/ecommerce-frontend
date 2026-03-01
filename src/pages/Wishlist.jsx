import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { WishlistContext } from '../context/WishlistContext';
import { FiTrash2, FiShoppingCart, FiHeart } from 'react-icons/fi';

const Wishlist = () => {
  const { wishlist, loading, removeFromWishlist, moveToCart } = useContext(WishlistContext);

  if (loading) {
    return <div className="container mx-auto px-4 py-12 flex justify-center"><div className="spinner"></div></div>;
  }

  if (wishlist.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <FiHeart className="w-24 h-24 mx-auto text-gray-400 mb-4" />
        <h2 className="text-2xl font-bold mb-4">Your wishlist is empty</h2>
        <p className="text-gray-600 mb-8">Save items you love for later!</p>
        <Link to="/products" className="btn-primary">Browse Products</Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Wishlist ({wishlist.length})</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {wishlist.map((item) => (
          <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <Link to={`/products/${item.productId}`}>
              <img src={item.productMainImage || 'https://via.placeholder.com/300'} alt={item.productName} className="w-full h-48 object-cover hover:scale-105 transition duration-300" />
            </Link>
            <div className="p-4">
              <Link to={`/products/${item.productId}`}>
                <h3 className="font-semibold text-lg mb-2 hover:text-primary-600 transition">{item.productName}</h3>
              </Link>
              <div className="mb-4">
                <span className="text-2xl font-bold text-primary-600">${item.productDiscountPrice || item.productPrice}</span>
                {item.productDiscountPrice && <span className="text-sm text-gray-500 line-through ml-2">${item.productPrice}</span>}
              </div>
              <div className="mb-4">
                {item.isAvailable ? <span className="text-sm text-green-600">In Stock</span> : <span className="text-sm text-red-600">Out of Stock</span>}
              </div>
              <div className="flex space-x-2">
                <button onClick={() => moveToCart(item.productId)} disabled={!item.isAvailable} className="flex-1 btn-primary text-sm disabled:opacity-50 flex items-center justify-center space-x-2">
                  <FiShoppingCart /><span>Move to Cart</span>
                </button>
                <button onClick={() => removeFromWishlist(item.productId)} className="p-2 border-2 border-red-500 text-red-500 rounded-lg hover:bg-red-50 transition">
                  <FiTrash2 />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;

import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { WishlistContext } from '../context/WishlistContext';
import { CartContext } from '../context/CartContext';
import { FiTrash2, FiShoppingCart, FiHeart, FiPackage } from 'react-icons/fi';

const Wishlist = () => {
  const { wishlist, removeFromWishlist, moveToCart } = useContext(WishlistContext);
  const { addToCart } = useContext(CartContext);

  const handleMoveToCart = async (productId) => {
    try {
      await addToCart(productId);
      await removeFromWishlist(productId);
    } catch (error) {
      console.error('Failed to move to cart:', error);
    }
  };

  if (wishlist.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-pink-50 to-purple-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="bg-white rounded-3xl p-12 shadow-2xl max-w-md">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1, rotate: [0, 10, -10, 0] }}
              transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
              className="w-32 h-32 bg-gradient-to-br from-red-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <FiHeart className="w-16 h-16 text-red-500" />
            </motion.div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Your Wishlist is Empty</h2>
            <p className="text-gray-600 mb-8">Save your favorite items for later!</p>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-red-500 to-pink-600 text-white px-8 py-4 rounded-full font-semibold shadow-xl hover:shadow-2xl transform hover:scale-105 transition duration-300"
            >
              <FiPackage className="w-5 h-5" />
              Discover Products
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-pink-50 to-purple-50 py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
        >
          <div className="inline-flex items-center gap-3 mb-4">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <FiHeart className="w-12 h-12 text-red-500 fill-current" />
            </motion.div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-red-500 to-pink-600 bg-clip-text text-transparent">
              My Wishlist
            </h1>
          </div>
          <p className="text-gray-600 text-lg">
            {wishlist.length} {wishlist.length === 1 ? 'item' : 'items'} saved
          </p>
        </motion.div>

        {/* Wishlist Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          <AnimatePresence>
            {wishlist.map((item) => (
              <motion.div
                key={item.productId}
                variants={itemVariants}
                exit={{ opacity: 0, scale: 0.8 }}
                whileHover={{ y: -8 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden group hover:shadow-2xl transition-all duration-300"
              >
                <div className="relative overflow-hidden">
                  <Link to={`/products/${item.productId}`}>
                    <img
                      src={item.productImage || 'https://via.placeholder.com/400'}
                      alt={item.productName}
                      className="w-full h-64 object-cover group-hover:scale-110 transition duration-500"
                    />
                  </Link>

                  {/* Remove Button */}
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => removeFromWishlist(item.productId)}
                    className="absolute top-4 right-4 bg-white p-3 rounded-full shadow-lg hover:shadow-xl transition z-10 group-hover:bg-red-50"
                  >
                    <FiTrash2 className="w-5 h-5 text-red-500" />
                  </motion.button>

                  {/* Stock Badge */}
                  {item.stock === 0 && (
                    <div className="absolute top-4 left-4 bg-red-500 text-white px-4 py-2 rounded-full font-bold text-sm shadow-lg">
                      Out of Stock
                    </div>
                  )}
                  {item.stock > 0 && item.stock < 10 && (
                    <div className="absolute top-4 left-4 bg-yellow-500 text-white px-4 py-2 rounded-full font-bold text-sm shadow-lg">
                      Only {item.stock} Left!
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <Link to={`/products/${item.productId}`}>
                    <h3 className="font-bold text-lg mb-2 text-gray-800 hover:text-red-500 transition line-clamp-2">
                      {item.productName}
                    </h3>
                  </Link>

                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-bold bg-gradient-to-r from-red-500 to-pink-600 bg-clip-text text-transparent">
                      ${item.price}
                    </span>
                    {item.stock > 0 ? (
                      <span className="text-green-600 font-semibold text-sm">In Stock</span>
                    ) : (
                      <span className="text-red-600 font-semibold text-sm">Out of Stock</span>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-2">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleMoveToCart(item.productId)}
                      disabled={item.stock === 0}
                      className="w-full bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-3 px-6 rounded-xl shadow-md hover:shadow-lg transition duration-300 flex items-center justify-center gap-2"
                    >
                      <FiShoppingCart className="w-5 h-5" />
                      {item.stock === 0 ? 'Out of Stock' : 'Move to Cart'}
                    </motion.button>

                    <Link
                      to={`/products/${item.productId}`}
                      className="block w-full text-center bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-3 px-6 rounded-xl transition duration-300"
                    >
                      View Details
                    </Link>
                  </div>

                  {/* Added Date */}
                  {item.addedAt && (
                    <p className="text-xs text-gray-500 mt-4 text-center">
                      Added {new Date(item.addedAt).toLocaleDateString()}
                    </p>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-red-500 to-pink-600 rounded-3xl p-12 shadow-2xl">
            <h2 className="text-3xl font-bold text-white mb-4">Looking for More?</h2>
            <p className="text-white text-lg mb-8 opacity-90">
              Explore our collection and find more products you'll love!
            </p>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 bg-white text-red-600 px-8 py-4 rounded-full font-bold shadow-xl hover:shadow-2xl transform hover:scale-105 transition duration-300"
            >
              <FiPackage className="w-5 h-5" />
              Browse All Products
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Wishlist;

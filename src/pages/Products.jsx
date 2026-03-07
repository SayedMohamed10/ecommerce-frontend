import React, { useState, useEffect, useContext } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import API from '../api/axios';
import { FiHeart, FiShoppingCart, FiSearch, FiFilter, FiX } from 'react-icons/fi';
import { CartContext } from '../context/CartContext';
import { WishlistContext } from '../context/WishlistContext';

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  
  const { addToCart } = useContext(CartContext);
  const { addToWishlist, isInWishlist } = useContext(WishlistContext);

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [searchParams, currentPage]);

  const fetchCategories = async () => {
    try {
      const response = await API.get('/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    }
  };

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const search = searchParams.get('search') || '';
      const category = searchParams.get('category') || '';
      
      let url = `/products?page=${currentPage}&size=12`;
      if (search) url += `&search=${encodeURIComponent(search)}`;
      if (category) url += `&category=${category}`;
      
      const response = await API.get(url);
      setProducts(response.data.products || []);
      setTotalPages(response.data.pagination?.totalPages || 0);
    } catch (error) {
      console.error('Failed to fetch products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm) {
      setSearchParams({ search: searchTerm });
    } else {
      setSearchParams({});
    }
  };

  const handleCategoryFilter = (categoryId) => {
    setSelectedCategory(categoryId);
    if (categoryId) {
      setSearchParams({ category: categoryId });
    } else {
      setSearchParams({});
    }
  };

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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white py-12">
        <div className="container mx-auto px-4">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold mb-4 text-center"
          >
            Discover Amazing Products
          </motion.h1>
          
          {/* Search Bar */}
          <motion.form 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            onSubmit={handleSearch}
            className="max-w-2xl mx-auto mt-8"
          >
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search for products..."
                className="w-full px-6 py-4 pr-24 rounded-full text-gray-900 shadow-2xl focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50"
              />
              <button
                type="submit"
                className="absolute right-2 top-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full hover:shadow-lg transform hover:scale-105 transition duration-300 flex items-center gap-2"
              >
                <FiSearch className="w-5 h-5" />
                <span className="hidden sm:inline">Search</span>
              </button>
            </div>
          </motion.form>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Sidebar - Desktop */}
          <motion.aside 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="hidden lg:block w-64 space-y-6"
          >
            <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-lg text-gray-800">Filters</h3>
                <FiFilter className="w-5 h-5 text-gray-600" />
              </div>
              
              <div className="space-y-2">
                <button
                  onClick={() => handleCategoryFilter('')}
                  className={`block w-full text-left px-4 py-3 rounded-xl transition duration-200 ${
                    selectedCategory === '' 
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg' 
                      : 'hover:bg-gray-100 text-gray-700'
                  }`}
                >
                  All Products
                </button>
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => handleCategoryFilter(category.id)}
                    className={`block w-full text-left px-4 py-3 rounded-xl transition duration-200 ${
                      selectedCategory === category.id 
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg' 
                        : 'hover:bg-gray-100 text-gray-700'
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>
          </motion.aside>

          {/* Mobile Filter Button */}
          <div className="lg:hidden fixed bottom-6 right-6 z-40">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-110 transition duration-300"
            >
              <FiFilter className="w-6 h-6" />
            </button>
          </div>

          {/* Mobile Filter Modal */}
          {showFilters && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end"
              onClick={() => setShowFilters(false)}
            >
              <motion.div 
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                className="bg-white w-full rounded-t-3xl p-6 max-h-96 overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-bold text-lg">Filters</h3>
                  <button onClick={() => setShowFilters(false)}>
                    <FiX className="w-6 h-6" />
                  </button>
                </div>
                <div className="space-y-2">
                  <button
                    onClick={() => {
                      handleCategoryFilter('');
                      setShowFilters(false);
                    }}
                    className={`block w-full text-left px-4 py-3 rounded-xl transition ${
                      selectedCategory === '' ? 'bg-blue-600 text-white' : 'hover:bg-gray-100'
                    }`}
                  >
                    All Products
                  </button>
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => {
                        handleCategoryFilter(category.id);
                        setShowFilters(false);
                      }}
                      className={`block w-full text-left px-4 py-3 rounded-xl transition ${
                        selectedCategory === category.id ? 'bg-blue-600 text-white' : 'hover:bg-gray-100'
                      }`}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* Products Grid */}
          <div className="flex-1">
            {loading ? (
              <div className="flex justify-center items-center py-20">
                <div className="relative">
                  <div className="w-20 h-20 border-4 border-blue-200 rounded-full"></div>
                  <div className="w-20 h-20 border-4 border-blue-600 border-t-transparent rounded-full animate-spin absolute top-0"></div>
                </div>
              </div>
            ) : products.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-20"
              >
                <div className="bg-white rounded-3xl p-12 shadow-xl max-w-md mx-auto">
                  <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <FiShoppingCart className="w-12 h-12 text-blue-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-3">No Products Found</h3>
                  <p className="text-gray-600 mb-6">Try adjusting your search or filters</p>
                  <button
                    onClick={() => {
                      setSearchTerm('');
                      setSelectedCategory('');
                      setSearchParams({});
                    }}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition duration-300"
                  >
                    Clear Filters
                  </button>
                </div>
              </motion.div>
            ) : (
              <>
                <motion.div 
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
                >
                  {products.map((product) => (
                    <motion.div
                      key={product.id}
                      variants={itemVariants}
                      whileHover={{ y: -8 }}
                      className="bg-white rounded-2xl shadow-lg overflow-hidden group hover:shadow-2xl transition-all duration-300"
                    >
                      <div className="relative overflow-hidden">
                        <Link to={`/products/${product.id}`}>
                          <img
                            src={product.images?.[0] || 'https://via.placeholder.com/400'}
                            alt={product.name}
                            className="w-full h-64 object-cover group-hover:scale-110 transition duration-500"
                          />
                        </Link>
                        
                        <button
                          onClick={() => addToWishlist(product.id)}
                          className="absolute top-4 right-4 bg-white p-3 rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition duration-300 z-10"
                        >
                          <FiHeart 
                            className={`w-5 h-5 ${isInWishlist(product.id) ? 'fill-current text-red-500' : 'text-gray-600'}`} 
                          />
                        </button>

                        {product.stock === 0 && (
                          <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
                            <span className="bg-red-500 text-white px-6 py-2 rounded-full font-bold">
                              Out of Stock
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="p-6">
                        <Link to={`/products/${product.id}`}>
                          <h3 className="font-bold text-lg mb-2 text-gray-800 hover:text-blue-600 transition line-clamp-2">
                            {product.name}
                          </h3>
                        </Link>

                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-baseline gap-2">
                            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                              ${product.price}
                            </span>
                            <span className="text-sm text-green-600 font-semibold">
                              {product.stock > 0 ? 'In Stock' : ''}
                            </span>
                          </div>
                        </div>

                        <button
                          onClick={() => addToCart(product.id)}
                          disabled={product.stock === 0}
                          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-3 px-6 rounded-xl shadow-md hover:shadow-lg transform hover:scale-105 transition duration-300 flex items-center justify-center gap-2"
                        >
                          <FiShoppingCart className="w-5 h-5" />
                          Add to Cart
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center items-center gap-2 mt-12">
                    <button
                      onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
                      disabled={currentPage === 0}
                      className="px-6 py-3 bg-white border-2 border-gray-200 rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:border-blue-600 hover:text-blue-600 transition duration-300"
                    >
                      Previous
                    </button>
                    
                    <div className="flex items-center gap-2">
                      {[...Array(Math.min(5, totalPages))].map((_, idx) => {
                        const pageNum = idx + Math.max(0, currentPage - 2);
                        if (pageNum >= totalPages) return null;
                        return (
                          <button
                            key={pageNum}
                            onClick={() => setCurrentPage(pageNum)}
                            className={`w-12 h-12 rounded-xl font-semibold transition duration-300 ${
                              currentPage === pageNum
                                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                                : 'bg-white border-2 border-gray-200 hover:border-blue-600 hover:text-blue-600'
                            }`}
                          >
                            {pageNum + 1}
                          </button>
                        );
                      })}
                    </div>

                    <button
                      onClick={() => setCurrentPage(Math.min(totalPages - 1, currentPage + 1))}
                      disabled={currentPage >= totalPages - 1}
                      className="px-6 py-3 bg-white border-2 border-gray-200 rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:border-blue-600 hover:text-blue-600 transition duration-300"
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;

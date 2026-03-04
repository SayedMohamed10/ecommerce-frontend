import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../api/axios';
import { FiTruck, FiDollarSign, FiAward, FiShoppingCart, FiHeart, FiStar } from 'react-icons/fi';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  const fetchFeaturedProducts = async () => {
    try {
      const response = await API.get('/products?page=0&size=6');
      setFeaturedProducts(response.data.content || []);
    } catch (error) {
      console.error('Failed to fetch products:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section with Gradient */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white py-20">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">
              Welcome to <span className="text-yellow-300">ShopHub</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Discover amazing products at unbeatable prices
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/products"
                className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-4 px-8 rounded-full text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition duration-300"
              >
                Shop Now
              </Link>
              <Link
                to="/register"
                className="bg-white bg-opacity-20 hover:bg-opacity-30 backdrop-blur-sm text-white font-bold py-4 px-8 rounded-full text-lg border-2 border-white shadow-xl hover:shadow-2xl transform hover:scale-105 transition duration-300"
              >
                Sign Up Free
              </Link>
            </div>
          </div>
        </div>
        
        {/* Decorative shapes */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" className="w-full h-12 md:h-20">
            <path fill="#ffffff" d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"></path>
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition duration-300 text-center group">
              <div className="inline-block p-4 bg-gradient-to-br from-green-400 to-green-600 rounded-full mb-4 group-hover:scale-110 transition duration-300">
                <FiTruck className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">Free Shipping</h3>
              <p className="text-gray-600">On orders over $50</p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition duration-300 text-center group">
              <div className="inline-block p-4 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full mb-4 group-hover:scale-110 transition duration-300">
                <FiDollarSign className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">Best Prices</h3>
              <p className="text-gray-600">Guaranteed low prices</p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition duration-300 text-center group">
              <div className="inline-block p-4 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full mb-4 group-hover:scale-110 transition duration-300">
                <FiAward className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">Top Quality</h3>
              <p className="text-gray-600">Premium products</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Featured Products</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
          </div>

          {loading ? (
            <div className="flex justify-center py-12">
              <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
            </div>
          ) : featuredProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600 mb-6">No products available yet</p>
              <Link to="/products" className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-full transition">
                Browse All Products
              </Link>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {featuredProducts.map((product) => (
                  <div key={product.id} className="bg-white rounded-2xl shadow-lg overflow-hidden group hover:shadow-2xl transition duration-300">
                    <div className="relative overflow-hidden">
                      <img
                        src={product.mainImage || 'https://via.placeholder.com/400'}
                        alt={product.name}
                        className="w-full h-64 object-cover group-hover:scale-110 transition duration-500"
                      />
                      <div className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-lg opacity-0 group-hover:opacity-100 transition duration-300">
                        <FiHeart className="w-5 h-5 text-red-500 hover:fill-current cursor-pointer" />
                      </div>
                      {product.discountPrice && (
                        <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                          SALE
                        </div>
                      )}
                    </div>

                    <div className="p-6">
                      <Link to={`/products/${product.id}`}>
                        <h3 className="font-bold text-lg mb-2 text-gray-800 hover:text-blue-600 transition line-clamp-2">
                          {product.name}
                        </h3>
                      </Link>

                      <div className="flex items-center mb-3">
                        <div className="flex text-yellow-400">
                          {[...Array(5)].map((_, i) => (
                            <FiStar key={i} className="w-4 h-4 fill-current" />
                          ))}
                        </div>
                        <span className="text-sm text-gray-500 ml-2">(4.5)</span>
                      </div>

                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <span className="text-2xl font-bold text-blue-600">
                            ${product.discountPrice || product.price}
                          </span>
                          {product.discountPrice && (
                            <span className="text-sm text-gray-400 line-through ml-2">
                              ${product.price}
                            </span>
                          )}
                        </div>
                        <span className="text-sm text-green-600 font-semibold">
                          {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                        </span>
                      </div>

                      <button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 px-6 rounded-full transition duration-300 transform hover:scale-105 shadow-md hover:shadow-lg flex items-center justify-center gap-2">
                        <FiShoppingCart className="w-5 h-5" />
                        Add to Cart
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-center mt-12">
                <Link
                  to="/products"
                  className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 px-10 rounded-full text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition duration-300"
                >
                  View All Products
                </Link>
              </div>
            </>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Start Shopping?</h2>
          <p className="text-xl text-white mb-8 max-w-2xl mx-auto opacity-90">
            Join thousands of happy customers and discover amazing deals today!
          </p>
          <Link
            to="/register"
            className="inline-block bg-white text-purple-600 font-bold py-4 px-10 rounded-full text-lg shadow-2xl hover:shadow-3xl transform hover:scale-105 transition duration-300"
          >
            Create Free Account
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;

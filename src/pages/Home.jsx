import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../api/axios';
import { FiArrowRight, FiTrendingUp, FiTag, FiTruck } from 'react-icons/fi';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  const fetchFeaturedProducts = async () => {
    try {
      const response = await API.get('/products?page=0&size=8');
      setFeaturedProducts(response.data.content || []);
    } catch (error) {
      console.error('Failed to fetch products:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Welcome to ShopHub</h1>
          <p className="text-xl md:text-2xl mb-8">Discover amazing products at great prices</p>
          <Link to="/products" className="bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition inline-flex items-center space-x-2">
            <span>Shop Now</span>
            <FiArrowRight />
          </Link>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <FiTruck className="w-12 h-12 mx-auto text-primary-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Free Shipping</h3>
              <p className="text-gray-600">On orders over $50</p>
            </div>
            <div className="text-center p-6">
              <FiTag className="w-12 h-12 mx-auto text-primary-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Best Prices</h3>
              <p className="text-gray-600">Guaranteed low prices</p>
            </div>
            <div className="text-center p-6">
              <FiTrendingUp className="w-12 h-12 mx-auto text-primary-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Top Quality</h3>
              <p className="text-gray-600">Premium products</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Products</h2>
          
          {loading ? (
            <div className="flex justify-center"><div className="spinner"></div></div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <Link key={product.id} to={`/products/${product.id}`} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition group">
                  <div className="aspect-w-1 aspect-h-1 bg-gray-200">
                    <img src={product.mainImage || 'https://via.placeholder.com/300'} alt={product.name} className="w-full h-64 object-cover group-hover:scale-105 transition duration-300" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-2 truncate">{product.name}</h3>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-primary-600">${product.price}</span>
                      {product.discountPrice && <span className="text-sm text-gray-500 line-through">${product.discountPrice}</span>}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Link to="/products" className="btn-primary inline-flex items-center space-x-2">
              <span>View All Products</span>
              <FiArrowRight />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

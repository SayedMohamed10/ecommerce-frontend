import React, { useState, useEffect, useContext } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import API from '../api/axios';
import { FiHeart, FiShoppingCart } from 'react-icons/fi';
import { CartContext } from '../context/CartContext';
import { WishlistContext } from '../context/WishlistContext';

const Products = () => {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  
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
      setProducts(response.data.content || []);
      setTotalPages(response.data.totalPages || 0);
    } catch (error) {
      console.error('Failed to fetch products:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        <aside className="w-full md:w-64 space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-semibold text-lg mb-4">Categories</h3>
            <div className="space-y-2">
              <button className="block w-full text-left px-4 py-2 rounded hover:bg-gray-100">
                All Products
              </button>
              {categories.map((category) => (
                <button key={category.id} className="block w-full text-left px-4 py-2 rounded hover:bg-gray-100">
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </aside>

        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-8">Products</h1>

          {loading ? (
            <div className="flex justify-center py-12"><div className="spinner"></div></div>
          ) : products.length === 0 ? (
            <div className="text-center py-12"><p className="text-gray-600 text-lg">No products found</p></div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden group">
                    <Link to={`/products/${product.id}`}>
                      <img src={product.mainImage || 'https://via.placeholder.com/300'} alt={product.name} className="w-full h-64 object-cover group-hover:scale-105 transition duration-300" />
                    </Link>
                    
                    <div className="p-4">
                      <Link to={`/products/${product.id}`}>
                        <h3 className="font-semibold text-lg mb-2 hover:text-primary-600 transition">{product.name}</h3>
                      </Link>
                      
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-2xl font-bold text-primary-600">${product.price}</span>
                        <span className="text-sm text-green-600">{product.stock > 0 ? 'In Stock' : 'Out of Stock'}</span>
                      </div>

                      <div className="flex space-x-2">
                        <button onClick={() => addToCart(product.id)} disabled={product.stock === 0} className="flex-1 btn-primary text-sm disabled:opacity-50">
                          <FiShoppingCart className="inline mr-1" /> Add to Cart
                        </button>
                        <button onClick={() => addToWishlist(product.id)} className="p-2 border-2 rounded-lg">
                          <FiHeart className={isInWishlist(product.id) ? 'fill-current text-red-500' : ''} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {totalPages > 1 && (
                <div className="flex justify-center mt-8 space-x-2">
                  <button onClick={() => setCurrentPage(p => Math.max(0, p - 1))} disabled={currentPage === 0} className="px-4 py-2 border rounded disabled:opacity-50">
                    Previous
                  </button>
                  <span className="px-4 py-2">Page {currentPage + 1} of {totalPages}</span>
                  <button onClick={() => setCurrentPage(p => Math.min(totalPages - 1, p + 1))} disabled={currentPage >= totalPages - 1} className="px-4 py-2 border rounded disabled:opacity-50">
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;

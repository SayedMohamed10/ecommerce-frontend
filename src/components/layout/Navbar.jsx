import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { CartContext } from '../../context/CartContext';
import { FiShoppingCart, FiHeart, FiUser, FiMenu, FiX, FiLogOut } from 'react-icons/fi';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { getCartCount } = useContext(CartContext);
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setMobileMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-primary-600">
            ShopHub
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-primary-600 transition">
              Home
            </Link>
            <Link to="/products" className="text-gray-700 hover:text-primary-600 transition">
              Products
            </Link>
            
            {user ? (
              <>
                <Link to="/wishlist" className="relative text-gray-700 hover:text-primary-600 transition">
                  <FiHeart className="w-6 h-6" />
                </Link>
                <Link to="/cart" className="relative text-gray-700 hover:text-primary-600 transition">
                  <FiShoppingCart className="w-6 h-6" />
                  {getCartCount() > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {getCartCount()}
                    </span>
                  )}
                </Link>
                <Link to="/profile" className="text-gray-700 hover:text-primary-600 transition">
                  <FiUser className="w-6 h-6" />
                </Link>
                <button onClick={handleLogout} className="text-gray-700 hover:text-red-600 transition">
                  <FiLogOut className="w-6 h-6" />
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-700 hover:text-primary-600 transition">
                  Login
                </Link>
                <Link to="/register" className="btn-primary">
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden">
            {mobileMenuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <Link to="/" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-gray-700 hover:text-primary-600">
              Home
            </Link>
            <Link to="/products" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-gray-700 hover:text-primary-600">
              Products
            </Link>
            {user ? (
              <>
                <Link to="/wishlist" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-gray-700 hover:text-primary-600">
                  Wishlist
                </Link>
                <Link to="/cart" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-gray-700 hover:text-primary-600">
                  Cart {getCartCount() > 0 && `(${getCartCount()})`}
                </Link>
                <Link to="/profile" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-gray-700 hover:text-primary-600">
                  Profile
                </Link>
                <button onClick={handleLogout} className="block w-full text-left py-2 text-red-600">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-gray-700 hover:text-primary-600">
                  Login
                </Link>
                <Link to="/register" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-gray-700 hover:text-primary-600">
                  Register
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiMail, FiFacebook, FiTwitter, FiInstagram, FiGithub, FiShoppingBag, FiSend } from 'react-icons/fi';

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    // Handle newsletter subscription
    setEmail('');
    alert('Thanks for subscribing!');
  };

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white">
      {/* Newsletter Section */}
      <div className="border-b border-white border-opacity-10">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-3xl font-bold mb-4">
                Subscribe to Our Newsletter
              </h3>
              <p className="text-blue-200 mb-8">
                Get the latest updates on new products and exclusive offers!
              </p>

              <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <div className="flex-1 relative">
                  <FiMail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="w-full pl-12 pr-4 py-4 bg-white bg-opacity-10 border border-white border-opacity-20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 transition"
                  />
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-4 rounded-xl font-semibold shadow-xl hover:shadow-2xl transition duration-300 flex items-center justify-center gap-2"
                >
                  <FiSend className="w-5 h-5" />
                  Subscribe
                </motion.button>
              </form>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <FiShoppingBag className="w-6 h-6" />
              </div>
              <span className="text-2xl font-bold">ShopHub</span>
            </div>
            <p className="text-blue-200 mb-6">
              Your one-stop shop for amazing products at great prices.
            </p>

            {/* Social Links */}
            <div className="flex gap-3">
              <motion.a
                whileHover={{ scale: 1.1, y: -2 }}
                href="#"
                className="w-10 h-10 bg-white bg-opacity-10 rounded-full flex items-center justify-center hover:bg-blue-600 transition"
              >
                <FiFacebook className="w-5 h-5" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1, y: -2 }}
                href="#"
                className="w-10 h-10 bg-white bg-opacity-10 rounded-full flex items-center justify-center hover:bg-blue-400 transition"
              >
                <FiTwitter className="w-5 h-5" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1, y: -2 }}
                href="#"
                className="w-10 h-10 bg-white bg-opacity-10 rounded-full flex items-center justify-center hover:bg-pink-600 transition"
              >
                <FiInstagram className="w-5 h-5" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1, y: -2 }}
                href="#"
                className="w-10 h-10 bg-white bg-opacity-10 rounded-full flex items-center justify-center hover:bg-gray-700 transition"
              >
                <FiGithub className="w-5 h-5" />
              </motion.a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/products" className="text-blue-200 hover:text-white transition">
                  Products
                </Link>
              </li>
              <li>
                <Link to="#" className="text-blue-200 hover:text-white transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="#" className="text-blue-200 hover:text-white transition">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="font-bold text-lg mb-4">Customer Service</h4>
            <ul className="space-y-3">
              <li>
                <Link to="#" className="text-blue-200 hover:text-white transition">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="#" className="text-blue-200 hover:text-white transition">
                  Shipping
                </Link>
              </li>
              <li>
                <Link to="#" className="text-blue-200 hover:text-white transition">
                  Returns
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-bold text-lg mb-4">Contact Us</h4>
            <ul className="space-y-3 text-blue-200">
              <li>Email: support@shophub.com</li>
              <li>Phone: +1 (555) 123-4567</li>
              <li>Address: 123 Shop Street, City, Country</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white border-opacity-10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-blue-200 text-sm">
              © 2026 ShopHub. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <Link to="#" className="text-blue-200 hover:text-white transition">
                Privacy Policy
              </Link>
              <Link to="#" className="text-blue-200 hover:text-white transition">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AuthContext } from '../context/AuthContext';
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff, FiPhone, FiShoppingBag, FiCheck } from 'react-icons/fi';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    setLoading(true);
    try {
      const { confirmPassword, ...registerData } = formData;
      await register(registerData);
      navigate('/');
    } catch (error) {
      // Error handled by context
    } finally {
      setLoading(false);
    }
  };

  const passwordStrength = (password) => {
    if (password.length === 0) return 0;
    if (password.length < 6) return 25;
    if (password.length < 8) return 50;
    if (password.length >= 8 && /[A-Z]/.test(password) && /[0-9]/.test(password)) return 100;
    return 75;
  };

  const strength = passwordStrength(formData.password);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-600 to-red-600 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute -top-1/2 -left-1/2 w-full h-full bg-white opacity-10 rounded-full"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-white opacity-10 rounded-full"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative z-10"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
            className="inline-block"
          >
            <div className="w-20 h-20 bg-white rounded-3xl shadow-2xl flex items-center justify-center mx-auto mb-4">
              <FiShoppingBag className="w-10 h-10 text-purple-600" />
            </div>
          </motion.div>
          <h1 className="text-4xl font-bold text-white mb-2">Join ShopHub</h1>
          <p className="text-purple-100">Create your account to get started</p>
        </div>

        {/* Register Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-white bg-opacity-20 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white border-opacity-30"
        >
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name Input */}
            <div>
              <label className="block text-white font-semibold mb-2">Full Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <FiUser className="w-5 h-5 text-white text-opacity-70" />
                </div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full pl-12 pr-4 py-3 bg-white bg-opacity-20 border-2 border-white border-opacity-30 rounded-2xl text-white placeholder-white placeholder-opacity-60 focus:outline-none focus:border-white focus:border-opacity-50 transition"
                  placeholder="John Doe"
                />
              </div>
            </div>

            {/* Email Input */}
            <div>
              <label className="block text-white font-semibold mb-2">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <FiMail className="w-5 h-5 text-white text-opacity-70" />
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full pl-12 pr-4 py-3 bg-white bg-opacity-20 border-2 border-white border-opacity-30 rounded-2xl text-white placeholder-white placeholder-opacity-60 focus:outline-none focus:border-white focus:border-opacity-50 transition"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            {/* Phone Input */}
            <div>
              <label className="block text-white font-semibold mb-2">Phone (Optional)</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <FiPhone className="w-5 h-5 text-white text-opacity-70" />
                </div>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-3 bg-white bg-opacity-20 border-2 border-white border-opacity-30 rounded-2xl text-white placeholder-white placeholder-opacity-60 focus:outline-none focus:border-white focus:border-opacity-50 transition"
                  placeholder="+1234567890"
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-white font-semibold mb-2">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <FiLock className="w-5 h-5 text-white text-opacity-70" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full pl-12 pr-12 py-3 bg-white bg-opacity-20 border-2 border-white border-opacity-30 rounded-2xl text-white placeholder-white placeholder-opacity-60 focus:outline-none focus:border-white focus:border-opacity-50 transition"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center"
                >
                  {showPassword ? (
                    <FiEyeOff className="w-5 h-5 text-white text-opacity-70 hover:text-opacity-100 transition" />
                  ) : (
                    <FiEye className="w-5 h-5 text-white text-opacity-70 hover:text-opacity-100 transition" />
                  )}
                </button>
              </div>
              {/* Password Strength Bar */}
              {formData.password && (
                <div className="mt-2">
                  <div className="h-2 bg-white bg-opacity-20 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${strength}%` }}
                      className={`h-full ${
                        strength < 50 ? 'bg-red-500' : strength < 75 ? 'bg-yellow-500' : 'bg-green-500'
                      }`}
                    />
                  </div>
                  <p className="text-xs text-white mt-1">
                    {strength < 50 ? 'Weak' : strength < 75 ? 'Medium' : 'Strong'} password
                  </p>
                </div>
              )}
            </div>

            {/* Confirm Password Input */}
            <div>
              <label className="block text-white font-semibold mb-2">Confirm Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <FiLock className="w-5 h-5 text-white text-opacity-70" />
                </div>
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className="w-full pl-12 pr-12 py-3 bg-white bg-opacity-20 border-2 border-white border-opacity-30 rounded-2xl text-white placeholder-white placeholder-opacity-60 focus:outline-none focus:border-white focus:border-opacity-50 transition"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center"
                >
                  {showConfirmPassword ? (
                    <FiEyeOff className="w-5 h-5 text-white text-opacity-70 hover:text-opacity-100 transition" />
                  ) : (
                    <FiEye className="w-5 h-5 text-white text-opacity-70 hover:text-opacity-100 transition" />
                  )}
                </button>
                {formData.confirmPassword && formData.password === formData.confirmPassword && (
                  <div className="absolute inset-y-0 right-12 flex items-center">
                    <FiCheck className="w-5 h-5 text-green-400" />
                  </div>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full bg-white text-purple-600 font-bold py-4 px-6 rounded-2xl shadow-xl hover:shadow-2xl transform transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed mt-6"
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-3 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
                  <span>Creating Account...</span>
                </div>
              ) : (
                'Create Account'
              )}
            </motion.button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center">
            <div className="flex-1 h-px bg-white opacity-30"></div>
            <span className="px-4 text-white text-sm">OR</span>
            <div className="flex-1 h-px bg-white opacity-30"></div>
          </div>

          {/* Login Link */}
          <div className="text-center">
            <p className="text-white mb-4">Already have an account?</p>
            <Link
              to="/login"
              className="inline-block bg-white bg-opacity-20 hover:bg-opacity-30 text-white font-bold py-3 px-8 rounded-2xl border-2 border-white border-opacity-50 hover:border-opacity-70 transition duration-300"
            >
              Login
            </Link>
          </div>
        </motion.div>

        {/* Back to Home */}
        <div className="text-center mt-6">
          <Link to="/" className="text-white hover:text-yellow-300 transition font-semibold">
            ← Back to Home
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;

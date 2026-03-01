import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import API from '../api/axios';
import { toast } from 'react-toastify';

const Checkout = () => {
  const { cart, getCartTotal, clearCart } = useContext(CartContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    shippingAddress: '', city: '', state: '', zipCode: '', phone: '', paymentMethod: 'CARD'
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await API.post('/orders', formData);
      toast.success('Order placed successfully!');
      await clearCart();
      navigate(`/orders/${response.data.id}`);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to place order');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 space-y-6">
            <h2 className="text-xl font-semibold">Shipping Information</h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Shipping Address</label>
              <input type="text" name="shippingAddress" value={formData.shippingAddress} onChange={handleChange} required className="input-field" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                <input type="text" name="city" value={formData.city} onChange={handleChange} required className="input-field" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
                <input type="text" name="state" value={formData.state} onChange={handleChange} required className="input-field" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">ZIP Code</label>
                <input type="text" name="zipCode" value={formData.zipCode} onChange={handleChange} required className="input-field" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required className="input-field" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Payment Method</label>
              <select name="paymentMethod" value={formData.paymentMethod} onChange={handleChange} className="input-field">
                <option value="CARD">Credit/Debit Card</option>
                <option value="CASH_ON_DELIVERY">Cash on Delivery</option>
              </select>
            </div>
            <button type="submit" disabled={loading} className="w-full btn-primary disabled:opacity-50">
              {loading ? 'Placing Order...' : 'Place Order'}
            </button>
          </form>
        </div>
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
            <h3 className="text-xl font-bold mb-4">Order Summary</h3>
            <div className="space-y-3 mb-4">
              {cart.map((item) => (
                <div key={item.productId} className="flex justify-between text-sm">
                  <span>{item.productName} x{item.quantity}</span>
                  <span>${item.subtotal.toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="border-t pt-3 flex justify-between text-lg font-bold">
              <span>Total</span>
              <span className="text-primary-600">${getCartTotal().toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;

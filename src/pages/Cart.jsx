import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { FiTrash2, FiMinus, FiPlus, FiShoppingBag } from 'react-icons/fi';

const Cart = () => {
  const { cart, loading, updateQuantity, removeFromCart, getCartTotal } = useContext(CartContext);
  const navigate = useNavigate();

  if (loading) {
    return <div className="container mx-auto px-4 py-12 flex justify-center"><div className="spinner"></div></div>;
  }

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <FiShoppingBag className="w-24 h-24 mx-auto text-gray-400 mb-4" />
        <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
        <p className="text-gray-600 mb-8">Add some products to get started!</p>
        <Link to="/products" className="btn-primary">Shop Now</Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {cart.map((item) => (
            <div key={item.productId} className="bg-white rounded-lg shadow-md p-6 flex gap-4">
              <img src={item.productImage || 'https://via.placeholder.com/150'} alt={item.productName} className="w-24 h-24 object-cover rounded" />
              
              <div className="flex-1">
                <h3 className="font-semibold text-lg mb-2">{item.productName}</h3>
                <p className="text-2xl font-bold text-primary-600">${item.price}</p>
              </div>

              <div className="flex flex-col items-end justify-between">
                <button onClick={() => removeFromCart(item.productId)} className="text-red-600 hover:text-red-700">
                  <FiTrash2 className="w-5 h-5" />
                </button>

                <div className="flex items-center space-x-3">
                  <button onClick={() => updateQuantity(item.productId, item.quantity - 1)} disabled={item.quantity <= 1} className="w-8 h-8 rounded border flex items-center justify-center disabled:opacity-50">
                    <FiMinus />
                  </button>
                  <span className="w-12 text-center font-semibold">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.productId, item.quantity + 1)} disabled={item.quantity >= item.stock} className="w-8 h-8 rounded border flex items-center justify-center disabled:opacity-50">
                    <FiPlus />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
            <h3 className="text-xl font-bold mb-4">Order Summary</h3>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold">${getCartTotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="font-semibold">Calculated at checkout</span>
              </div>
              <div className="border-t pt-3 flex justify-between text-lg font-bold">
                <span>Total</span>
                <span className="text-primary-600">${getCartTotal().toFixed(2)}</span>
              </div>
            </div>

            <button onClick={() => navigate('/checkout')} className="w-full btn-primary">
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;

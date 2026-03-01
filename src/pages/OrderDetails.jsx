import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import API from '../api/axios';

const OrderDetails = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrder();
  }, [id]);

  const fetchOrder = async () => {
    try {
      const response = await API.get(`/orders/${id}`);
      setOrder(response.data);
    } catch (error) {
      console.error('Failed to fetch order:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="container mx-auto px-4 py-12 flex justify-center"><div className="spinner"></div></div>;
  }

  if (!order) {
    return <div className="container mx-auto px-4 py-12 text-center"><p className="text-xl">Order not found</p></div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">Order Details</h1>
      <div className="bg-white rounded-lg shadow-md p-8 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <p className="text-sm text-gray-600">Order Number</p>
            <p className="font-semibold">{order.orderNumber}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Order Date</p>
            <p className="font-semibold">{new Date(order.createdAt).toLocaleDateString()}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Status</p>
            <span className={`badge ${order.status === 'DELIVERED' ? 'badge-success' : order.status === 'CANCELLED' ? 'badge-danger' : 'badge-info'}`}>
              {order.status}
            </span>
          </div>
          <div>
            <p className="text-sm text-gray-600">Total Amount</p>
            <p className="font-semibold text-lg">${order.totalAmount}</p>
          </div>
        </div>
        <h3 className="font-semibold text-lg mb-4">Order Items</h3>
        <div className="space-y-4">
          {order.orderItems?.map((item, index) => (
            <div key={index} className="flex items-center gap-4 border-b pb-4">
              <img src={item.productImage || 'https://via.placeholder.com/80'} alt={item.productName} className="w-20 h-20 object-cover rounded" />
              <div className="flex-1">
                <p className="font-semibold">{item.productName}</p>
                <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
              </div>
              <p className="font-semibold">${item.price}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;

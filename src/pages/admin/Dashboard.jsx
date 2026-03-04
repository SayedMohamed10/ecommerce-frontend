import React, { useState, useEffect } from 'react';
import API from '../../api/axios';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await API.get('/admin/dashboard/stats');
      setStats(response.data);
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="container mx-auto px-4 py-12 flex justify-center"><div className="spinner"></div></div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <p className="text-gray-600 mb-2">Total Orders</p>
          <p className="text-3xl font-bold text-primary-600">{stats?.totalOrders || 0}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <p className="text-gray-600 mb-2">Total Users</p>
          <p className="text-3xl font-bold text-green-600">{stats?.totalUsers || 0}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <p className="text-gray-600 mb-2">Total Products</p>
          <p className="text-3xl font-bold text-blue-600">{stats?.totalProducts || 0}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <p className="text-gray-600 mb-2">Total Revenue</p>
          <p className="text-3xl font-bold text-purple-600">${stats?.totalRevenue?.toFixed(2) || '0.00'}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

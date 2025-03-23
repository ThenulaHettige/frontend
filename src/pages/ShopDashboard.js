import React from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import ShopDetails from '../components/shop/ShopDetails';
import ManageItems from '../components/shop/ManageItems';

const ShopDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('shopData');
    navigate('/login');
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <div className="p-4">
          <h2 className="text-2xl font-bold text-gray-800">Shop Dashboard</h2>
        </div>
        <nav className="mt-4">
          <Link
            to="/shop-dashboard"
            className="block px-4 py-2 text-gray-600 hover:bg-gray-100"
          >
            Shop Details
          </Link>
          <Link
            to="/shop-dashboard/items"
            className="block px-4 py-2 text-gray-600 hover:bg-gray-100"
          >
            Manage Items
          </Link>
          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
          >
            Logout
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <Routes>
            <Route path="/" element={<ShopDetails />} />
            <Route path="/items" element={<ManageItems />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default ShopDashboard; 
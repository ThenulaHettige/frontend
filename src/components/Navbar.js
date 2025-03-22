import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, User } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-blue-600">
              ServiceHub
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link to="/marketplace" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
              Marketplace
            </Link>
            <Link to="/service-providers" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
              Service Providers
            </Link>
            <Link to="/cart" className="text-gray-700 hover:text-blue-600 p-2 rounded-full hover:bg-gray-100">
              <ShoppingCart className="h-6 w-6" />
            </Link>
            <Link to="/login" className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700">
              Login
            </Link>
            <Link to="/signup" className="bg-white text-blue-600 border border-blue-600 px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-50">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 
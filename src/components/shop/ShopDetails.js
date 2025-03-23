import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';

const ShopDetails = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [shopData, setShopData] = useState({
    shopName: '',
    location: '',
    contactNumber: '',
    email: '',
  });

  useEffect(() => {
    if (user && user.role === 'shop') {
      setShopData({
        shopName: user.shopName || '',
        location: user.location || '',
        contactNumber: user.contactNumber || '',
        email: user.email || '',
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShopData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Here you would typically make an API call to update the shop details
      // For now, we'll just update the local state
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating shop details:', error);
    }
  };

  if (!user || user.role !== 'shop') {
    return (
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-red-600">Access Denied</h2>
        <p className="mt-2">You must be logged in as a shop owner to view this page.</p>
      </div>
    );
  }

  if (isEditing) {
    return (
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6">Edit Shop Details</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Shop Name</label>
            <input
              type="text"
              name="shopName"
              value={shopData.shopName}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Location</label>
            <input
              type="text"
              name="location"
              value={shopData.location}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Contact Number</label>
            <input
              type="tel"
              name="contactNumber"
              value={shopData.contactNumber}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={shopData.email}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Shop Details</h2>
        <button
          onClick={() => setIsEditing(true)}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
        >
          Edit Details
        </button>
      </div>
      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-medium text-gray-500">Shop Name</h3>
          <p className="mt-1 text-lg">{shopData.shopName || 'Not set'}</p>
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-500">Location</h3>
          <p className="mt-1 text-lg">{shopData.location || 'Not set'}</p>
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-500">Contact Number</h3>
          <p className="mt-1 text-lg">{shopData.contactNumber || 'Not set'}</p>
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-500">Email</h3>
          <p className="mt-1 text-lg">{shopData.email || 'Not set'}</p>
        </div>
      </div>
    </div>
  );
};

export default ShopDetails; 
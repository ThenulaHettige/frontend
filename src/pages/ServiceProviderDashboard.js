import React, { useState, useEffect } from 'react';
import { useNavigate, Routes, Route, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Home, MessageSquare, User, LogOut } from 'lucide-react';

const ServiceProviderDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!user || user.role !== 'provider') {
      navigate('/');
    }
  }, [user, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navigation = [
    { name: 'Home', href: '/provider-dashboard', icon: Home },
    { name: 'User Inquiries', href: '/provider-dashboard/inquiries', icon: MessageSquare },
    { name: 'Profile Settings', href: '/provider-dashboard/profile', icon: User },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-lg">
        <div className="flex flex-col h-full">
          <div className="p-4">
            <h2 className="text-xl font-semibold text-gray-800">Service Provider</h2>
            <p className="text-sm text-gray-600">{user?.firstName} {user?.lastName}</p>
          </div>
          <nav className="flex-1 px-2 py-4 space-y-1">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                    isActive
                      ? 'bg-indigo-100 text-indigo-700'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.name}
                </Link>
              );
            })}
          </nav>
          <div className="p-4 border-t">
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-md"
            >
              <LogOut className="mr-3 h-5 w-5" />
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="pl-64">
        <div className="p-8">
          <Routes>
            <Route path="/" element={<DashboardHome />} />
            <Route path="/inquiries" element={<UserInquiries />} />
            <Route path="/profile" element={<ProfileSettings />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

// Dashboard Home Component
const DashboardHome = () => {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900">Welcome to your Dashboard</h1>
      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <MessageSquare className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">New Inquiries</dt>
                  <dd className="text-lg font-medium text-gray-900">5</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Home className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Active Jobs</dt>
                  <dd className="text-lg font-medium text-gray-900">3</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <User className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Completed Jobs</dt>
                  <dd className="text-lg font-medium text-gray-900">12</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// User Inquiries Component
const UserInquiries = () => {
  const [inquiries, setInquiries] = useState([]);

  useEffect(() => {
    // Load inquiries from localStorage or initialize with sample data
    const storedInquiries = JSON.parse(localStorage.getItem('inquiries'));
    if (!storedInquiries || storedInquiries.length === 0) {
      // Import sample data dynamically
      import('../data/sampleInquiries').then(({ sampleInquiries }) => {
        localStorage.setItem('inquiries', JSON.stringify(sampleInquiries));
        setInquiries(sampleInquiries);
      });
    } else {
      setInquiries(storedInquiries);
    }
  }, []);

  const handleTakeOrder = (id) => {
    const updatedInquiries = inquiries.map(inquiry => 
      inquiry.id === id ? { ...inquiry, status: 'accepted' } : inquiry
    );
    setInquiries(updatedInquiries);
    localStorage.setItem('inquiries', JSON.stringify(updatedInquiries));
  };

  const handleReject = (id) => {
    const updatedInquiries = inquiries.filter(inquiry => inquiry.id !== id);
    setInquiries(updatedInquiries);
    localStorage.setItem('inquiries', JSON.stringify(updatedInquiries));
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900">User Inquiries</h1>
      <div className="mt-6">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User's Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Address
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Message
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Photo
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {inquiries.map((inquiry) => (
                <tr key={inquiry.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{inquiry.userName}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{inquiry.address}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{inquiry.message}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <img
                      src={inquiry.photo}
                      alt="Problem"
                      className="h-10 w-10 rounded-full cursor-pointer"
                      onClick={() => window.open(inquiry.photo, '_blank')}
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button
                      onClick={() => handleTakeOrder(inquiry.id)}
                      className="text-green-600 hover:text-green-900"
                    >
                      Take Order
                    </button>
                    <button
                      onClick={() => handleReject(inquiry.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// Profile Settings Component
const ProfileSettings = () => {
  const { user, updateProfile, deleteProfile } = useAuth();
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    category: user?.category || '',
    experience: user?.experience || '',
    contactNumber: user?.contactNumber || '',
    address: user?.address || '',
  });
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfile(formData);
    setShowSuccess(true);
    // Hide the notification after 3 seconds
    setTimeout(() => {
      setShowSuccess(false);
    }, 3000);
  };

  const handleDeleteProfile = () => {
    if (window.confirm('Are you sure you want to delete your profile? This action cannot be undone.')) {
      deleteProfile();
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900">Profile Settings</h1>
      {/* Success Notification */}
      <div className={`fixed top-4 right-4 z-50 transition-all duration-500 transform ${showSuccess ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}>
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative shadow-lg">
          <span className="block sm:inline">Profile updated successfully!</span>
          <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
            <svg className="fill-current h-4 w-4 text-green-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <title>Close</title>
              <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/>
            </svg>
          </span>
        </div>
      </div>
      <div className="mt-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                disabled
                className="mt-1 block w-full rounded-md border-gray-300 bg-gray-50 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value="">Select Category</option>
                <option value="plumber">Plumber</option>
                <option value="electrician">Electrician</option>
                <option value="carpenter">Carpenter</option>
                <option value="painter">Painter</option>
                <option value="mason">Mason</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Experience (years)</label>
              <input
                type="number"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Contact Number</label>
              <input
                type="tel"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
          </div>
          <div className="flex justify-between">
            <button
              type="button"
              onClick={handleDeleteProfile}
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Delete Profile
            </button>
            <button
              type="submit"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ServiceProviderDashboard; 
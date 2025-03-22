import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Signup = () => {
  const [signupType, setSignupType] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { signup } = useAuth();

  const [userForm, setUserForm] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    province: '',
    password: ''
  });

  const [providerForm, setProviderForm] = useState({
    email: '',
    firstName: '',
    lastName: '',
    category: '',
    address: '',
    province: '',
    experience: '',
    contactNumber: '',
    password: ''
  });

  const [shopForm, setShopForm] = useState({
    email: '',
    shopName: '',
    location: '',
    contactNumber: '',
    password: ''
  });

  const handleUserChange = (e) => {
    setUserForm({ ...userForm, [e.target.name]: e.target.value });
  };

  const handleProviderChange = (e) => {
    setProviderForm({ ...providerForm, [e.target.name]: e.target.value });
  };

  const handleShopChange = (e) => {
    setShopForm({ ...shopForm, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    let formData;
    let type;

    switch (signupType) {
      case 'user':
        formData = userForm;
        type = 'user';
        break;
      case 'provider':
        formData = providerForm;
        type = 'provider';
        break;
      case 'shop':
        formData = shopForm;
        type = 'shop';
        break;
      default:
        return;
    }

    const result = await signup(formData, type);
    if (result.success) {
      navigate('/login');
    } else {
      setError(result.message || 'Error during signup');
    }
  };

  const renderSignupOptions = () => (
    <div className="space-y-4">
      <button
        onClick={() => setSignupType('user')}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        User Signup
      </button>
      <button
        onClick={() => setSignupType('provider')}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
      >
        Service Provider Signup
      </button>
      <button
        onClick={() => setSignupType('shop')}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Shop Signup
      </button>
    </div>
  );

  const renderUserForm = () => (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="email"
        name="email"
        placeholder="Email"
        required
        className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
        value={userForm.email}
        onChange={handleUserChange}
      />
      <input
        type="text"
        name="firstName"
        placeholder="First Name"
        required
        className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
        value={userForm.firstName}
        onChange={handleUserChange}
      />
      <input
        type="text"
        name="lastName"
        placeholder="Last Name"
        required
        className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
        value={userForm.lastName}
        onChange={handleUserChange}
      />
      <input
        type="text"
        name="address"
        placeholder="Address"
        required
        className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
        value={userForm.address}
        onChange={handleUserChange}
      />
      <input
        type="text"
        name="province"
        placeholder="Province"
        required
        className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
        value={userForm.province}
        onChange={handleUserChange}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        required
        className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
        value={userForm.password}
        onChange={handleUserChange}
      />
      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Sign Up
      </button>
    </form>
  );

  const renderProviderForm = () => (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="email"
        name="email"
        placeholder="Email"
        required
        className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
        value={providerForm.email}
        onChange={handleProviderChange}
      />
      <input
        type="text"
        name="firstName"
        placeholder="First Name"
        required
        className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
        value={providerForm.firstName}
        onChange={handleProviderChange}
      />
      <input
        type="text"
        name="lastName"
        placeholder="Last Name"
        required
        className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
        value={providerForm.lastName}
        onChange={handleProviderChange}
      />
      <select
        name="category"
        required
        className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
        value={providerForm.category}
        onChange={handleProviderChange}
      >
        <option value="">Select Category</option>
        <option value="plumber">Plumber</option>
        <option value="electrician">Electrician</option>
        <option value="carpenter">Carpenter</option>
        <option value="painter">Painter</option>
        <option value="hvac">HVAC</option>
      </select>
      <input
        type="text"
        name="address"
        placeholder="Address"
        required
        className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
        value={providerForm.address}
        onChange={handleProviderChange}
      />
      <input
        type="text"
        name="province"
        placeholder="Province"
        required
        className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
        value={providerForm.province}
        onChange={handleProviderChange}
      />
      <input
        type="number"
        name="experience"
        placeholder="Years of Experience"
        required
        className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
        value={providerForm.experience}
        onChange={handleProviderChange}
      />
      <input
        type="tel"
        name="contactNumber"
        placeholder="Contact Number"
        required
        className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
        value={providerForm.contactNumber}
        onChange={handleProviderChange}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        required
        className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
        value={providerForm.password}
        onChange={handleProviderChange}
      />
      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
      >
        Sign Up
      </button>
    </form>
  );

  const renderShopForm = () => (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="email"
        name="email"
        placeholder="Email"
        required
        className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
        value={shopForm.email}
        onChange={handleShopChange}
      />
      <input
        type="text"
        name="shopName"
        placeholder="Shop Name"
        required
        className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
        value={shopForm.shopName}
        onChange={handleShopChange}
      />
      <input
        type="text"
        name="location"
        placeholder="Location"
        required
        className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
        value={shopForm.location}
        onChange={handleShopChange}
      />
      <input
        type="tel"
        name="contactNumber"
        placeholder="Contact Number"
        required
        className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
        value={shopForm.contactNumber}
        onChange={handleShopChange}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        required
        className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
        value={shopForm.password}
        onChange={handleShopChange}
      />
      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Sign Up
      </button>
    </form>
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{' '}
            <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
              sign in to your account
            </Link>
          </p>
        </div>

        {error && (
          <div className="text-red-500 text-sm text-center">{error}</div>
        )}

        {!signupType ? (
          renderSignupOptions()
        ) : (
          <div>
            <button
              onClick={() => setSignupType(null)}
              className="mb-4 text-indigo-600 hover:text-indigo-500"
            >
              ← Back to options
            </button>
            {signupType === 'user' && renderUserForm()}
            {signupType === 'provider' && renderProviderForm()}
            {signupType === 'shop' && renderShopForm()}
          </div>
        )}
      </div>
    </div>
  );
};

export default Signup; 
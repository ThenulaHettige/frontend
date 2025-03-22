import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Sri Lankan districts by province
const districtsByProvince = {
  western: ['Colombo', 'Gampaha', 'Kalutara'],
  central: ['Kandy', 'Matale', 'Nuwara Eliya'],
  southern: ['Galle', 'Matara', 'Hambantota'],
  northern: ['Jaffna', 'Kilinochchi', 'Mannar', 'Vavuniya', 'Mullaitivu'],
  eastern: ['Batticaloa', 'Ampara', 'Trincomalee'],
  'north-western': ['Kurunegala', 'Puttalam'],
  'north-central': ['Anuradhapura', 'Polonnaruwa'],
  uva: ['Badulla', 'Monaragala'],
  sabaragamuwa: ['Ratnapura', 'Kegalle']
};

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
    district: '',
    password: '',
    confirmPassword: ''
  });

  const [providerForm, setProviderForm] = useState({
    email: '',
    firstName: '',
    lastName: '',
    category: '',
    address: '',
    province: '',
    district: '',
    experience: '',
    contactNumber: '',
    password: '',
    confirmPassword: ''
  });

  const [shopForm, setShopForm] = useState({
    email: '',
    shopName: '',
    location: '',
    contactNumber: '',
    password: '',
    confirmPassword: ''
  });

  // Email validation function
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Password validation function
  const validatePassword = (password) => {
    // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleUserChange = (e) => {
    const { name, value } = e.target;
    setUserForm(prev => {
      const newForm = { ...prev, [name]: value };
      // Reset district when province changes
      if (name === 'province') {
        newForm.district = '';
      }
      return newForm;
    });
  };

  const handleProviderChange = (e) => {
    const { name, value } = e.target;
    setProviderForm(prev => {
      const newForm = { ...prev, [name]: value };
      // Reset district when province changes
      if (name === 'province') {
        newForm.district = '';
      }
      return newForm;
    });
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

    // Validate email
    if (!validateEmail(formData.email)) {
      setError('Please enter a valid email address');
      return;
    }

    // Validate password
    if (!validatePassword(formData.password)) {
      setError('Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number');
      return;
    }

    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // Remove confirmPassword before sending to backend
    const { confirmPassword, ...dataToSubmit } = formData;

    const result = await signup(dataToSubmit, type);
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
      <select
        name="province"
        required
        className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
        value={userForm.province}
        onChange={handleUserChange}
      >
        <option value="">Select Province</option>
        <option value="western">Western Province</option>
        <option value="central">Central Province</option>
        <option value="southern">Southern Province</option>
        <option value="northern">Northern Province</option>
        <option value="eastern">Eastern Province</option>
        <option value="north-western">North Western Province</option>
        <option value="north-central">North Central Province</option>
        <option value="uva">Uva Province</option>
        <option value="sabaragamuwa">Sabaragamuwa Province</option>
      </select>
      {userForm.province && (
        <select
          name="district"
          required
          className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
          value={userForm.district}
          onChange={handleUserChange}
        >
          <option value="">Select District</option>
          {districtsByProvince[userForm.province].map((district) => (
            <option key={district} value={district.toLowerCase()}>
              {district}
            </option>
          ))}
        </select>
      )}
      <input
        type="password"
        name="password"
        placeholder="Password"
        required
        className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
        value={userForm.password}
        onChange={handleUserChange}
      />
      <input
        type="password"
        name="confirmPassword"
        placeholder="Confirm Password"
        required
        className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
        value={userForm.confirmPassword}
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
      <select
        name="province"
        required
        className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
        value={providerForm.province}
        onChange={handleProviderChange}
      >
        <option value="">Select Province</option>
        <option value="western">Western Province</option>
        <option value="central">Central Province</option>
        <option value="southern">Southern Province</option>
        <option value="northern">Northern Province</option>
        <option value="eastern">Eastern Province</option>
        <option value="north-western">North Western Province</option>
        <option value="north-central">North Central Province</option>
        <option value="uva">Uva Province</option>
        <option value="sabaragamuwa">Sabaragamuwa Province</option>
      </select>
      {providerForm.province && (
        <select
          name="district"
          required
          className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
          value={providerForm.district}
          onChange={handleProviderChange}
        >
          <option value="">Select District</option>
          {districtsByProvince[providerForm.province].map((district) => (
            <option key={district} value={district.toLowerCase()}>
              {district}
            </option>
          ))}
        </select>
      )}
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
      <input
        type="password"
        name="confirmPassword"
        placeholder="Confirm Password"
        required
        className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
        value={providerForm.confirmPassword}
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
      <input
        type="password"
        name="confirmPassword"
        placeholder="Confirm Password"
        required
        className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
        value={shopForm.confirmPassword}
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
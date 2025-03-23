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
    // Check minimum length
    if (password.length < 8) {
      return {
        isValid: false,
        message: 'Password must be at least 8 characters long'
      };
    }

    // Check for uppercase letter
    if (!/[A-Z]/.test(password)) {
      return {
        isValid: false,
        message: 'Password must contain at least one uppercase letter'
      };
    }

    // Check for lowercase letter
    if (!/[a-z]/.test(password)) {
      return {
        isValid: false,
        message: 'Password must contain at least one lowercase letter'
      };
    }

    // Check for number
    if (!/\d/.test(password)) {
      return {
        isValid: false,
        message: 'Password must contain at least one number'
      };
    }

    return { isValid: true };
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
    setProviderForm(prev => ({
      ...prev,
      [name]: value
    }));
    // Reset district when province changes
    if (name === 'province') {
      setProviderForm(prev => ({
        ...prev,
        district: ''
      }));
    }
  };

  const handleShopChange = (e) => {
    setShopForm({ ...shopForm, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      if (signupType === 'user') {
        // Validate passwords match
        if (userForm.password !== userForm.confirmPassword) {
          setError('Passwords do not match');
          return;
        }

        // Validate password strength
        const passwordValidation = validatePassword(userForm.password);
        if (!passwordValidation.isValid) {
          setError(passwordValidation.message);
          return;
        }

        // Validate email format
        if (!validateEmail(userForm.email)) {
          setError('Please enter a valid email address');
          return;
        }

        await signup({
          ...userForm,
          role: 'user'
        });
      } else if (signupType === 'provider') {
        // Validate passwords match
        if (providerForm.password !== providerForm.confirmPassword) {
          setError('Passwords do not match');
          return;
        }

        // Validate password strength
        const passwordValidation = validatePassword(providerForm.password);
        if (!passwordValidation.isValid) {
          setError(passwordValidation.message);
          return;
        }

        // Validate email format
        if (!validateEmail(providerForm.email)) {
          setError('Please enter a valid email address');
          return;
        }

        await signup({
          ...providerForm,
          role: 'provider'
        });
      } else if (signupType === 'shop') {
        // Validate passwords match
        if (shopForm.password !== shopForm.confirmPassword) {
          setError('Passwords do not match');
          return;
        }

        // Validate password strength
        const passwordValidation = validatePassword(shopForm.password);
        if (!passwordValidation.isValid) {
          setError(passwordValidation.message);
          return;
        }

        // Validate email format
        if (!validateEmail(shopForm.email)) {
          setError('Please enter a valid email address');
          return;
        }

        await signup({
          ...shopForm,
          role: 'shop'
        });
      }
    } catch (err) {
      setError(err.message);
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
      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          name="email"
          value={providerForm.email}
          onChange={handleProviderChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">First Name</label>
        <input
          type="text"
          name="firstName"
          value={providerForm.firstName}
          onChange={handleProviderChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Last Name</label>
        <input
          type="text"
          name="lastName"
          value={providerForm.lastName}
          onChange={handleProviderChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Address</label>
        <input
          type="text"
          name="address"
          value={providerForm.address}
          onChange={handleProviderChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Province</label>
        <select
          name="province"
          value={providerForm.province}
          onChange={handleProviderChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="">Select Province</option>
          {Object.keys(districtsByProvince).map(province => (
            <option key={province} value={province}>{province}</option>
          ))}
        </select>
      </div>
      {providerForm.province && (
        <div>
          <label className="block text-sm font-medium text-gray-700">District</label>
          <select
            name="district"
            value={providerForm.district}
            onChange={handleProviderChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="">Select District</option>
            {districtsByProvince[providerForm.province].map(district => (
              <option key={district} value={district}>{district}</option>
            ))}
          </select>
        </div>
      )}
      <div>
        <label className="block text-sm font-medium text-gray-700">Category</label>
        <select
          name="category"
          value={providerForm.category}
          onChange={handleProviderChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
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
          value={providerForm.experience}
          onChange={handleProviderChange}
          required
          min="0"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Contact Number</label>
        <input
          type="tel"
          name="contactNumber"
          value={providerForm.contactNumber}
          onChange={handleProviderChange}
          required
          pattern="[0-9]{10}"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Password</label>
        <input
          type="password"
          name="password"
          value={providerForm.password}
          onChange={handleProviderChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
        <p className="mt-1 text-sm text-gray-500">
          Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number
        </p>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
        <input
          type="password"
          name="confirmPassword"
          value={providerForm.confirmPassword}
          onChange={handleProviderChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>
      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
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
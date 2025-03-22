import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Password validation function
  const validatePassword = (password) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    
    if (password.length < minLength) {
      return { isValid: false, message: 'Password must be at least 8 characters long' };
    }
    if (!hasUpperCase) {
      return { isValid: false, message: 'Password must contain at least one uppercase letter' };
    }
    if (!hasLowerCase) {
      return { isValid: false, message: 'Password must contain at least one lowercase letter' };
    }
    if (!hasNumber) {
      return { isValid: false, message: 'Password must contain at least one number' };
    }
    return { isValid: true };
  };

  useEffect(() => {
    // Initialize test accounts in localStorage if they don't exist
    const initializeTestAccounts = () => {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const serviceProviders = JSON.parse(localStorage.getItem('serviceProviders') || '[]');
      const shops = JSON.parse(localStorage.getItem('shops') || '[]');

      // Add test accounts if they don't exist
      if (!users.some(u => u.email === 'user@example.com')) {
        users.push({
          email: 'user@example.com',
          password: 'User@123',
          firstName: 'Test',
          lastName: 'User',
          address: 'Test Address',
          province: 'Western',
          district: 'Colombo'
        });
      }

      if (!serviceProviders.some(p => p.email === 'provider@example.com')) {
        serviceProviders.push({
          email: 'provider@example.com',
          password: 'Provider@123',
          firstName: 'Test',
          lastName: 'Provider',
          address: 'Test Address',
          province: 'Western',
          district: 'Colombo',
          category: 'plumber',
          experience: '5',
          contactNumber: '0771234567'
        });
      }

      if (!shops.some(s => s.email === 'shop@example.com')) {
        shops.push({
          email: 'shop@example.com',
          password: 'Shop@123',
          shopName: 'Test Shop',
          address: 'Test Address',
          province: 'Western',
          district: 'Colombo',
          location: 'Test Location'
        });
      }

      // Add admin to users array
      if (!users.some(u => u.email === 'admin@example.com')) {
        users.push({
          email: 'admin@example.com',
          password: 'Admin@123',
          role: 'admin',
          name: 'Admin'
        });
      }

      // Save updated arrays back to localStorage
      localStorage.setItem('users', JSON.stringify(users));
      localStorage.setItem('serviceProviders', JSON.stringify(serviceProviders));
      localStorage.setItem('shops', JSON.stringify(shops));
    };

    // Initialize test accounts
    initializeTestAccounts();

    // Check for stored user data on component mount
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    // Get all users from localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const serviceProviders = JSON.parse(localStorage.getItem('serviceProviders') || '[]');
    const shops = JSON.parse(localStorage.getItem('shops') || '[]');

    // Check user credentials (including admin)
    const foundUser = users.find(u => u.email === email && u.password === password);
    if (foundUser) {
      const userData = { ...foundUser, role: foundUser.role || 'user' };
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      return { success: true, role: userData.role };
    }

    // Check service provider credentials
    const foundProvider = serviceProviders.find(p => p.email === email && p.password === password);
    if (foundProvider) {
      const providerData = { ...foundProvider, role: 'provider' };
      setUser(providerData);
      localStorage.setItem('user', JSON.stringify(providerData));
      return { success: true, role: 'provider' };
    }

    // Check shop credentials
    const foundShop = shops.find(s => s.email === email && s.password === password);
    if (foundShop) {
      const shopData = { ...foundShop, role: 'shop' };
      setUser(shopData);
      localStorage.setItem('user', JSON.stringify(shopData));
      return { success: true, role: 'shop' };
    }

    return { success: false, message: 'Invalid credentials' };
  };

  const signup = (userData, type) => {
    const { email, password, ...rest } = userData;

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return { success: false, message: 'Please enter a valid email address' };
    }

    // Validate password
    const passwordValidation = validatePassword(password);
    if (!passwordValidation.isValid) {
      return { success: false, message: passwordValidation.message };
    }

    // Check if email already exists
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const serviceProviders = JSON.parse(localStorage.getItem('serviceProviders') || '[]');
    const shops = JSON.parse(localStorage.getItem('shops') || '[]');

    if (users.some(u => u.email === email) ||
        serviceProviders.some(p => p.email === email) ||
        shops.some(s => s.email === email)) {
      return { success: false, message: 'Email already exists' };
    }

    // Validate required fields based on type
    let requiredFields = ['email', 'password', 'firstName', 'lastName', 'address', 'province', 'district'];
    
    if (type === 'provider') {
      requiredFields = [...requiredFields, 'category', 'experience', 'contactNumber'];
    } else if (type === 'shop') {
      requiredFields = ['email', 'password', 'shopName', 'address', 'province', 'district', 'location'];
    }

    const missingFields = requiredFields.filter(field => !userData[field]);
    if (missingFields.length > 0) {
      return { 
        success: false, 
        message: `Please fill in all required fields: ${missingFields.join(', ')}` 
      };
    }

    // Save user data based on type
    try {
      switch (type) {
        case 'user':
          users.push(userData);
          localStorage.setItem('users', JSON.stringify(users));
          break;
        case 'provider':
          serviceProviders.push(userData);
          localStorage.setItem('serviceProviders', JSON.stringify(serviceProviders));
          break;
        case 'shop':
          shops.push(userData);
          localStorage.setItem('shops', JSON.stringify(shops));
          break;
        default:
          return { success: false, message: 'Invalid user type' };
      }
      return { success: true };
    } catch (error) {
      return { success: false, message: 'Error saving user data. Please try again.' };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, validatePassword }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 
import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for stored user data on component mount
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    // Hardcoded admin credentials
    if (email === 'admin@example.com' && password === 'Admin@123') {
      const adminUser = {
        email,
        role: 'admin',
        name: 'Admin'
      };
      setUser(adminUser);
      localStorage.setItem('user', JSON.stringify(adminUser));
      return { success: true, role: 'admin' };
    }

    // Get all users from localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const serviceProviders = JSON.parse(localStorage.getItem('serviceProviders') || '[]');
    const shops = JSON.parse(localStorage.getItem('shops') || '[]');

    // Check user credentials
    const foundUser = users.find(u => u.email === email && u.password === password);
    if (foundUser) {
      const userData = { ...foundUser, role: 'user' };
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      return { success: true, role: 'user' };
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

    // Check if email already exists
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const serviceProviders = JSON.parse(localStorage.getItem('serviceProviders') || '[]');
    const shops = JSON.parse(localStorage.getItem('shops') || '[]');

    if (users.some(u => u.email === email) ||
        serviceProviders.some(p => p.email === email) ||
        shops.some(s => s.email === email)) {
      return { success: false, message: 'Email already exists' };
    }

    // Save user data based on type
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
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
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
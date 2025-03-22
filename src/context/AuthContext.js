import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);

    // Initialize sample data if not exists
    initializeSampleData();
  }, []);

  const initializeSampleData = () => {
    // Sample Users
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.length === 0) {
      const sampleUsers = [
        {
          email: 'john@example.com',
          password: 'User@123',
          firstName: 'John',
          lastName: 'Doe',
          address: '123 Main St, Colombo',
          province: 'Western',
          district: 'Colombo',
          role: 'user'
        },
        {
          email: 'jane@example.com',
          password: 'User@123',
          firstName: 'Jane',
          lastName: 'Smith',
          address: '456 Lake Rd, Kandy',
          province: 'Central',
          district: 'Kandy',
          role: 'user'
        },
        {
          email: 'mike@example.com',
          password: 'User@123',
          firstName: 'Mike',
          lastName: 'Johnson',
          address: '789 Beach Rd, Galle',
          province: 'Southern',
          district: 'Galle',
          role: 'user'
        },
        {
          email: 'sarah@example.com',
          password: 'User@123',
          firstName: 'Sarah',
          lastName: 'Williams',
          address: '321 Hill St, Nuwara Eliya',
          province: 'Central',
          district: 'Nuwara Eliya',
          role: 'user'
        },
        {
          email: 'david@example.com',
          password: 'User@123',
          firstName: 'David',
          lastName: 'Brown',
          address: '654 River Rd, Matara',
          province: 'Southern',
          district: 'Matara',
          role: 'user'
        }
      ];
      localStorage.setItem('users', JSON.stringify(sampleUsers));
    }

    // Sample Service Providers
    const providers = JSON.parse(localStorage.getItem('serviceProviders') || '[]');
    if (providers.length === 0) {
      const sampleProviders = [
        {
          email: 'plumber@example.com',
          password: 'Provider@123',
          firstName: 'Alex',
          lastName: 'Wilson',
          address: '111 Pipe St, Colombo',
          province: 'Western',
          district: 'Colombo',
          category: 'Plumbing',
          experience: '5 years',
          contactNumber: '0771234567',
          role: 'provider',
          approved: true
        },
        {
          email: 'electrician@example.com',
          password: 'Provider@123',
          firstName: 'Tom',
          lastName: 'Anderson',
          address: '222 Wire Rd, Kandy',
          province: 'Central',
          district: 'Kandy',
          category: 'Electrical',
          experience: '8 years',
          contactNumber: '0762345678',
          role: 'provider',
          approved: true
        },
        {
          email: 'carpenter@example.com',
          password: 'Provider@123',
          firstName: 'Chris',
          lastName: 'Taylor',
          address: '333 Wood St, Galle',
          province: 'Southern',
          district: 'Galle',
          category: 'Carpentry',
          experience: '10 years',
          contactNumber: '0753456789',
          role: 'provider',
          approved: false
        },
        {
          email: 'painter@example.com',
          password: 'Provider@123',
          firstName: 'Sam',
          lastName: 'Martin',
          address: '444 Color Rd, Matara',
          province: 'Southern',
          district: 'Matara',
          category: 'Painting',
          experience: '6 years',
          contactNumber: '0744567890',
          role: 'provider',
          approved: true
        },
        {
          email: 'gardener@example.com',
          password: 'Provider@123',
          firstName: 'Luke',
          lastName: 'Davis',
          address: '555 Garden St, Nuwara Eliya',
          province: 'Central',
          district: 'Nuwara Eliya',
          category: 'Gardening',
          experience: '7 years',
          contactNumber: '0735678901',
          role: 'provider',
          approved: false
        }
      ];
      localStorage.setItem('serviceProviders', JSON.stringify(sampleProviders));
    }

    // Sample Shops
    const shops = JSON.parse(localStorage.getItem('shops') || '[]');
    if (shops.length === 0) {
      const sampleShops = [
        {
          email: 'hardware@example.com',
          password: 'Shop@123',
          shopName: 'City Hardware Store',
          address: '666 Tool Rd, Colombo',
          province: 'Western',
          district: 'Colombo',
          location: 'City Center',
          role: 'shop',
          approved: true
        },
        {
          email: 'furniture@example.com',
          password: 'Shop@123',
          shopName: 'Modern Furniture',
          address: '777 Chair St, Kandy',
          province: 'Central',
          district: 'Kandy',
          location: 'Shopping Mall',
          role: 'shop',
          approved: true
        },
        {
          email: 'electronics@example.com',
          password: 'Shop@123',
          shopName: 'Tech World',
          address: '888 Gadget Rd, Galle',
          province: 'Southern',
          district: 'Galle',
          location: 'City Center',
          role: 'shop',
          approved: false
        },
        {
          email: 'clothing@example.com',
          password: 'Shop@123',
          shopName: 'Fashion Hub',
          address: '999 Style St, Matara',
          province: 'Southern',
          district: 'Matara',
          location: 'Shopping Mall',
          role: 'shop',
          approved: true
        },
        {
          email: 'books@example.com',
          password: 'Shop@123',
          shopName: 'Book Haven',
          address: '000 Read Rd, Nuwara Eliya',
          province: 'Central',
          district: 'Nuwara Eliya',
          location: 'City Center',
          role: 'shop',
          approved: false
        }
      ];
      localStorage.setItem('shops', JSON.stringify(sampleShops));
    }
  };

  const login = (email, password) => {
    // Check test accounts first
    if (email === 'admin@example.com' && password === 'Admin@123') {
      const adminUser = {
        email,
        role: 'admin',
        firstName: 'Admin',
        lastName: 'User'
      };
      setUser(adminUser);
      localStorage.setItem('currentUser', JSON.stringify(adminUser));
      navigate('/admin-dashboard');
      return;
    }

    // Check regular users
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      const { password, ...userWithoutPassword } = user;
      setUser(userWithoutPassword);
      localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
      navigate('/');
      return;
    }

    // Check service providers
    const providers = JSON.parse(localStorage.getItem('serviceProviders') || '[]');
    const provider = providers.find(p => p.email === email && p.password === password);
    if (provider) {
      const { password, ...providerWithoutPassword } = provider;
      setUser(providerWithoutPassword);
      localStorage.setItem('currentUser', JSON.stringify(providerWithoutPassword));
      navigate('/');
      return;
    }

    // Check shops
    const shops = JSON.parse(localStorage.getItem('shops') || '[]');
    const shop = shops.find(s => s.email === email && s.password === password);
    if (shop) {
      const { password, ...shopWithoutPassword } = shop;
      setUser(shopWithoutPassword);
      localStorage.setItem('currentUser', JSON.stringify(shopWithoutPassword));
      navigate('/');
      return;
    }

    throw new Error('Invalid email or password');
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
    navigate('/');
  };

  const signup = (userData) => {
    const { email, password, role } = userData;

    // Check if email already exists in any user type
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const providers = JSON.parse(localStorage.getItem('serviceProviders') || '[]');
    const shops = JSON.parse(localStorage.getItem('shops') || '[]');

    if (users.some(u => u.email === email) ||
        providers.some(p => p.email === email) ||
        shops.some(s => s.email === email)) {
      throw new Error('Email already exists');
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error('Invalid email format');
    }

    // Validate password strength
    if (!validatePassword(password)) {
      throw new Error('Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number');
    }

    // Store user data based on role
    switch (role) {
      case 'user':
        users.push(userData);
        localStorage.setItem('users', JSON.stringify(users));
        break;
      case 'provider':
        providers.push({ ...userData, approved: false });
        localStorage.setItem('serviceProviders', JSON.stringify(providers));
        break;
      case 'shop':
        shops.push({ ...userData, approved: false });
        localStorage.setItem('shops', JSON.stringify(shops));
        break;
      default:
        throw new Error('Invalid role');
    }

    // Log in the user after successful signup
    const { password: _, ...userWithoutPassword } = userData;
    setUser(userWithoutPassword);
    localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
    navigate('/');
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
}; 
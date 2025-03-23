import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Footer from './components/Footer';
import ServiceProviders from './pages/ServiceProviders';
import Marketplace from './pages/Marketplace';
import Cart from './pages/Cart';
import AllShops from './pages/AllShops';
import ShopDetails from './pages/ShopDetails';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AdminDashboard from './pages/AdminDashboard';
import ServiceProviderDashboard from './pages/ServiceProviderDashboard';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Hero />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/service-providers" element={<ServiceProviders />} />
                <Route path="/marketplace" element={<Marketplace />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/shops" element={<AllShops />} />
                <Route path="/shops/:id" element={<ShopDetails />} />
                <Route path="/admin-dashboard" element={<AdminDashboard />} />
                <Route path="/provider-dashboard/*" element={<ServiceProviderDashboard />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Footer from './components/Footer';
import ServiceProviders from './pages/ServiceProviders';
import ServiceProviderProfile from './pages/ServiceProviderProfile';
import Marketplace from './pages/Marketplace';
import Cart from './pages/Cart';
import AllShops from './pages/AllShops';
import ShopDetails from './pages/ShopDetails';
import { CartProvider } from './context/CartContext';

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Hero />} />
              <Route path="/service-providers" element={<ServiceProviders />} />
              <Route path="/service-providers/:id" element={<ServiceProviderProfile />} />
              <Route path="/marketplace" element={<Marketplace />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/shops" element={<AllShops />} />
              <Route path="/shops/:id" element={<ShopDetails />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;

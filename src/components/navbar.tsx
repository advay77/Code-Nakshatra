import React from 'react';
import { Leaf } from 'lucide-react';

const Navbar: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/10 backdrop-blur-md border-b border-white/10">
      <div className="container mx-auto px-4 flex items-center justify-between h-16">
        <div className="flex items-center">
          <a href="/" className="flex items-center gap-2 text-white font-bold text-2xl">
            <Leaf className="w-8 h-8" />
            <span className="text-shadow">AgriMarket</span>
          </a>
        </div>

        <nav className="hidden md:flex items-center space-x-8">
          <a 
            href="/" 
            className="text-white/90 hover:text-white transition-colors duration-200 text-shadow"
          >
            Home
          </a>
          <a 
            href="/dashboard" 
            className="text-white/90 hover:text-white transition-colors duration-200 text-shadow"
          >
            Dashboard
          </a>
          <a 
            href="/products" 
            className="text-white/90 hover:text-white transition-colors duration-200 text-shadow"
          >
            Products
          </a>
          <a 
            href="/pricing" 
            className="text-white/90 hover:text-white transition-colors duration-200 text-shadow"
          >
            Market Pricing
          </a>
          <a
          href="/news" 
            className="text-white/90 hover:text-white transition-colors duration-200 text-shadow"
          >
            News
          </a>
          <a
          href="/orders" 
            className="text-white/90 hover:text-white transition-colors duration-200 text-shadow"
          >
            Your Orders
          </a>
          <a 
            href="/ai" 
            className="text-white/90 hover:text-white transition-colors duration-200 text-shadow"
          >
            Ai-Recognition
          </a>
          <a 
            href="/connect" 
            className="text-white/90 hover:text-white transition-colors duration-200 text-shadow"
          >
            Connect
          </a>
        </nav>

        <div>
          <a
            href="/user"
            className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-green-600 to-green-500 px-6 py-2 text-sm font-medium text-white transition-all duration-300 hover:scale-105 hover:shadow-xl hover:from-green-500 hover:to-green-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            Profile
          </a>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
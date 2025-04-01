import React, { useEffect, useState } from 'react';
import Navbar from './navbar';
import LineChartComponent from './LineChartComponent';
import TaxBarChart from './TaxBarChart';
import { Brain as Grain, TrendingUp } from 'lucide-react';

function MarketPricing() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []); 

  return (
    <div className="min-h-screen relative overflow-hidden font-[Poppins]">
      {/* Parallax Background */}
      <div 
        className="fixed inset-0 w-full h-full z-0"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80")',
          backgroundPosition: `center ${scrollY * 0.5}px`,
          backgroundSize: 'cover',
          filter: 'brightness(0.7)',
        }}
      />

      {/* Content Container */}
      <div className="relative z-10">
        <Navbar />
        
        <div className="container mx-auto px-4 py-8 mt-8">
          <div className="flex items-center space-x-3 mb-8">
            <Grain className="w-8 h-8 text-yellow-400" />
            <h1 className="text-4xl font-bold text-white mt-6">Market Pricing Analytics</h1>
          </div>

          {/* Animated Data Box */}
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 mb-8 shadow-2xl hover:scale-105 transition-transform duration-300">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-4 bg-white/20 rounded-lg animate-pulse">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="text-green-400" />
                  <h3 className="text-xl font-semibold text-white">Current Trends</h3>
                </div>
                <p className="text-gray-200 mt-2">Real-time market analysis and pricing data for agricultural commodities</p>
              </div>
              <div className="p-4 bg-white/20 rounded-lg animate-pulse delay-100">
                <div className="flex items-center space-x-2">
                  <Grain className="text-yellow-400" />
                  <h3 className="text-xl font-semibold text-white">Crop Insights</h3>
                </div>
                <p className="text-gray-200 mt-2">Detailed breakdown of crop prices and market movements</p>
              </div>
              <div className="p-4 bg-white/20 rounded-lg animate-pulse delay-200">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="text-blue-400" />
                  <h3 className="text-xl font-semibold text-white">Price Forecasts</h3>
                </div>
                <p className="text-gray-200 mt-2">Predictive analytics for future market trends</p>
              </div>
            </div>
          </div>

          {/* Charts Container */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 shadow-xl hover:shadow-2xl transition-shadow duration-300">
              <h2 className="text-2xl font-semibold text-white mb-4">Price Trends</h2>
              <LineChartComponent />
            </div>
            <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 shadow-xl hover:shadow-2xl transition-shadow duration-300">
              <h2 className="text-2xl font-semibold text-white mb-4">Tax Distribution</h2>
              <TaxBarChart />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MarketPricing;
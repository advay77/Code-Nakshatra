import React, { useEffect, useState } from 'react';
import { Brain as Grain, TrendingUp, Sprout, Sun, Cloud, CloudRain, Wheat } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar, ResponsiveContainer } from 'recharts';
import Navbar from './navbar';

function App() {
  const [scrollY, setScrollY] = useState(0);
  const [activeTab, setActiveTab] = useState('english');

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []); 

  const translations = {
    english: {
      title: "Market Pricing Analytics",
      currentTrends: "Current Trends",
      currentTrendsDesc: "Real-time market analysis and pricing data for agricultural commodities",
      cropInsights: "Crop Insights",
      cropInsightsDesc: "Detailed breakdown of crop prices and market movements",
      priceForecast: "Price Forecasts",
      priceForecastDesc: "Predictive analytics for future market trends",
      priceTrends: "Price Trends",
      marketTrends: "Market Trends",
      weather: "Weather Forecast",
      cropPrices: "Current Crop Prices",
      rainfall: "Expected Rainfall",
      temperature: "Temperature",
      humidity: "Humidity",
      wheat: "Wheat",
      rice: "Rice",
      cotton: "Cotton",
      sugarcane: "Sugarcane",
      tomatoes: "Tomatoes",
      potatoes: "Potatoes",
      onions: "Onions",
      mangoes: "Mangoes",
      perQuintal: "per quintal",
      perKg: "per kg",
      lastUpdated: "Last Updated",
      priceChange: "Price Change",
      marketStatus: "Market Status",
      vegetables: "Vegetables",
      fruits: "Fruits"
    },
    hindi: {
      title: "बाजार मूल्य विश्लेषण",
      currentTrends: "वर्तमान रुझान",
      currentTrendsDesc: "कृषि वस्तुओं के लिए रीयल-टाइम बाजार विश्लेषण और मूल्य डेटा",
      cropInsights: "फसल अंतर्दृष्टि",
      cropInsightsDesc: "फसल की कीमतों और बाजार की गतिविधियों का विस्तृत विवरण",
      priceForecast: "मूल्य पूर्वानुमान",
      priceForecastDesc: "भविष्य के बाजार रुझानों के लिए भविष्यवाणी विश्लेषण",
      priceTrends: "मूल्य प्रवृत्तियां",
      marketTrends: "बाजार के रुझान",
      weather: "मौसम की भविष्यवाणी",
      cropPrices: "वर्तमान फसल मूल्य",
      rainfall: "संभावित वर्षा",
      temperature: "तापमान",
      humidity: "नमी",
      wheat: "गेहूं",
      rice: "चावल",
      cotton: "कपास",
      sugarcane: "गन्ना",
      tomatoes: "टमाटर",
      potatoes: "आलू",
      onions: "प्याज",
      mangoes: "आम",
      perQuintal: "प्रति क्विंटल",
      perKg: "प्रति किलो",
      lastUpdated: "अंतिम अपडेट",
      priceChange: "मूल्य परिवर्तन",
      marketStatus: "बाजार की स्थिति",
      vegetables: "सब्जियां",
      fruits: "फल"
    }
  };

  const weatherData = {
    temperature: "32°C",
    humidity: "65%",
    rainfall: "80%"
  };

  const cropPrices = [
    { crop: 'wheat', price: 2200, change: '+120', trend: 'up' },
    { crop: 'rice', price: 1950, change: '+80', trend: 'up' },
    { crop: 'cotton', price: 6500, change: '-150', trend: 'down' },
    { crop: 'sugarcane', price: 350, change: '+20', trend: 'up' }
  ];

  const priceTrendData = [
    { month: 'Jan', tomatoes: 40, potatoes: 25, onions: 35, mangoes: 0 },
    { month: 'Feb', tomatoes: 45, potatoes: 28, onions: 32, mangoes: 0 },
    { month: 'Mar', tomatoes: 35, potatoes: 22, onions: 38, mangoes: 120 },
    { month: 'Apr', tomatoes: 50, potatoes: 24, onions: 42, mangoes: 100 },
    { month: 'May', tomatoes: 55, potatoes: 26, onions: 45, mangoes: 80 },
    { month: 'Jun', tomatoes: 48, potatoes: 28, onions: 40, mangoes: 60 }
  ];

  const marketTrendData = [
    { name: translations[activeTab].tomatoes, current: 45, average: 35 },
    { name: translations[activeTab].potatoes, current: 28, average: 25 },
    { name: translations[activeTab].onions, current: 40, average: 38 },
    { name: translations[activeTab].mangoes, current: 80, average: 90 }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden font-[Poppins]">
      <Navbar/>
      <div 
        className="fixed inset-0 w-full h-full z-0 "
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80")',
          backgroundPosition: `center ${scrollY * 0.5}px`,
          backgroundSize: 'cover',
          filter: 'brightness(0.7)',
        }}
      />

      {/* Content Container */}
      <div className="relative z-10 ">
        {/* Language Toggle */}
        <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md rounded-full p-1 mt-10">
          <button 
            className={`px-4 py-2 rounded-full transition-all ${activeTab === 'english' ? 'bg-emerald-500 text-white' : 'text-white'}`}
            onClick={() => setActiveTab('english')}
          >
            English
          </button>
          <button 
            className={`px-4 py-2 rounded-full transition-all ${activeTab === 'hindi' ? 'bg-emerald-500 text-white' : 'text-white'}`}
            onClick={() => setActiveTab('hindi')}
          >
            हिंदी
          </button>
        </div>
        
        <div className="container mx-auto px-4 py-8 mt-8">
          <div className="flex items-center space-x-3 mb-8">
            <Sun className="w-12 h-12 text-yellow-400 animate-spin-slow" />
            <h1 className="text-4xl font-bold text-white mt-6 animate-fade-in">
              {translations[activeTab].title}
            </h1>
          </div>

          {/* Weather Information */}
          <div className="bg-emerald-900/30 backdrop-blur-lg rounded-xl p-6 mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">{translations[activeTab].weather}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-emerald-800/30 rounded-lg p-4 flex items-center justify-between">
                <div>
                  <p className="text-gray-300">{translations[activeTab].temperature}</p>
                  <p className="text-2xl text-white font-bold">{weatherData.temperature}</p>
                </div>
                <Sun className="w-8 h-8 text-yellow-400" />
              </div>
              <div className="bg-emerald-800/30 rounded-lg p-4 flex items-center justify-between">
                <div>
                  <p className="text-gray-300">{translations[activeTab].humidity}</p>
                  <p className="text-2xl text-white font-bold">{weatherData.humidity}</p>
                </div>
                <Cloud className="w-8 h-8 text-blue-400" />
              </div>
              <div className="bg-emerald-800/30 rounded-lg p-4 flex items-center justify-between">
                <div>
                  <p className="text-gray-300">{translations[activeTab].rainfall}</p>
                  <p className="text-2xl text-white font-bold">{weatherData.rainfall}</p>
                </div>
                <CloudRain className="w-8 h-8 text-blue-400" />
              </div>
            </div>
          </div>

          {/* Crop Prices */}
          <div className="bg-emerald-900/30 backdrop-blur-lg rounded-xl p-6 mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">{translations[activeTab].cropPrices}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {cropPrices.map((item) => (
                <div key={item.crop} className="bg-emerald-800/30 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg text-white">{translations[activeTab][item.crop]}</h3>
                    <Wheat className="w-6 h-6 text-yellow-400" />
                  </div>
                  <p className="text-2xl font-bold text-white">
                    ₹{item.price} <span className="text-sm text-gray-300">{translations[activeTab].perQuintal}</span>
                  </p>
                  <p className={`text-sm ${item.trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
                    {item.change}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Market Analysis */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-emerald-900/30 backdrop-blur-lg rounded-xl p-6 shadow-xl hover:shadow-2xl transition-shadow duration-300">
              <h2 className="text-2xl font-semibold text-white mb-4">{translations[activeTab].priceTrends}</h2>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={priceTrendData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
                    <XAxis dataKey="month" stroke="#fff" />
                    <YAxis stroke="#fff" />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#1f2937', border: 'none' }}
                      labelStyle={{ color: '#fff' }}
                    />
                    <Legend />
                    <Line type="monotone" dataKey="tomatoes" stroke="#ff6b6b" strokeWidth={2} />
                    <Line type="monotone" dataKey="potatoes" stroke="#ffd93d" strokeWidth={2} />
                    <Line type="monotone" dataKey="onions" stroke="#4ecdc4" strokeWidth={2} />
                    <Line type="monotone" dataKey="mangoes" stroke="#95e1d3" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="bg-emerald-900/30 backdrop-blur-lg rounded-xl p-6 shadow-xl hover:shadow-2xl transition-shadow duration-300">
              <h2 className="text-2xl font-semibold text-white mb-4">{translations[activeTab].marketTrends}</h2>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={marketTrendData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
                    <XAxis dataKey="name" stroke="#fff" />
                    <YAxis stroke="#fff" />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#1f2937', border: 'none' }}
                      labelStyle={{ color: '#fff' }}
                    />
                    <Legend />
                    <Bar dataKey="current" fill="#10b981" name="Current Price" />
                    <Bar dataKey="average" fill="#6366f1" name="Average Price" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
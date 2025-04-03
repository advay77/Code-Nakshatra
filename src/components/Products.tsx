import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tractor, Users, Wheat, SwitchCamera, ShoppingCart, Globe, Leaf, Sprout, Droplets, Warehouse, PenTool as Tool, Truck, Sun } from 'lucide-react';
import Navbar from './navbar';

type UserType = 'buyer' | 'farmer';
type Language = 'en' | 'hi';

interface Product {
  id: number;
  name: { en: string; hi: string };
  price: number;
  image: string;
  category: { en: string; hi: string };
  description: { en: string; hi: string };
}

interface Service {
  id: number;
  name: { en: string; hi: string };
  rate: { en: string; hi: string };
  availability: { en: string; hi: string };
  type: 'labor' | 'equipment' | 'storage' | 'transport' | 'irrigation';
  image: string;
  description: { en: string; hi: string };
  icon: keyof typeof serviceIcons;
}

const serviceIcons = {
  labor: Users,
  equipment: Tractor,
  storage: Warehouse,
  transport: Truck,
  irrigation: Droplets
};

// Generate 100 products
const generateProducts = (): Product[] => {
  const categories = [
    { en: 'Grains', hi: 'अनाज' },
    { en: 'Vegetables', hi: 'सब्जियां' },
    { en: 'Fruits', hi: 'फल' },
    { en: 'Seeds', hi: 'बीज' },
    { en: 'Fertilizers', hi: 'उर्वरक' }
  ];

  const products: Product[] = [];
  const images = [
    'https://images.unsplash.com/photo-1586201375761-83865001e31c',
    'https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c',
    'https://images.unsplash.com/photo-1610832958506-aa56368176cf',
    'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b',
    'https://images.unsplash.com/photo-1622383563227-04401ab4e5ea'
  ];

  for (let i = 1; i <= 100; i++) {
    const category = categories[Math.floor(Math.random() * categories.length)];
    const price = Math.floor(Math.random() * 5000) + 100;
    
    products.push({
      id: i,
      name: {
        en: `${category.en} Product ${i}`,
        hi: `${category.hi} उत्पाद ${i}`
      },
      price: price,
      image: images[Math.floor(Math.random() * images.length)],
      category: category,
      description: {
        en: `High quality ${category.en.toLowerCase()} from local farmers`,
        hi: `स्थानीय किसानों से उच्च गुणवत्ता वाले ${category.hi}`
      }
    });
  }
  return products;
};

const services: Service[] = [
  {
    id: 1,
    name: { en: "Farm Labor Team", hi: "कृषि श्रमिक टीम" },
    rate: { en: "₹1200/day", hi: "₹1200/दिन" },
    availability: { en: "Available Now", hi: "अभी उपलब्ध है" },
    type: "labor",
    image: "https://images.unsplash.com/photo-1595508064774-5ff825520bb8",
    description: {
      en: "Experienced team for planting, harvesting, and general farm work",
      hi: "रोपण, कटाई और सामान्य कृषि कार्य के लिए अनुभवी टीम"
    },
    icon: "labor"
  },
  {
    id: 2,
    name: { en: "Modern Tractor Rental", hi: "आधुनिक ट्रैक्टर किराया" },
    rate: { en: "₹8000/day", hi: "₹8000/दिन" },
    availability: { en: "Available from tomorrow", hi: "कल से उपलब्ध" },
    type: "equipment",
    image: "https://images.unsplash.com/photo-1605338198613-d6841c19d06c",
    description: {
      en: "Latest model tractors with various attachments for all farming needs",
      hi: "सभी कृषि आवश्यकताओं के लिए विभिन्न अटैचमेंट के साथ नवीनतम मॉडल ट्रैक्टर"
    },
    icon: "equipment"
  },
  {
    id: 3,
    name: { en: "Harvesting Team", hi: "कटाई टीम" },
    rate: { en: "₹15000/day", hi: "₹15000/दिन" },
    availability: { en: "Available Next Week", hi: "अगले सप्ताह उपलब्ध" },
    type: "labor",
    image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449",
    description: {
      en: "Professional team with modern harvesting equipment",
      hi: "आधुनिक कटाई उपकरणों के साथ पेशेवर टीम"
    },
    icon: "labor"
  },
  {
    id: 4,
    name: { en: "Cold Storage Facility", hi: "कोल्ड स्टोरेज सुविधा" },
    rate: { en: "₹5000/month", hi: "₹5000/महीना" },
    availability: { en: "Limited Space Available", hi: "सीमित जगह उपलब्ध" },
    type: "storage",
    image: "https://images.unsplash.com/photo-1580674684081-7617fbf3d745",
    description: {
      en: "Temperature-controlled storage for perishable produce",
      hi: "नाशवान उपज के लिए तापमान-नियंत्रित भंडारण"
    },
    icon: "storage"
  },
  {
    id: 5,
    name: { en: "Transport Service", hi: "परिवहन सेवा" },
    rate: { en: "₹2000/trip", hi: "₹2000/यात्रा" },
    availability: { en: "24/7 Available", hi: "24/7 उपलब्ध" },
    type: "transport",
    image: "https://images.unsplash.com/photo-1586191582056-b7f0372a3ce6",
    description: {
      en: "Reliable transport for your produce to local markets",
      hi: "स्थानीय बाजारों तक आपकी उपज के लिए विश्वसनीय परिवहन"
    },
    icon: "transport"
  },
  {
    id: 6,
    name: { en: "Drip Irrigation System", hi: "ड्रिप सिंचाई प्रणाली" },
    rate: { en: "₹20000/acre", hi: "₹20000/एकड़" },
    availability: { en: "Installation within 3 days", hi: "3 दिनों के भीतर स्थापना" },
    type: "irrigation",
    image: "https://images.unsplash.com/photo-1563514227147-6d2ff665a6a0",
    description: {
      en: "Water-efficient irrigation systems with smart controls",
      hi: "स्मार्ट नियंत्रण के साथ जल-कुशल सिंचाई प्रणाली"
    },
    icon: "irrigation"
  }
];

function Product() {
  const [userType, setUserType] = useState<UserType>('buyer');
  const [language, setLanguage] = useState<Language>('en');
  const [products] = useState<Product[]>(generateProducts());
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [selectedServiceType, setSelectedServiceType] = useState<string>('all');

  useEffect(() => {
    const filtered = products.filter(product =>
      product.name[language].toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category[language].toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchTerm, products, language]);

  const filteredServices = selectedServiceType === 'all'
    ? services
    : services.filter(service => service.type === selectedServiceType);

  // Floating leaves animation
  const LeafAnimation = () => {
    return (
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
  
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            initial={{ 
              top: -20,
              left: `${Math.random() * 100}%`,
              rotate: 0,
              scale: Math.random() * 0.5 + 0.5
            }}
            animate={{
              top: '100vh',
              rotate: 360,
              x: Math.sin(i) * 100
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            <Leaf className="text-green-500/20 w-8 h-8" />
          </motion.div>
        ))}
      </div>
    );
  };

  const ServiceTypeFilter = () => {
    const types = [
      { id: 'all', label: { en: 'All Services', hi: 'सभी सेवाएं' }, icon: Sprout },
      { id: 'labor', label: { en: 'Labor', hi: 'श्रमिक' }, icon: Users },
      { id: 'equipment', label: { en: 'Equipment', hi: 'उपकरण' }, icon: Tool },
      { id: 'storage', label: { en: 'Storage', hi: 'भंडारण' }, icon: Warehouse },
      { id: 'transport', label: { en: 'Transport', hi: 'परिवहन' }, icon: Truck },
      { id: 'irrigation', label: { en: 'Irrigation', hi: 'सिंचाई' }, icon: Droplets }
    ];

    return (
      <div className="flex flex-wrap gap-4 mb-8">
        {types.map(type => {
          const Icon = type.icon;
          return (
            <motion.button
              key={type.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedServiceType(type.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                selectedServiceType === type.id
                  ? 'bg-green-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-green-50'
              }`}
            >
              <Icon className="h-5 w-5" />
              <span>{type.label[language]}</span>
            </motion.button>
          );
        })}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-blue-50">
      <LeafAnimation />
      
      {/* Header */}
      <div className="bg-green-700 text-white p-6 sticky top-0 z-50 backdrop-blur-sm bg-opacity-90">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-4">
          <div className="flex items-center space-x-2">
            <motion.div
              whileHover={{ rotate: 180 }}
              transition={{ duration: 0.3 }}
            >
              <Wheat className="h-8 w-8" />
            </motion.div>
            <h1 className="text-2xl font-bold">
              {language === 'en' ? "Farmer's Marketplace" : 'किसान का बाज़ार'}
            </h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
              className="flex items-center space-x-2 bg-green-600 px-4 py-2 rounded-lg"
            >
              <Globe className="h-5 w-5" />
              <span>{language === 'en' ? 'हिंदी' : 'English'}</span>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setUserType(userType === 'buyer' ? 'farmer' : 'buyer')}
              className="flex items-center space-x-2 bg-green-600 px-4 py-2 rounded-lg"
            >
              <SwitchCamera className="h-5 w-5" />
              <span>
                {language === 'en'
                  ? `Switch to ${userType === 'buyer' ? 'Farmer' : 'Buyer'} Mode`
                  : userType === 'buyer' ? 'किसान मोड' : 'खरीदार मोड'}
              </span>
            </motion.button>
          </div>
        </div>
      </div>
      

      {/* Search Bar */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <input
            type="text"
            placeholder={language === 'en' ? "Search products..." : "उत्पाद खोजें..."}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          {userType === 'buyer' ? (
            <motion.div
              key="buyer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold mb-8 text-gray-800">
                {language === 'en' ? 'Fresh Farm Products' : 'ताज़े कृषि उत्पाद'}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    whileHover={{ y: -5 }}
                    className="bg-white rounded-lg shadow-md overflow-hidden"
                  >
                    <img 
                      src={product.image} 
                      alt={product.name[language]}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-gray-800">
                        {product.name[language]}
                      </h3>
                      <p className="text-gray-600 mt-1">
                        {product.description[language]}
                      </p>
                      <div className="mt-4 flex justify-between items-center">
                        <span className="text-xl font-bold text-green-600">
                          ₹{product.price}
                        </span>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="flex items-center space-x-2 bg-green-600 text-white px-3 py-1 rounded-lg"
                        >
                          <ShoppingCart className="h-4 w-4" />
                          <span>{language === 'en' ? 'Add' : 'जोड़ें'}</span>
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="farmer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold text-gray-800">
                  {language === 'en' ? 'Services & Equipment' : 'सेवाएं और उपकरण'}
                </h2>
                <div className="flex items-center space-x-2 text-green-700">
                  <Sun className="h-6 w-6 animate-spin-slow" />
                  <span className="font-medium">
                    {language === 'en' ? 'Perfect farming weather today!' : 'आज खेती के लिए एकदम सही मौसम!'}
                  </span>
                </div>
              </div>

              <ServiceTypeFilter />

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredServices.map((service) => (
                  <motion.div
                    key={service.id}
                    whileHover={{ y: -5 }}
                    className="bg-white rounded-lg shadow-md overflow-hidden"
                  >
                    <div className="relative">
                      <img 
                        src={service.image} 
                        alt={service.name[language]}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-green-700 font-medium">
                        {service.rate[language]}
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center space-x-2">
                        {React.createElement(serviceIcons[service.icon], {
                          className: "h-6 w-6 text-green-600"
                        })}
                        <h3 className="text-xl font-semibold text-gray-800">
                          {service.name[language]}
                        </h3>
                      </div>
                      <p className="mt-2 text-gray-600">
                        {service.description[language]}
                      </p>
                      <div className="mt-4 flex items-center justify-between">
                        <span className="text-sm font-medium px-3 py-1 bg-green-100 text-green-700 rounded-full">
                          {service.availability[language]}
                        </span>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="mt-4 w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-500 transition"
                      >
                        {language === 'en' ? 'Book Now' : 'अभी बुक करें'}
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default Product;
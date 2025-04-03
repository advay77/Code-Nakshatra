import { Home, ShoppingCart, LineChart, Brain, Users, LeafyGreen } from 'lucide-react';
import { UserButton } from '@clerk/clerk-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const navigationItems = [
  {
    title: 'Home',
    icon: <Home className="h-5 w-5" />,
    href: '/'
  },
  {
    title: 'Products',
    icon: <ShoppingCart className="h-5 w-5" />,
    href: '/products'
  },
  {
    title: 'Market Pricing',
    icon: <LineChart className="h-5 w-5" />,
    href: '/pricing'
  },
  {
    title: 'AI Recognition',
    icon: <Brain className="h-5 w-5" />,
    href: '/ai'
  },
  {
    title: 'Connect',
    icon: <Users className="h-5 w-5" />,
    href: 'https://fastidious-meerkat-0a2e22.netlify.app/'
  }
];

function Navbar() {
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      {/* Gradient background with glass effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-green-800 via-green-700 to-green-900 backdrop-blur-md border-b "></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex justify-between items-center h-20">
          {/* Logo with enhanced animation */}
          <motion.div
            className="flex items-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link to="/" className="flex items-center gap-3 group">
              <motion.div
                whileHover={{ rotate: 360, scale: 1.2 }}
                transition={{ duration: 0.7, type: "spring" }}
                className="relative"
              >
                <div className="absolute inset-0 bg-purple-400 rounded-full blur-lg opacity-50 group-hover:opacity-70 transition-opacity"></div>
                <LeafyGreen className="w-10 h-10 text-white relative z-10" />
              </motion.div>
              <span className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-purple-200">
                AgriMarket
              </span>
            </Link>
          </motion.div>

          {/* Navigation Items with enhanced styling */}
          <div className="hidden md:flex items-center gap-2">
            {navigationItems.map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to={item.href}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-purple-100 hover:bg-white/10 transition-all duration-300 relative group"
                >
                  <span className="text-purple-200 group-hover:text-white transition-colors">{item.icon}</span>
                  <span className="font-medium group-hover:text-white transition-colors">{item.title}</span>
                  <motion.div
                    className="absolute inset-0 bg-white/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                    layoutId={`nav-hover-${index}`}
                  />
                </Link>
              </motion.div>
            ))}
            
            {/* User Profile Button with enhanced styling */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="ml-4"
            >
              <div className="relative group">
                <div className="absolute inset-0 bg-purple-400 rounded-full blur-md opacity-0 group-hover:opacity-30 transition-opacity"></div>
                <UserButton 
                  afterSignOutUrl="/"
                  appearance={{
                    elements: {
                      avatarBox: "w-9 h-9 rounded-full border-2 border-purple-300/50 hover:border-white transition-colors duration-300"
                    }
                  }}
                />
              </div>
            </motion.div>
          </div>

          {/* Enhanced Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="md:hidden p-2 rounded-lg text-white hover:bg-white/10 transition-colors relative group"
          >
            <div className="absolute inset-0 bg-purple-400 rounded-lg blur-md opacity-0 group-hover:opacity-20 transition-opacity"></div>
            <svg
              className="w-6 h-6 relative z-10"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </motion.button>
        </div>
      </div>

      {/* Enhanced Mobile Navigation Menu */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="hidden md:hidden px-4 pb-4 relative z-10"
      >
        {navigationItems.map((item, index) => (
          <Link
            key={index}
            to={item.href}
            className="flex items-center gap-2 px-4 py-3 text-purple-100 hover:bg-white/10 rounded-lg group transition-colors relative"
          >
            <span className="text-purple-200 group-hover:text-white transition-colors">{item.icon}</span>
            <span className="font-medium group-hover:text-white transition-colors">{item.title}</span>
          </Link>
        ))}
      </motion.div>
    </motion.nav>
  );
}

export default Navbar;
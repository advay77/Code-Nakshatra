import { Home, LayoutDashboard, ShoppingCart, LineChart, Brain, Users, LeafyGreen } from 'lucide-react';
import { FloatingDock } from './ui/floating-dock';
import { UserButton } from '@clerk/clerk-react';
import { motion } from 'framer-motion';

const navigationItems = [
  {
    title: 'Home',
    icon: <Home className="h-6 w-6" />,
    href: '/'
  },
 
  {
    title: 'Products',
    icon: <ShoppingCart className="h-6 w-6" />,
    href: '/products'
  },
  {
    title: 'Market Pricing',
    icon: <LineChart className="h-6 w-6" />,
    href: '/pricing'
  },
  {
    title: 'AI Recognition',
    icon: <Brain className="h-6 w-6" />,
    href: '/ai'
  },
  {
    title: 'Connect',
    icon: <Users className="h-6 w-6" />,
    href: 'https://fastidious-meerkat-0a2e22.netlify.app/'
  },
  {
    title: 'Profile',
    icon: <UserButton afterSignOutUrl="/" />,
    href: '/'
  },
];

function Navbar() {
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className="fixed top-0 left-0 right-0 z-50 bg-transparent backdrop-blur-[2px]"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex justify-between items-center h-24">
          <motion.div
            className="flex items-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <a href="/" className="flex items-center gap-4">
              <LeafyGreen className="w-12 h-12 text-green-600 dark:text-green-400" />
              <span className="text-4xl font-bold bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent">
                AgriMarket
              </span>
            </a>
          </motion.div>

          <FloatingDock
            items={navigationItems}
            desktopClassName="py-3 flex items-center gap-12"
            mobileClassName="flex md:hidden"
          />
        </div>
      </div>
    </motion.nav>
  );
}

export default Navbar;
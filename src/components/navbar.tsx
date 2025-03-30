import { Home, LayoutDashboard, ShoppingCart, LineChart, Brain, Users, LeafyGreen } from 'lucide-react';
import { FloatingDock } from './ui/floating-dock';
import { UserButton, UserProfile } from '@clerk/clerk-react';

const navigationItems = [
  {
    title: 'AgriMarket',
    icon: < LeafyGreen className="w-5 " />,
    href: '/'
  },
  {
    title: 'Home',
    icon: <Home className="h-full w-full" />,
    href: '/'
  },
  {
    title: 'Dashboard',
    icon: <LayoutDashboard className="h-full w-full" />,
    href: '/dashboard'
  },
  {
    title: 'Products',
    icon: <ShoppingCart className="h-full w-full" />,
    href: '/products'
  },
  {
    title: 'Market Pricing',
    icon: <LineChart className="h-full w-full" />,
    href: '/pricing'
  },
  {
    title: 'AI Recognition',
    icon: <Brain className="h-full w-full " />,
    href: '/ai'
  },
  {
    title: 'Connect',
    icon: <Users className="h-full w-full " />,
    href: '/connect'
  },
  {
    title: 'Profile',

    icon: <UserButton />,
    href: '/'
  },
];
function Navbar () {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-transparent bg-gray-50 dark:bg-neutral-900/80 backdrop-blur-sm  flex flex-row justify-around items-center">
      <div>
        <h1 className='text-green-900 text-3xl text-bold flex flex-row justify-around items-center'>
          <LeafyGreen className="w-5 " />
          AgriMarket
        </h1>
        </div>
      <div>
      <FloatingDock
        items={navigationItems}
        desktopClassName="  py-6 flex items-center gap-20"
        mobileClassName="absolute top-4 right-7"
      />
      </div>
    </div>
  );
};

export default Navbar;
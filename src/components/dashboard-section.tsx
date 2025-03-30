import React, { useEffect, useState } from 'react';
import { Truck, Leaf, Shield, Link } from 'lucide-react';
import Navbar from './navbar';
import { ImagesSlider } from './ui/images-slider';
import { TypewriterEffect } from './ui/typewriter-effect';
import { SignedOut, SignInButton, SignedIn, UserButton } from '@clerk/clerk-react';
import { Links } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    setIsVisible(true);

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      {/* Hero Section with Enhanced Parallax and Nature Theme */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* background image */}
        {/* <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transform scale-110"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80")',
            transform: `translateY(${scrollY * 0.5}px) scale(${1.1 + scrollY * 0.0002})`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60 backdrop-blur-[2px]"></div>
        </div> */}

        <ImagesSlider images={["https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80%22", "https://images.unsplash.com/photo-1560493676-04071c5f467b?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", "https://images.unsplash.com/photo-1465471736877-2c8bf4536ebf?q=80&w=1076&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"]} >
               <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-4xl font-bold">
               <TypewriterEffect words={[{text:"Welcome  ",className: "text-white"},
                {text:" to",className: "text-white"},
                {text:" the",className: "text-white"},
                {text:"AGRIMARKET",className: "text-white"}
               ]}/>
                <p className="text-2xl mb-8 max-w-2xl mx-auto text-white/90 text-shadow-lg animate-description-entry mt-8">
                Experience farm-fresh produce with cutting-edge agricultural innovation
          </p>
          
          <SignInButton >
            <button className="group relative mt-4 ml-28 bg-gradient-to-r from-green-600 to-green-500 text-white font-medium py-4 px-5 rounded-full transform transition-all duration-500 hover:scale-105 hover:shadow-[0_0_30px_rgba(34,197,94,0.3)] animate-button-entry overflow-hidden">
            <span className="absolute inset-0 bg-gradient-to-r from-green-400 to-green-300 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></span>
            <span className="">Explore Now</span>
          </button>
          </SignInButton>
        <SignedIn>
        <UserButton />
        <Link to="/dashboard">
          <button className="btn">Go to Dashboard</button>
        </Link>
      </SignedIn>
                
              
           </div>
        </ImagesSlider>
        
        

        {/* Animated Overlay Elements */}
        {/* <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-black/40 to-transparent"></div>
          <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-black/40 to-transparent"></div>
        </div>

        <div className={`relative z-10 text-center px-4 transform perspective-1000 ${
          isVisible ? 'animate-hero-entry' : ''
        }`}>
          <div className="relative inline-block">
            <span className="absolute -inset-4 bg-green-500/20 blur-xl rounded-full animate-pulse"></span>
            <p className="relative text-2xl mb-4 text-yellow-200 font-light tracking-wide animate-float">
              Welcome to the Future of Agriculture
            </p>
          </div>
          <h1 className="text-8xl font-bold mb-6 text-white text-shadow-xl bg-clip-text bg-gradient-to-r from-white to-white/80 animate-title-entry">
            AgriMarket
          </h1>
          <p className="text-2xl mb-8 max-w-2xl mx-auto text-white/90 text-shadow-lg animate-description-entry">
            Experience farm-fresh produce with cutting-edge agricultural innovation
          </p>
          <button className="group relative bg-gradient-to-r from-green-600 to-green-500 text-white font-medium py-4 px-10 rounded-full transform transition-all duration-500 hover:scale-105 hover:shadow-[0_0_30px_rgba(34,197,94,0.3)] animate-button-entry overflow-hidden">
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-green-400 to-green-300 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></span>
            <span className="relative">Explore Now</span>
          </button>
        </div> */}

        {/* Enhanced Animated Background Elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/4 -right-20 w-96 h-96 bg-gradient-to-br from-green-400/30 to-transparent rounded-full animate-float-slow blur-2xl"></div>
          <div className="absolute bottom-1/4 -left-20 w-80 h-80 bg-gradient-to-tr from-yellow-400/30 to-transparent rounded-full animate-float-delayed blur-2xl"></div>
          <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-gradient-to-tr from-blue-400/20 to-transparent rounded-full animate-float-super-slow blur-xl"></div>
        </div>
      </section>

      {/* Features Section with Enhanced 3D Cards */}
      <section className="relative py-32 px-4 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1587593810167-a84920ea0781?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center opacity-10"></div>
        <div className="container mx-auto relative z-10">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Truck className="w-8 h-8" />,
                title: "Same Day Delivery",
                description: "Fresh from farm to your doorstep",
              },
              {
                icon: <Leaf className="w-8 h-8" />,
                title: "100% Organic",
                description: "Certified organic produce only",
              },
              {
                icon: <Shield className="w-8 h-8" />,
                title: "Quality Assured",
                description: "Rigorous quality control standards",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="group relative bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm p-8 rounded-xl shadow-xl transform transition-all duration-500 hover:scale-105 hover:-translate-y-2 hover:shadow-2xl perspective-card"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <div className="w-16 h-16 flex items-center justify-center text-green-400 mb-6 transform transition-transform duration-500 group-hover:scale-110 group-hover:text-green-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-semibold mb-4 text-white group-hover:text-green-200 transition-colors duration-300">{feature.title}</h3>
                  <p className="text-gray-300 group-hover:text-gray-200 transition-colors duration-300">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Showcase with Enhanced 3D Transform */}
      <section className="relative py-32 px-4 bg-gradient-to-b from-gray-900 to-black overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1574943320219-553eb213f72d?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80')] bg-cover bg-fixed opacity-20"></div>
        <div className="container mx-auto relative z-10">
          <h2 className="text-6xl font-bold text-center mb-4 text-white animate-fade-in bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text">
            Featured Products
          </h2>
          <p className="text-xl text-center text-gray-300 mb-16 animate-fade-in">
            Handpicked selections from our finest farmers
          </p>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                image: "https://images.unsplash.com/photo-1597362925123-77861d3fbac7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
                title: "Premium Vegetables",
                description: "Farm-fresh organic vegetables",
              },
              {
                image: "https://images.unsplash.com/photo-1546630392-db5b1f93cf27?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
                title: "Exotic Fruits",
                description: "Seasonal fruits from around the world",
              },
              {
                image: "https://images.unsplash.com/photo-1591805182771-5b1c42681e1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
                title: "Fresh Herbs",
                description: "Aromatic herbs for your cuisine",
              },
            ].map((product, index) => (
              <div
                key={index}
                className="group relative transform transition-all duration-500 hover:scale-105 perspective-1000"
              >
                <div className="relative rounded-xl overflow-hidden shadow-2xl">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent z-10"></div>
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-96 object-cover transform transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-8 z-20 transform transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                    <h3 className="text-2xl font-semibold mb-2 text-white group-hover:text-green-200 transition-colors duration-300">{product.title}</h3>
                    <p className="text-gray-200 mb-6">{product.description}</p>
                    <button className="bg-white/10 backdrop-blur-sm text-white px-6 py-2 rounded-full transform transition-all duration-300 hover:bg-white/20 hover:scale-105 hover:shadow-lg">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section with Enhanced Glassmorphism */}
      <section className="relative py-32 px-4 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80")',
          }}
        >
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>
        </div>
        
        <div className="container mx-auto max-w-4xl relative z-10">
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-16 border border-white/20 shadow-[0_0_40px_rgba(255,255,255,0.1)]">
            <h2 className="text-5xl font-bold text-center mb-4 text-white text-shadow-lg">Stay Connected</h2>
            <p className="text-xl text-center text-gray-200 mb-12">
              Join our community of agricultural enthusiasts
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-8 py-4 rounded-full bg-white/10 border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 backdrop-blur-sm transition-all duration-300 hover:bg-white/15"
              />
              <button className="group relative bg-gradient-to-r from-green-500 to-green-400 text-white px-10 py-4 rounded-full transform transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-green-500/20">
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-green-400 to-green-300 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-full"></span>
                <span className="relative">Subscribe</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// Add the enhanced animations and styles
const style = document.createElement('style');
style.textContent = `
  .text-shadow {
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  }

  .text-shadow-lg {
    text-shadow: 4px 4px 8px rgba(0, 0, 0, 0.5);
  }

  .text-shadow-xl {
    text-shadow: 6px 6px 12px rgba(0, 0, 0, 0.7);
  }

  .perspective-1000 {
    perspective: 1000px;
  }

  .perspective-card {
    transform-style: preserve-3d;
  }

  @keyframes heroEntry {
    from {
      opacity: 0;
      transform: translateY(40px) scale(0.95);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  @keyframes titleEntry {
    from {
      opacity: 0;
      transform: translateY(-50px) scale(0.9);
      filter: blur(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
      filter: blur(0);
    }
  }

  @keyframes descriptionEntry {
    from {
      opacity: 0;
      transform: translateY(30px);
      filter: blur(5px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
      filter: blur(0);
    }
  }

  @keyframes buttonEntry {
    from {
      opacity: 0;
      transform: translateY(20px) scale(0.9);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-20px); }
  }

  @keyframes floatSlow {
    0%, 100% { 
      transform: translateY(0) rotate(0deg); 
      opacity: 0.6;
    }
    50% { 
      transform: translateY(-30px) rotate(5deg);
      opacity: 0.8;
    }
  }

  @keyframes floatSuperSlow {
    0%, 100% { 
      transform: translateY(0) rotate(0deg) scale(1);
      opacity: 0.4;
    }
    50% { 
      transform: translateY(-40px) rotate(-5deg) scale(1.1);
      opacity: 0.6;
    }
  }

  .animate-hero-entry {
    animation: heroEntry 1.5s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
  }

  .animate-title-entry {
    animation: titleEntry 1.2s cubic-bezier(0.2, 0.8, 0.2, 1) 0.5s forwards;
    opacity: 0;
  }

  .animate-description-entry {
    animation: descriptionEntry 1.2s cubic-bezier(0.2, 0.8, 0.2, 1) 0.8s forwards;
    opacity: 0;
  }

  .animate-button-entry {
    animation: buttonEntry 1s cubic-bezier(0.2, 0.8, 0.2, 1) 1.1s forwards;
    opacity: 0;
  }

  .animate-float {
    animation: float 6s ease-in-out infinite;
  }

  .animate-float-slow {
    animation: floatSlow 8s ease-in-out infinite;
  }

  .animate-float-super-slow {
    animation: floatSuperSlow 12s ease-in-out infinite;
  }

  .animate-float-delayed {
    animation: float 7s ease-in-out infinite;
    animation-delay: 1s;
  }
`;
document.head.appendChild(style);

export default Dashboard;
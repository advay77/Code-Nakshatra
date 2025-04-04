import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";
import { InfiniteMovingCards } from "./ui/infinite-moving-cards";
import { HeroParallax } from "./ui/hero-parallax";
import Navbar from "./navbar";
import { SignInButton } from "@clerk/clerk-react";
import { Sun, Moon, Plane as Plant, CloudRain, Tractor } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

function SecondDashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [weatherIcon, setWeatherIcon] = useState<"sun" | "rain">("sun");
  const circleRef = useRef(null);
  const bgRef = useRef(null);
  const textRef = useRef(null);
  const heroRef = useRef(null);
  const cardsRef = useRef(null);

  useEffect(() => {
    // Initial loading animation
    const loadingTimeline = gsap.timeline({
      onComplete: () => setIsLoading(false),
    });

    loadingTimeline
      .fromTo(
        circleRef.current,
        { scale: 0, opacity: 1 },
        {
          scale: 30,
          duration: 1.8,
          ease: "power2.out",
        }
      )
      .to(circleRef.current, {
        scale: 0.5,
        opacity: 0,
        duration: 1.5,
        ease: "power2.inOut",
      });

    // Parallax and scroll animations
    gsap.to(bgRef.current, {
      scale: 1.08,
      duration: 3,
      ease: "power2.out",
      scrollTrigger: {
        trigger: bgRef.current,
        start: "top center",
        end: "bottom top",
        scrub: true,
      },
    });

    // Weather icon animation
    const weatherInterval = setInterval(() => {
      setWeatherIcon((prev) => (prev === "sun" ? "rain" : "sun"));
    }, 5000);

    return () => clearInterval(weatherInterval);
  }, []);

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <AnimatePresence>
      <div className="relative w-screen min-h-screen overflow-hidden bg-gradient-to-b from-gray-900 to-gray-800">
        <Navbar />
        
        {/* Dynamic Background */}
        <div
          ref={bgRef}
          className="absolute inset-0 w-full h-full bg-cover bg-center transition-opacity duration-1000"
          style={{
            backgroundImage: "url('https://source.unsplash.com/1600x900/?farm,agriculture')",
          }}
        />

        {/* Animated Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm" />

        {/* Loading Circle */}
        <div
          ref={circleRef}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-green-400 rounded-full z-10"
        />

        {/* Main Content */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1 },
          }}
          transition={{ duration: 1, delay: 1.5 }}
          className="relative flex flex-col items-center gap-10 py-20 text-white z-20"
        >
          {/* Animated Weather Icon */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute top-10 right-10"
          >
            {weatherIcon === "sun" ? (
              <Sun size={32} className="text-yellow-400" />
            ) : (
              <CloudRain size={32} className="text-blue-400" />
            )}
          </motion.div>

          {/* Main Title */}
          <motion.h1
            ref={textRef}
            variants={fadeInUp}
            className="text-5xl font-bold text-center mt-10 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-emerald-600"
          >
            Welcome to Your AgriMarket
          </motion.h1>

          {/* Feature Icons */}
          <motion.div
            variants={fadeInUp}
            className="flex gap-8 mt-8"
          >
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="flex flex-col items-center"
            >
              <Plant className="w-8 h-8 text-green-400" />
              <span className="text-sm mt-2">Crop Guide</span>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="flex flex-col items-center"
            >
              <Tractor className="w-8 h-8 text-green-400" />
              <span className="text-sm mt-2">Equipment</span>
            </motion.div>
          </motion.div>

          {/* Sign In Button */}
          <SignInButton>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative mt-4 bg-gradient-to-r from-green-600 to-green-500 text-white font-medium py-4 px-8 rounded-full transform transition-all duration-500 hover:shadow-[0_0_30px_rgba(34,197,94,0.3)] overflow-hidden"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-green-400 to-green-300 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              <span className="relative z-10">Start Your Journey</span>
            </motion.button>
          </SignInButton>

          {/* Hero Parallax */}
          <motion.div
            ref={heroRef}
            variants={fadeInUp}
            className="w-full max-w-7xl mx-auto"
          >
            <HeroParallax
              products={[
                {
                  title: "AI Disease Detection",
                  link: "#",
                  thumbnail: "https://media.istockphoto.com/id/1167738271/photo/farmers-holds-a-smartphone-on-a-background-of-a-field-with-a-carrot-plantations-agricultural.jpg?s=2048x2048&w=is&k=20&c=9rD1u6uidYQ1f3X5zvPfd255-95GnJ6iRqYUyGaqlIU=",
                },
                {
                  title: "Marketplace",
                  link: "#",
                  thumbnail: "https://plus.unsplash.com/premium_photo-1697730253518-b9d95d43f628?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                },
                {
                  title: "Weather Updates",
                  link: "#",
                  thumbnail: "https://images.unsplash.com/photo-1655379992794-85b92d922524?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                },
                {
                  title: "Market Prices",
                  link: "#",
                  thumbnail: "https://images.unsplash.com/photo-1644143153646-f36282dfb953?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                },
                {
                  title: "AI Assistance",
                  link: "#",
                  thumbnail: "https://media.istockphoto.com/id/2095551020/photo/farmer-inspects-barley-and-uses-agricultural-technology-to-analyze-data-via-tablet-concept-of.jpg?s=2048x2048&w=is&k=20&c=2RuWxCQGx3MG5a2jC0N2oTDP6SULATcrrXlXFYFAc-E=",
                },
              ]}
            />
          </motion.div>

          {/* Testimonials */}
          <motion.div
            ref={cardsRef}
            variants={fadeInUp}
            className="w-full"
          >
            <InfiniteMovingCards
              items={[
                {
                  quote: "Game Changer",
                  name: "Ramesh Yadav",
                  title: "Small-Scale Farmer, UP - AgriMarket has transformed my crop selling process with real-time market prices.",
                },
                {
                  quote: "Amazing",
                  name: "Savitri Devi",
                  title: "Organic Farmer, MP - Easy access to farming tips and crucial weather updates has improved my productivity.",
                },
                {
                  quote: "Very Helpful",
                  name: "Bhavesh Patel",
                  title: "Dairy & Crop Farmer, Gujarat - Sold equipment quickly and found great community support!",
                },
              ]}
              className="bg-transparent w-full z-10"
            />
          </motion.div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

export default SecondDashboard;
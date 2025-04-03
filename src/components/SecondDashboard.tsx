import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { InfiniteMovingCards } from "./ui/infinite-moving-cards";
import { HeroParallax } from "./ui/hero-parallax";
import Navbar from "./navbar";
import { SignInButton } from "@clerk/clerk-react";

gsap.registerPlugin(ScrollTrigger);

function SecondDashboard() {
  const circleRef = useRef(null);
  const bgRef = useRef(null);
  const textRef = useRef(null);
  const heroRef = useRef(null);
  const cardsRef = useRef(null);

  useEffect(() => {
    // Light Blue Circle Animation (Zoom-in & Shrink Back)
    gsap.fromTo(
      circleRef.current,
      { scale: 0, opacity: 1 },
      {
        scale: 30, // First zoom-in
        duration: 1.8,
        ease: "power2.out",
        onComplete: () => {
          gsap.to(circleRef.current, {
            scale: 0.5, // Shrink back
            opacity: 0,
            duration: 1.5,
            ease: "power2.inOut",
          });
        },
      }
    );

    // Background Parallax Zoom Effect
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

    // Text Fade-in Animation
    gsap.fromTo(
      textRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1.5,
        ease: "power2.out",
        delay: 1,
      }
    );

    // HeroParallax Fade-in & Scale Animation
    gsap.fromTo(
      heroRef.current,
      { opacity: 0, scale: 0.8 },
      {
        opacity: 1,
        scale: 1,
        duration: 1.5,
        ease: "power2.out",
        delay: 1.5,
      }
    );

    // InfiniteMovingCards Slide-up Effect
    gsap.fromTo(
      cardsRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1.5,
        ease: "power2.out",
        delay: 2,
      }
    );
  }, []);

  return (
    <div className="relative w-screen min-h-screen overflow-hidden bg-gray-900">
      <Navbar/>
      {/* Background with GSAP Zoom Effect */}
      <div
        ref={bgRef}
        className="absolute inset-0 w-full h-full bg-cover bg-center"
        style={{
          backgroundImage: "url('https://source.unsplash.com/1600x900/?farm,agriculture')",
        }}
      ></div>

      {/* Overlay for Better Visibility */}
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>

      {/* Light Blue Animated Circle */}
      <div
        ref={circleRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-blue-300 rounded-full z-10"
      ></div>

      {/* Main Content */}
      <div className="relative flex flex-col items-center gap-10 py-20 text-white z-20">
        {/* Text Fade-in */}
        <h1 ref={textRef} className="text-7xl font-bold text-center mt-10 text-gray-200">
          Welcome to Your AgriMarket
        </h1>
      <SignInButton>
       
        
            <button className="group relative mt-4 ml-28 bg-gradient-to-r from-green-600 to-green-500 text-white font-medium py-4 px-5 rounded-full transform transition-all duration-500 hover:scale-105 hover:shadow-[0_0_30px_rgba(34,197,94,0.3)] animate-button-entry overflow-hidden">
            <span className="absolute inset-0 bg-gradient-to-r from-green-400 to-green-300 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></span>
            <span className="">Explore Now</span>
          
          
</button></SignInButton>

        {/* HeroParallax (Fade-in & Scale) */}
        <div ref={heroRef}>
          <HeroParallax
            products={[
              {
                title: "AI Image-Based Disease Detection",
                link: "#",
                thumbnail: "https://media.istockphoto.com/id/1167738271/photo/farmers-holds-a-smartphone-on-a-background-of-a-field-with-a-carrot-plantations-agricultural.jpg?s=2048x2048&w=is&k=20&c=9rD1u6uidYQ1f3X5zvPfd255-95GnJ6iRqYUyGaqlIU=",
              },
              {
                title: "Marketplace for Crops and Equipment",
                link: "#",
                thumbnail: "https://plus.unsplash.com/premium_photo-1697730253518-b9d95d43f628?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
              },
              {
                title: "Live Weather Updates",
                link: "#",
                thumbnail: "https://images.unsplash.com/photo-1655379992794-85b92d922524?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
              },
              {
                title: "Market Pricing Information",
                link: "#",
                thumbnail: "https://images.unsplash.com/photo-1644143153646-f36282dfb953?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
              },
              {
                title: "Farming Guidance & AI Assistance",
                link: "#",
                thumbnail: "https://media.istockphoto.com/id/2095551020/photo/farmer-inspects-barley-and-uses-agricultural-technology-to-analyze-data-via-tablet-concept-of.jpg?s=2048x2048&w=is&k=20&c=2RuWxCQGx3MG5a2jC0N2oTDP6SULATcrrXlXFYFAc-E=",
              },
              {
                title: "Farming Guidance & AI Assistance",
                link: "#",
                thumbnail: "https://media.istockphoto.com/id/2095551020/photo/farmer-inspects-barley-and-uses-agricultural-technology-to-analyze-data-via-tablet-concept-of.jpg?s=2048x2048&w=is&k=20&c=2RuWxCQGx3MG5a2jC0N2oTDP6SULATcrrXlXFYFAc-E=",
              },
             
            ]}
          />
        </div>

        {/* InfiniteMovingCards (Slide-up Effect) */}
        <div ref={cardsRef}>
          <InfiniteMovingCards
            items={[
              { quote: "Game Changer", name: "Ramesh Yadav (Small-Scale Farmer, Uttar Pradesh)", title: "AgriMarket has changed the way I sell my crops Now I can check real-time market prices and connect with buyers without middlemen."},
              { quote: "Amazing", name: " Savitri Devi (Organic Farmer, Madhya Pradesh)", title: "I love how easy it is to get farming tips and weather updates. The emergency alert system also makes me feel safer while working in remote areas" },
              { quote: "very Helpful", name: " Bhavesh Patel (Dairy & Crop Farmer, Gujarat)", title: "The marketplace feature is a blessing! I sold my old farming equipment within a week. The community support is also great for new farmers like me" },
              { quote: "Best Application", name: "Ramesh Yadav (Small-Scale Farmer, Uttar Pradesh)", title: "AgriMarket has changed the way I sell my crops Now I can check real-time market prices and connect with buyers without middlemen."},
            ]}
            className="bg-transparent w-full z-10 "
          />
        </div>

        {/* Extra Space for Scrolling */}
        <div className="h-[50vh]"></div>
      </div>
    </div>
  );
}

export default SecondDashboard;

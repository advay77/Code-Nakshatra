import React from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
} from "framer-motion";
import { Link } from "react-router-dom";

export const HeroParallax = ({
  products,
}: {
  products: {
    title: string;
    link: string;
    thumbnail: string;
  }[];
}) => {
  const firstRow = products.slice(0, 5);
  const secondRow = products.slice(5, 10);
  const thirdRow = products.slice(10, 15);
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const springConfig = { stiffness: 200, damping: 40, bounce: 0 };

  const translateX = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 500]),
    springConfig
  );
  const translateXReverse = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -500]),
    springConfig
  );
  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [10, 0]),
    springConfig
  );
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [0.3, 1]),
    springConfig
  );
  const rotateZ = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [10, 0]),
    springConfig
  );
  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [-300, 0]),
    springConfig
  );

  return (
    <div
      ref={ref}
      className="h-[300vh] py-20 overflow-x-hidden antialiased relative flex flex-col self-auto [perspective:1000px] [transform-style:preserve-3d]"
    >
      <Header />
      <motion.div
        style={{
          rotateX,
          rotateZ,
          translateY,
          opacity,
        }}
        className="container mx-auto"
      >
        <motion.div className="flex overflow-x-auto pb-8 mb-20 snap-x snap-mandatory">
          <div className="flex space-x-6 min-w-max px-4">
            {firstRow.map((product) => (
              <ProductCard
                product={product}
                translate={translateX}
                key={product.title}
              />
            ))}
          </div>
        </motion.div>
        <motion.div className="flex overflow-x-auto pb-8 mb-20 snap-x snap-mandatory">
          <div className="flex space-x-6 min-w-max px-4">
            {secondRow.map((product) => (
              <ProductCard
                product={product}
                translate={translateXReverse}
                key={product.title}
              />
            ))}
          </div>
        </motion.div>
        <motion.div className="flex overflow-x-auto pb-8 snap-x snap-mandatory">
          <div className="flex space-x-6 min-w-max px-4">
            {thirdRow.map((product) => (
              <ProductCard
                product={product}
                translate={translateX}
                key={product.title}
              />
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export const Header = () => {
  return (
    <div className="max-w-7xl relative mx-auto py-20 px-4 w-full left-0 top-0">
      <h1 className="text-4xl md:text-7xl font-bold text-white">
        AgriMarket <br /> 
        <span className="text-2xl md:text-5xl text-white">
          Your Digital Farming Marketplace
        </span>
      </h1>
      <p className="max-w-2xl text-base md:text-xl mt-8 text-white">
        Discover the future of agriculture with our comprehensive marketplace. 
        Connect with farmers, access real-time market prices, and explore the 
        latest agricultural products and technologies.
      </p>
    </div>
  );
};

export const ProductCard = ({
  product,
  translate,
}: {
  product: {
    title: string;
    link: string;
    thumbnail: string;
  };
  translate: MotionValue<number>;
}) => {
  return (
    <motion.div
      style={{
        x: translate,
      }}
      whileHover={{
        y: -10,
        scale: 1.02,
        transition: { duration: 0.2 }
      }}
      key={product.title}
      className="group/product h-80 w-[24rem] relative shrink-0 snap-center"
    >
      <Link
        to={product.link}
        className="block group-hover/product:shadow-2xl rounded-xl overflow-hidden"
      >
        <img
          src={product.thumbnail}
          className="object-cover object-center absolute h-full w-full inset-0 rounded-xl transition-transform duration-300 group-hover/product:scale-105"
          alt={product.title}
        />
      </Link>
      <div className="absolute inset-0 h-full w-full opacity-0 group-hover/product:opacity-90 bg-gradient-to-t from-green-900/90 to-transparent rounded-xl transition-opacity duration-300"></div>
      <div className="absolute bottom-0 left-0 p-4 w-full">
        <h2 className="text-xl font-semibold opacity-0 group-hover/product:opacity-100 text-white transform translate-y-4 group-hover/product:translate-y-0 transition-all duration-300">
          {product.title}
        </h2>
      </div>
    </motion.div>
  );
};

export default HeroParallax;
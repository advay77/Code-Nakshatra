import React from 'react';
import { motion } from 'framer-motion';



const NewsItem({ title, description, imageUrl, newsUrl }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.02 }}
      className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg overflow-hidden hover-scale card-shadow"
    >
      <img 
        src={imageUrl} 
        className="w-full h-48 object-cover transform transition-transform duration-300 hover:scale-105"
        alt={title}
        onError={(e) => {
          const target = e.target;
          target.src = 'https://images.unsplash.com/photo-1495107334309-fcf20504a5ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80';
        }}
      />
      <div className="p-6">
        <h5 className="text-xl font-semibold mb-3 gradient-text">{title}</h5>
        <p className="text-gray-600 mb-4 line-clamp-3">{description}</p>
        <motion.a 
          href={newsUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-block bg-gradient-to-r from-green-500 to-green-700 text-white px-6 py-2 rounded-full hover:shadow-lg transition-all duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Read More
        </motion.a>
      </div>
    </motion.div>
  );
};

export default NewsItem;
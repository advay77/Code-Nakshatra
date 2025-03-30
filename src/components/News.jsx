import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import NewsItem from './NewsItem';
import { motion } from 'framer-motion';


function News  ()  {
  const [results, setResults] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchNews = async () => {
      console.log('Fetching agriculture news...');
      setLoading(true);
      const url = 'https://newsdata.io/api/1/news?apikey=pub_662709b114c686cad4b6fabefe2ed05fc276a&q=Agriculture&country=in&language=en';
      
      try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);

        const agricultureNews = data.results.filter((article: NewsArticle) => 
          article.category && article.category.includes("top")
        );

        setResults(agricultureNews || []);
      } catch (error) {
        console.error('Error fetching news:', error);
      } finally {
        setLoading(false);k
      }
    };

    fetchNews();
  }, []);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100">
      <Navbar />
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="container mx-auto px-4 py-12"
      >
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-center gradient-text mb-12"
        >
          Today's Top Agriculture News
        </motion.h1>
        
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-green-500 border-t-transparent"></div>
          </div>
        ) : results.length === 0 ? (
          <motion.h4 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-xl text-gray-600"
          >
            No news available
          </motion.h4>
        ) : (
          <motion.div 
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {results.map((element, index) => (
              <motion.div 
                key={element.article_id || index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <NewsItem
                  title={element.title ? element.title.slice(0, 45) + "....." : ""}
                  description={element.description ? element.description.slice(0, 88) + "......" : ""}
                  imageUrl={element.image_url || 'https://images.unsplash.com/photo-1495107334309-fcf20504a5ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'}
                  newsUrl={element.link}
                />
              </motion.div>
            ))}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default News;
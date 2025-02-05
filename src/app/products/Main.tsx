"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ShoppingBag, Star, ArrowRight, Package, Hammer, Zap } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { StaticImageData } from 'next/image';
import ProductAdsImage1 from "../../../public/assets/productAds/ProductAdsImg1.png";
import ProductAdsImage2 from "../../../public/assets/productAds/ProductAdsImg2.png";

import AdBannerSection from './AdsBanner';


// Types
interface SlideImage {
  id: number;
  url: string | StaticImageData;
  alt: string;
  title: string;
  subtitle: string;
}

interface Category {
  id: number;
  name: string;
  description: string;
  icon: React.ReactNode;
  stats: {
    rating: number;
    products: number;
  };
}

interface AdBanner {
  id: number;
  imageUrl: string | StaticImageData;
  title: string;
  description: string;
  link: string;
}

// Sample Data
const CATEGORIES: Category[] = [
  {
    id: 1,
    name: 'Premium Machines',
    description: 'High-performance industrial machinery for your business needs',
    icon: <Zap className="w-8 h-8" />,
    stats: { rating: 4.8, products: 150 }
  },
  {
    id: 2,
    name: 'Quality Consumables',
    description: 'Top-grade materials and supplies for consistent performance',
    icon: <Package className="w-8 h-8" />,
    stats: { rating: 4.9, products: 300 }
  },
  {
    id: 3,
    name: 'Support Tools',
    description: 'Essential maintenance and support equipment',
    icon: <Hammer className="w-8 h-8" />,
    stats: { rating: 4.7, products: 200 }
  }
];

// Components
const HeroSlider: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  const navigate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentSlide((prev) => (prev + newDirection + CATEGORIES.length) % CATEGORIES.length);
  };

  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(() => navigate(1), 5000);
    return () => clearInterval(timer);
  }, [isAutoPlaying, currentSlide]);

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentSlide}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 }
          }}
          className="absolute w-full h-full"
        >
          <div className="relative h-full w-full bg-gradient-to-r from-gray-900 to-gray-800">
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent z-10" />
            <div className="absolute inset-0 flex items-center justify-start z-20 px-16">
              <div className="max-w-2xl">
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="flex items-center gap-4 mb-6"
                >
                  {CATEGORIES[currentSlide].icon}
                  <span className="text-lg font-medium text-gray-300">Featured Collection</span>
                </motion.div>
                <motion.h1 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-6xl font-bold mb-4"
                >
                  {CATEGORIES[currentSlide].name}
                </motion.h1>
                <motion.p
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-xl text-gray-300 mb-8"
                >
                  {CATEGORIES[currentSlide].description}
                </motion.p>
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="flex items-center gap-8"
                >
                  <Link href={`/category/${CATEGORIES[currentSlide].id}`}>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-white text-black px-8 py-3 rounded-full font-medium flex items-center gap-2 group"
                    >
                      Explore Collection
                      <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
                    </motion.button>
                  </Link>
                  <div className="flex items-center gap-4 text-gray-300">
                    <div className="flex items-center gap-2">
                      <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                      <span>{CATEGORIES[currentSlide].stats.rating}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <ShoppingBag className="w-5 h-5" />
                      <span>{CATEGORIES[currentSlide].stats.products}+ Products</span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4 z-30">
        <button
          onClick={() => navigate(-1)}
          className="p-2 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        
        <div className="flex gap-2">
          {CATEGORIES.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentSlide ? 'bg-white w-8' : 'bg-white/50'
              }`}
            />
          ))}
        </div>

        <button
          onClick={() => navigate(1)}
          className="p-2 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      <button
        onClick={() => setIsAutoPlaying(!isAutoPlaying)}
        className={`absolute top-8 right-8 px-4 py-2 rounded-full text-sm z-30 transition-all ${
          isAutoPlaying ? 'bg-white text-black' : 'bg-white/10 text-white'
        }`}
      >
        {isAutoPlaying ? 'Pause' : 'Play'}
      </button>
    </div>
  );
};

const CategorySection: React.FC = () => {
  return (
    <div className="py-24 px-8 bg-gradient-to-b from-gray-900 to-black">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">Our Categories</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Explore our wide range of products across different categories
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {CATEGORIES.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl overflow-hidden group"
            >
              <div className="p-8">
                <div className="mb-6 text-blue-500">{category.icon}</div>
                <h3 className="text-2xl font-bold mb-2">{category.name}</h3>
                <p className="text-gray-400 mb-6">{category.description}</p>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                    <span>{category.stats.rating}</span>
                  </div>
                  <span className="text-gray-400">{category.stats.products}+ Products</span>
                </div>
                <Link href={`/products/product-categories/${category.id}`}>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-medium flex items-center justify-center gap-2 group"
                  >
                    Explore Category
                    <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

const TypewriterEffect: React.FC = () => {
  const [text, setText] = useState("");
  const fullText = "Discover Premium Products For Your Business";
  const [isDeleting, setIsDeleting] = useState(false);
  
  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (!isDeleting && text.length < fullText.length) {
      timer = setTimeout(() => {
        setText(fullText.slice(0, text.length + 1));
      }, 100);
    } else if (isDeleting && text.length > 0) {
      timer = setTimeout(() => {
        setText(fullText.slice(0, text.length - 1));
      }, 50);
    } else if (text.length === fullText.length) {
      timer = setTimeout(() => {
        setIsDeleting(true);
      }, 2000);
    } else if (text.length === 0) {
      setIsDeleting(false);
    }

    return () => clearTimeout(timer);
  }, [text, isDeleting]);

  return (
    <div className="py-24 bg-gradient-to-b from-black to-gray-900 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto px-8"
      >
        <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
          {text}
          <span className="animate-pulse">|</span>
        </h2>
      </motion.div>
    </div>
  );
};

const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter signup
    setEmail("");
  };

  return (
    <div className="py-24 bg-gradient-to-b from-gray-900 to-black">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto text-center px-8"
      >
        <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
        <p className="text-gray-400 mb-8">Subscribe to our newsletter for the latest products and offers</p>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 justify-center">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="px-6 py-3 rounded-full bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-blue-500"
            required
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="px-8 py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-medium"
          >
            Subscribe
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

const FloatingCallToAction: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1 }}
      className="fixed bottom-8 right-8 z-50"
    >
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="bg-blue-600 text-white p-4 rounded-full shadow-lg flex items-center gap-2"
      >
        <ShoppingBag className="w-6 h-6" />
        <span className="hidden md:inline">Shop Now</span>
      </motion.button>
    </motion.div>
  );
};

const Home: React.FC = () => {
  useEffect(() => {
    // Smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <main className="min-h-screen bg-black text-white">
      <HeroSlider />
      <CategorySection />
      <AdBannerSection />
      <TypewriterEffect />
      <NewsletterSection />
      <FloatingCallToAction />
    </main>
  );
};

export default Home;
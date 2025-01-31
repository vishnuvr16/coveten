"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { StaticImageData } from 'next/image';
import Image from 'next/image';
import ProductAdsImage1 from "../../../public/assets/productAds/ProductAdsImg1.png";
import ProductAdsImage2 from "../../../public/assets/productAds/ProductAdsImg2.png";
import productCategoryAds1 from "@/public/assets/ProductCategoryAdsImg1.png";
import productCategoryAds2 from "@/public/assets/ProductCategoryAdsImg2.png";
import productCategoryAds3 from "@/public/assets/ProductCategoryAdsImg3.png";


// TypeScript types
type SlideImage = {
  id: number;
  url: string  | StaticImageData;
  alt: string;
};

type Category = {
  id: number;
  name: string;
  description: string;
  icon: string;
};

type AdBanner = {
  id: number;
  imageUrl: string | StaticImageData;
  title: string;
  description: string;
};

// Sample data
const SLIDE_IMAGES: SlideImage[] = [
  { id: 1, url: productCategoryAds1, alt: 'Premium Machines' },
  { id: 2, url: productCategoryAds2, alt: 'Quality Consumables' },
  { id: 3, url: productCategoryAds3, alt: 'Support Tools' },
];

const CATEGORIES: Category[] = [
  {
    id: 1,
    name: 'Machines',
    description: 'High-performance industrial machinery',
    icon: '🔧'
  },
  {
    id: 2,
    name: 'Consumables',
    description: 'Quality materials for your needs',
    icon: '📦'
  },
  {
    id: 3,
    name: 'Support Tools',
    description: 'Essential tools for maintenance',
    icon: '🛠️'
  }
];

const AD_BANNERS: AdBanner[] = [
  {
    id: 1,
    imageUrl: ProductAdsImage1,
    title: 'New Arrivals',
    description: 'Discover our latest collection'
  },
  {
    id: 2,
    imageUrl: ProductAdsImage2,
    title: 'Special Offers',
    description: 'Limited time deals'
  }
];

const ImageSlider: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % SLIDE_IMAGES.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + SLIDE_IMAGES.length) % SLIDE_IMAGES.length);

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <motion.div
        key={currentSlide}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full h-full relative"
        style={{
          backgroundImage: `url(${SLIDE_IMAGES[currentSlide].url})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 bg-black/30" />
      </motion.div>

      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 p-3 rounded-full backdrop-blur-sm hover:bg-white/20 transition-all"
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 p-3 rounded-full backdrop-blur-sm hover:bg-white/20 transition-all"
      >
        <ChevronRight className="w-6 h-6 text-white" />
      </button>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
        {SLIDE_IMAGES.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentSlide ? 'bg-white w-8' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

const CategorySection: React.FC = () => (

  <div className="py-20 px-4 bg-gray-900">
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
      {CATEGORIES.map((category) => (
        <motion.div
          key={category.id}
          whileHover={{ y: -10 }}
          className="bg-gradient-to-br from-purple-600 to-blue-600 p-8 rounded-2xl text-white cursor-pointer group"
        >
          <div className="text-6xl mb-4">{category.icon}</div>
          <h3 className="text-2xl font-bold mb-2">{category.name}</h3>
          <p className="text-white/80 mb-6">{category.description}</p>
          <Link href={`/products/product-categories/${category.id}`} passHref>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-black px-6 py-2 rounded-full font-medium block text-center group-hover:bg-opacity-90"
            >
              Explore
            </motion.a>
          </Link>
        </motion.div>
      ))}
    </div>
  </div>
);

const AdBannerSlider: React.FC = () => {
  const [currentAd, setCurrentAd] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentAd((prev) => (prev + 1) % AD_BANNERS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-[400px] overflow-hidden">
      <motion.div
        key={currentAd}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full h-full relative"
      >
        <Image
          src={AD_BANNERS[currentAd].imageUrl}
          alt={AD_BANNERS[currentAd].title}
          fill
          style={{ objectFit: 'cover' }}
          priority={currentAd === 0}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent">
          <div className="absolute bottom-8 left-8">
            <motion.h3
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-3xl font-bold text-white mb-2"
            >
              {AD_BANNERS[currentAd].title}
            </motion.h3>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-white/80"
            >
              {AD_BANNERS[currentAd].description}
            </motion.p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
const TypewriterEffect: React.FC = () => {
  const text = "Get ready! Unique products are arriving soon.";
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const period = 2000; // Pause at end of typing/deleting
  const typingSpeed = 100;
  const deletingSpeed = 50;

  useEffect(() => {
    let timer: NodeJS.Timeout;

    const tick = () => {
      const fullText = text;

      if (!isDeleting) {
        setDisplayText(fullText.substring(0, displayText.length + 1));

        if (displayText.length === fullText.length) {
          timer = setTimeout(() => {
            setIsDeleting(true);
          }, period);
          return;
        }

        timer = setTimeout(tick, typingSpeed);
      } else {
        setDisplayText(fullText.substring(0, displayText.length - 1));

        if (displayText.length === 0) {
          setIsDeleting(false);
          setLoopNum(loopNum + 1);
          timer = setTimeout(tick, period);
          return;
        }

        timer = setTimeout(tick, deletingSpeed);
      }
    };

    timer = setTimeout(tick, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, loopNum, text]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-black py-20">
      <motion.h2
        className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent"
      >
        {displayText}
        <span className="animate-blink">|</span>
      </motion.h2>
    </div>
  );
};

const Home: React.FC = () => {
  return (
    <main className="min-h-screen bg-black">
      <ImageSlider />
      <CategorySection />
      <AdBannerSlider />
      <TypewriterEffect />
    </main>
  );
};

export default Home;
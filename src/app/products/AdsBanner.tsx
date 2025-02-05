"use client"
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';
import productCategoryAds1 from "@/public/assets/ProductCategoryAdsImg1.png";
import productCategoryAds2 from "@/public/assets/ProductCategoryAdsImg2.png";
import productCategoryAds3 from "@/public/assets/ProductCategoryAdsImg3.png";

interface AdBanner {
  id: number;
  imageUrl: string | StaticImageData;
  title: string;
  description: string;
  link: string;
}

const AD_BANNERS: AdBanner[] = [
  {
    id: 1,
    imageUrl: productCategoryAds1, 
    title: 'Summer Collection 2025',
    description: 'Discover our latest arrivals perfect for the season. Premium quality industrial equipment at competitive prices.',
    link: '/summer-collection'
  },
  {
    id: 2,
    imageUrl: productCategoryAds2,
    title: 'Special Offers',
    description: 'Limited time deals on premium products. Save up to 40% on selected industrial machinery.',
    link: '/special-offers'
  },
  {
    id: 3,
    imageUrl: productCategoryAds3,
    title: 'New Arrivals',
    description: 'Check out our latest industrial tools and equipment. Enhanced performance for your business needs.',
    link: '/new-arrivals'
  }
];

const AdBannerSection: React.FC = () => {
  const [currentAd, setCurrentAd] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentAd((prev) => (prev + 1) % AD_BANNERS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-[600px] overflow-hidden bg-gray-900">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentAd}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          <div className="relative h-full">
            <Image
              src={AD_BANNERS[currentAd].imageUrl}
              alt={AD_BANNERS[currentAd].title}
              fill
              style={{ objectFit: 'cover' }}
              priority={currentAd === 0}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent z-10" />
            <div className="absolute inset-0 flex items-center z-20 px-16">
              <div className="max-w-2xl">
                <motion.span
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="inline-block px-4 py-2 bg-blue-600 text-white text-sm rounded-full mb-4"
                >
                  Featured
                </motion.span>
                <motion.h3
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-5xl font-bold mb-4"
                >
                  {AD_BANNERS[currentAd].title}
                </motion.h3>
                <motion.p
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-xl text-gray-300 mb-8"
                >
                  {AD_BANNERS[currentAd].description}
                </motion.p>
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <Link href={AD_BANNERS[currentAd].link}>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-white text-black px-8 py-3 rounded-full font-medium flex items-center gap-2 group"
                    >
                      Shop Now
                      <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
                    </motion.button>
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-30">
        {AD_BANNERS.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentAd(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentAd ? 'bg-white w-8' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default AdBannerSection;
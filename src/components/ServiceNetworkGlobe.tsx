'use client';
import React, { useEffect, useRef } from 'react';
import TagCloud from 'TagCloud';
import { motion } from 'framer-motion';
import styles from './ServiceNetworkGlobe.module.css';

const ServiceNetworkGlobe: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (containerRef.current) {
      const texts = [
        "25 SEM / EDS systems",
        "45 Tensile Testers",
        "4 Acoustic Chambers",
        "18 EMI Testing Systems",
        "4 microCT systems",
        "125 Environment Chambers",
        "14 EMC Systems",
        "30+ 3D Scanning Solutions",
        "120 Designers",
        "20+ Prototyping Methods",
        "14+ 3D Printing Technologies",
        "40+ Countries",
        "12+ Countries",
        "250+ Warehouses",
      ];

      const options = {
        radius: 250,
        maxSpeed: 'fast' as 'fast' | 'normal' | 'slow',
        initSpeed: 'normal' as 'fast' | 'normal' | 'slow',
        direction: 225,
        keep: true,
        containerClass: 'tag-cloud',
        itemClass: 'tag',
      };      
      // const options = {
      //   containerClass: 'tag-cloud',
      //   itemClass: 'tag',
      //   radius: 350,
      //   direction: 225,
      //   initSpeed: 'fast',
      //   maxSpeed: 'normal',
      // };

      // Pass the element wrapped in an array
      TagCloud([containerRef.current], texts, options);
    }
  }, []);

  return (
    <div className="w-full flex flex-col items-center justify-center p-20 text-white  bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
        <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600"
        >
            Our Service Network
        </motion.h2>
      <div ref={containerRef} className={styles.tagcloudContainer} />
    </div>
  );
};

export default ServiceNetworkGlobe;

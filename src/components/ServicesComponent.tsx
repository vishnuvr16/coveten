'use client';
import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Check, Layers } from 'lucide-react';

interface ServiceCategory {
  title: string;
  services: string[];
}

interface ServicesComponentProps {
  data: {
    heading: string;
    description: string;
    hasServicecategory?: ServiceCategory[];
  };
}

const ServicesComponent: React.FC<ServicesComponentProps> = ({ data }) => {
  const [openSection, setOpenSection] = useState<number | null>(null); // Store index instead of title
  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleToggle = (index: number) => {
    setOpenSection((prevIndex) => (prevIndex === index ? null : index));
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
      setOpenSection(null);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div
      className="bg-gradient-to-br from-[#0F172A] to-[#1E293B] py-16 px-4 overflow-hidden"
      ref={containerRef}
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-5xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">
            {data?.heading}
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg leading-relaxed">
            {data?.description}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {data?.hasServicecategory?.map((category, index) => (
            <motion.div
              key={index} // Use index as the key
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.2 }}
              className="bg-slate-800/60 rounded-3xl overflow-hidden backdrop-blur-sm border border-slate-700/50 shadow-2xl hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-300"
            >
              {/* Section Header */}
              <div
                onClick={() => handleToggle(index)} // Use index for toggling
                className="flex justify-between items-center p-4 cursor-pointer hover:bg-slate-700/50 transition-colors group"
              >
                <div className="flex items-center space-x-4">
                  <div className="bg-blue-500/20 p-3 rounded-xl">
                    <Layers className="w-6 h-6 text-blue-400 group-hover:rotate-6 transition-transform" />
                  </div>
                  <h3 className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors">
                    {category.title}
                  </h3>
                </div>
                <ChevronDown
                  className={`w-7 h-7 text-gray-400 transition-all ${
                    openSection === index
                      ? 'rotate-180 text-blue-400'
                      : 'group-hover:text-blue-300'
                  }`}
                />
              </div>

              {/* Section Content */}
              <AnimatePresence>
                {openSection === index && (
                  <motion.div
                    key="content"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-6 pb-6"
                  >
                    <div className="grid md:grid-cols-1 gap-4 w-full">
                      {category.services.map((service, serviceIndex) => (
                        <div
                          key={serviceIndex}
                          className="flex items-center text-sm text-gray-300 hover:text-white transition-colors"
                        >
                          <Check className="w-5 h-5 mr-3 text-blue-500 flex-shrink-0" />
                          <span className="truncate">{service}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicesComponent;

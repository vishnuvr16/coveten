'use client'
import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Enhanced responsive configuration
const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    slidesToSlide: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 640 },
    items: 2,
    slidesToSlide: 1,
  },
  mobile: {
    breakpoint: { max: 640, min: 0 },
    items: 1,
    slidesToSlide: 1,
  },
};

// Custom Arrow Component with Framer Motion hover effect
const CustomArrow = ({ 
  direction, 
  onClick 
}: { 
  direction: 'left' | 'right', 
  onClick?: () => void 
}) => (
  <motion.button
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
    className={`
      absolute 
      top-1/2 
      -translate-y-1/2 
      ${direction === 'left' ? 'left-4' : 'right-4'}
      z-10 
      bg-white/20 
      hover:bg-white/40 
      rounded-full 
      p-2 
      transition-all 
      duration-300 
      text-white
    `}
    onClick={onClick}
  >
    {direction === 'left' ? <ChevronLeft /> : <ChevronRight />}
  </motion.button>
);

// Card Slider Component
const CardSlider: React.FC<{ 
  data: Array<{ 
    heading: string; 
    subcontent: string[]; 
    icon?: React.ReactNode 
  }> 
}> = ({ data }) => {
  // Validate data
  if (!Array.isArray(data) || data.length === 0) {
    return (
      <div className="text-center text-gray-500 p-10">
        No data available
      </div>
    );
  }

  return (
    <div className="relative w-full max-w-6xl mx-auto px-4 py-8">
      <Carousel
        responsive={responsive}
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={3000}
        keyBoardControl={true}
        transitionDuration={500}
        removeArrowOnDeviceType={["tablet", "mobile"]}
        customLeftArrow={<CustomArrow direction="left" />}
        customRightArrow={<CustomArrow direction="right" />}
        className="z-0"
      >
        {data.map((content, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ 
              duration: 0.5, 
              ease: "easeInOut" 
            }}
            className="
              mx-3 
              bg-gradient-to-br 
              from-gray-800 
              to-gray-900 
              rounded-2xl 
              shadow-2xl 
              overflow-hidden 
              transform 
              transition-all 
              duration-300 
              hover:scale-105
            "
          >
            {/* Header Section */}
            <div className="
              flex 
              items-center 
              bg-gradient-to-r 
              from-blue-600 
              to-purple-700 
              p-6 
              text-white
            ">
              {content.icon && (
                <div className="mr-4 text-2xl">
                  {content.icon}
                </div>
              )}
              <h3 className="
                text-2xl 
                font-bold 
                tracking-tight 
                flex-grow
              ">
                {content.heading}
              </h3>
            </div>

            {/* Content Section */}
            <div className="p-6">
              <ul className="space-y-3">
                {content.subcontent.map((item, subIndex) => (
                  <motion.li 
                    key={subIndex}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ 
                      delay: subIndex * 0.1, 
                      duration: 0.5 
                    }}
                    className="
                      text-gray-300 
                      flex 
                      items-center 
                      before:content-['•'] 
                      before:text-blue-500 
                      before:mr-3 
                      before:text-xl
                    "
                  >
                    {item}
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </Carousel>
    </div>
  );
};

export default CardSlider;
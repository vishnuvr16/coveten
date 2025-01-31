"use client"
import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useInView } from 'react-intersection-observer';
import WorldImg from "../../../public/assets/images/World.png";

// Types
interface Certification {
  id: string;
  title: string;
  description: string;
  icon: string;
}

interface Award {
  id: number;
  src: any;
  alt: string;
  description: string;
}

interface NewsItem {
  id: string;
  title: string;
  content: string;
  date: string;
  category: string;
}

// Enhanced Certifications Component
const CertificationCard: React.FC<{ certification: Certification; index: number }> = ({ certification, index }) => {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300"
    >
      <div className="flex items-center gap-4">
        <div className="text-4xl text-lightseagreen">{certification.icon}</div>
        <div>
          <h3 className="text-xl font-bold text-gray-800">{certification.title}</h3>
          <p className="text-gray-600 mt-2">{certification.description}</p>
        </div>
      </div>
    </motion.div>
  );
};

const Certifications: React.FC = () => {
  const certifications: Certification[] = [
    { id: '1', title: 'ISO 9001', description: 'Quality Management System', icon: '🏆' },
    { id: '2', title: 'ISO 14001', description: 'Environmental Management', icon: '🌍' },
    { id: '3', title: 'ISO 25001', description: 'Software Quality Requirements', icon: '💻' },
    { id: '4', title: 'NSC', description: 'National Safety Council', icon: '🛡️' },
    { id: '5', title: 'DBIIT', description: 'Department of Biotechnology', icon: '🧬' },
    { id: '6', title: 'MSME', description: 'Micro, Small & Medium Enterprises', icon: '🏭' }
  ];

  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="container mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-center text-lightseagreen mb-16"
        >
          Our Certifications
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certifications.map((cert, index) => (
            <CertificationCard key={cert.id} certification={cert} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

// Enhanced Awards Component
const AwardCard: React.FC<{ award: Award }> = ({ award }) => {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-xl p-4 shadow-lg hover:shadow-2xl transition-all duration-300"
    >
      <div className="relative w-full h-40 mb-4">
        <Image
          src={award.src}
          alt={award.alt}
          layout="fill"
          objectFit="contain"
          className="transition-all duration-300"
        />
      </div>
      <p className="text-gray-600 text-center">{award.description}</p>
    </motion.div>
  );
};

const Awards: React.FC = () => {
  const awards: Award[] = [
    { id: 1, src: '/assets/images/Award1.png', alt: 'Excellence Award', description: 'Excellence in Innovation' },
    { id: 2, src: '/assets/images/Award2.png', alt: 'Leadership Award', description: 'Industry Leadership' },
    { id: 3, src: '/assets/images/Award3.png', alt: 'Quality Award', description: 'Quality Excellence' },
    { id: 4, src: '/assets/images/Award4.png', alt: 'Achievement Award', description: 'Outstanding Achievement' },
    { id: 5, src: '/assets/images/Award5.png', alt: 'Recognition Award', description: 'Industry Recognition' }
  ];

  return (
    <section className="py-20 px-4 ">
      <div className="container mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-center text-white mb-16"
        >
          Awards & Recognition
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {awards.map((award) => (
            <AwardCard key={award.id} award={award} />
          ))}
        </div>
      </div>
    </section>
  );
};

// Enhanced News Component
const NewsCard: React.FC<{ news: NewsItem; index: number }> = ({ news, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
    >
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm text-lightseagreen">{news.category}</span>
          <span className="text-sm text-gray-500">{news.date}</span>
        </div>
        <h3 className="text-xl font-bold text-gray-800 mb-3">{news.title}</h3>
        <motion.p 
          className="text-gray-600"
          animate={{ height: isHovered ? 'auto' : '3rem' }}
          transition={{ duration: 0.3 }}
        >
          {news.content}
        </motion.p>
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          className="mt-4 text-lightseagreen hover:text-lightseagreen/80"
        >
          Read More →
        </motion.button>
      </div>
    </motion.div>
  );
};

const NewsComponent: React.FC = () => {
  const newsItems: NewsItem[] = [
    {
      id: '1',
      title: "We're at ISNT",
      content: 'The Annual Conference of Indian Society for Non-Destructive Testing (ISNT), the Official Technical Society for NDT/NDE in India, NDE 2023...',
      date: 'Dec 7, 2023',
      category: 'Event'
    },
    {
      id: '2',
      title: 'Shaping up with Semiconductors',
      content: 'Latest developments in semiconductor technology and their impact on industry standards...',
      date: 'Dec 5, 2023',
      category: 'Technology'
    },
    {
      id: '3',
      title: 'Food Safety Innovation',
      content: 'New advancements in food safety testing and quality control measures...',
      date: 'Dec 3, 2023',
      category: 'Innovation'
    }
  ];

  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="container mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-center text-lightseagreen mb-16"
        >
          Latest News
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsItems.map((news, index) => (
            <NewsCard key={news.id} news={news} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

interface Solution {
  id: string;
  name: string;
  icon?: string;
  description: string;
}

// Main Component
const Main: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('');
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  
  const solutions: Solution[] = [
    { id: '1', name: 'RPA', description: 'Robotic Process Automation', icon: '🤖' },
    { id: '2', name: 'Asset Management', description: 'Complete Asset Lifecycle', icon: '📊' },
    { id: '3', name: 'SCM', description: 'Supply Chain Management', icon: '🔄' },
    { id: '4', name: 'Automation', description: 'Industrial Automation', icon: '⚙️' },
    { id: '5', name: 'FA', description: 'Factory Automation', icon: '🏭' },
    { id: '6', name: 'ERP', description: 'Enterprise Resource Planning', icon: '💼' }
  ];

  const mechanicalSolutions: Solution[] = [
    { id: '1', name: 'Vacuum Forming', description: 'Advanced vacuum forming solutions' },
    { id: '2', name: '3D Printing', description: 'State-of-the-art 3D printing services' },
    // ... other solutions
  ];

  const SolutionCard: React.FC<{ solution: Solution }> = ({ solution }) => {
    const [ref, inView] = useInView({
      threshold: 0.2,
      triggerOnce: true
    });

    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
      >
        <div className="text-4xl mb-4">{solution.icon}</div>
        <h3 className="text-xl font-bold text-lightseagreen mb-2">{solution.name}</h3>
        <p className="text-gray-600">{solution.description}</p>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen mt-10">
      {/* Your existing hero section code here */}
      <motion.section 
        style={{ opacity }}
        className="relative h-screen flex items-center justify-center overflow-hidden"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1 }}
          className="container mx-auto px-4 flex flex-col md:flex-row items-center"
        >
          <div className="md:w-1/2 mb-8 md:mb-0">
            <motion.div
              // animate={{ rotate: 360 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              className="relative w-full max-w-lg mx-auto"
            >
              <Image
                src={WorldImg}
                alt="World"
                width={800}
                height={800}
                className="rounded-full shadow-2xl"
                priority
              />
            </motion.div>
          </div>
          
          <div className="md:w-1/2 md:pl-12">
            <motion.h1
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-6xl font-bold text-lightseagreen mb-6"
            >
              The Coveten's Network
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg text-gray-700 leading-relaxed"
            >
              Connecting hundreds of qualified testing methods, labs, and manufacturers
              across the country through our advanced network.
            </motion.p>
          </div>
        </motion.div>
      </motion.section>

      {/* Solutions Grid */}
      <section className="py-20 px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-lightseagreen mb-16">
          Our IOT 4.0 Solutions
        </h2>
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {solutions.map(solution => (
            <SolutionCard key={solution.id} solution={solution} />
          ))}
        </div>
      </section>

      {/* Manufacturing Solutions */}
      <section className="bg-lightseagreen text-white py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            Manufacturing Solutions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {mechanicalSolutions.map(solution => (
              <motion.div
                key={solution.id}
                whileHover={{ scale: 1.05 }}
                className="bg-white/10 backdrop-blur-lg rounded-lg p-6"
              >
                <h3 className="text-xl font-bold mb-4">{solution.name}</h3>
                <p className="text-white/80">{solution.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* Enhanced Components */}
      <Certifications />
      <Awards />
      <NewsComponent />
    </div>
  );
};

export default Main;
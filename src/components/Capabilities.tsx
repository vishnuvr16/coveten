'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings2, Wrench, Factory, Cpu, FlaskConical, Printer, ArrowRight, Check, X, LucideIcon } from 'lucide-react';

// TypeScript interfaces
interface Feature {
  id: string;
  text: string;
  description?: string;
}

interface Capability {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  gradient: string;
  features: Feature[];
  ctaText?: string;
}

interface CapabilitiesData {
  title: string;
  subtitle: string;
  capabilities: Capability[];
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  capability: Capability | null;
}

interface AnimationVariants {
  hidden: {
    opacity: number;
    y?: number;
    scale?: number;
  };
  visible: {
    opacity: number;
    y?: number;
    scale?: number;
    transition?: {
      duration?: number;
      staggerChildren?: number;
    };
  };
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, capability }) => {
  if (!isOpen || !capability) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative bg-gray-800/50 backdrop-blur-lg rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-700/50"
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-1 rounded-full hover:bg-gray-700/50 transition-colors"
        >
          <X className="w-5 h-5 text-gray-400" />
        </button>

        <div className="flex items-center mb-6">
          <div 
            className="p-3 rounded-xl mr-4"
            style={{ backgroundColor: `${capability.color}15` }}
          >
            {React.cloneElement(capability.icon as React.ReactElement, { 
              color: capability.color,
              className: 'w-8 h-8' 
            })}
          </div>
          <h3 className="text-2xl font-bold text-white">{capability.title}</h3>
        </div>

        <p className="text-gray-400 mb-8">{capability.description}</p>

        <div className="space-y-6">
          <h4 className="text-lg font-semibold text-white">Key Features</h4>
          {capability.features.map((feature) => (
            <div key={feature.id} className="flex items-start">
              <div 
                className="w-1.5 h-1.5 rounded-full mr-3 mt-2"
                style={{ backgroundColor: capability.color }}
              />
              <div>
                <div className="text-white font-medium">{feature.text}</div>
                {feature.description && (
                  <div className="text-sm text-gray-400 mt-1">
                    {feature.description}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {capability.ctaText && (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`mt-8 px-6 py-3 rounded-xl flex items-center justify-center w-full font-medium
              bg-gradient-to-r ${capability.gradient} text-white opacity-90 hover:opacity-100`}
          >
            {capability.ctaText}
            <ArrowRight className="ml-2 w-5 h-5" />
          </motion.button>
        )}
      </motion.div>
    </div>
  );
};

const Capabilities: React.FC = () => {
  const [selectedCapability, setSelectedCapability] = useState<Capability | null>(null);
  const [hoveredFeature, setHoveredFeature] = useState<string | null>(null);

  const containerVariants: AnimationVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants: AnimationVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  const capabilitiesData: CapabilitiesData = {
    title: "Our Core Capabilities",
    subtitle: "Innovative Solutions Driving Technological Excellence",
    capabilities: [
      {
        id: 'testing',
        title: 'Industrial Testing',
        description: 'Advanced quality assurance across diverse manufacturing domains with real-time monitoring and automated reporting systems.',
        icon: <Settings2 />,
        color: '#4361EE',
        gradient: 'from-blue-500 to-blue-700',
        features: [
          { id: 't1', text: 'Multi-industry testing protocols', description: 'Standardized testing procedures across various industrial sectors' },
          { id: 't2', text: 'Precision measurement techniques', description: 'High-accuracy testing using state-of-the-art equipment' },
          { id: 't3', text: 'Comprehensive quality metrics', description: 'Detailed quality assessment frameworks and reporting' }
        ],
        ctaText: 'Learn More'
      },
      {
        id: 'procurement',
        title: 'Procurement Solutions',
        description: 'Streamlined supply chain management and logistics optimization powered by AI-driven insights and real-time tracking.',
        icon: <Wrench />,
        color: '#00AB55',
        gradient: 'from-green-500 to-green-700',
        features: [
          { id: 'p1', text: 'Strategic material sourcing', description: 'AI-powered vendor selection and material procurement' },
          { id: 'p2', text: 'Vendor network management', description: 'Comprehensive vendor relationship and performance tracking' },
          { id: 'p3', text: 'Cost-efficient procurement', description: 'Automated price optimization and negotiation tools' }
        ],
        ctaText: 'Explore Solutions'
      },
      {
        id: 'software',
        title: 'Software Solutions',
        description: 'Cutting-edge technological innovations and custom software development with cloud-native architecture.',
        icon: <Cpu />,
        color: '#FF4842',
        gradient: 'from-red-500 to-red-700',
        features: [
          { id: 's1', text: 'IoT integration', description: 'Seamless connection of devices and data streams' },
          { id: 's2', text: 'Custom software architecture', description: 'Tailored solutions for specific business needs' },
          { id: 's3', text: 'Scalable tech solutions', description: 'Cloud-native applications that grow with your business' }
        ],
        ctaText: 'View Services'
      }
    ]
  };

  return (
    <>
      <div className=" bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white py-16 px-4 w-full">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
              {capabilitiesData.title}
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              {capabilitiesData.subtitle}
            </p>
          </motion.div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid md:grid-cols-3 gap-8"
          >
            {capabilitiesData.capabilities.map((capability) => (
              <motion.div
                key={capability.id}
                variants={itemVariants}
                // whileHover={{ scale: 1.02 }}
                className="group bg-gray-800/50 backdrop-blur-lg rounded-2xl overflow-hidden shadow-2xl border border-gray-700/50 transition-all cursor-pointer"
                onClick={() => setSelectedCapability(capability)}
              >
                <div className={`h-1.5 w-full bg-gradient-to-r ${capability.gradient}`} />
                <div className="p-8">
                  <div className="flex items-center mb-6">
                    <div 
                      className="p-4 rounded-2xl mr-4 backdrop-blur-xl transition-colors group-hover:bg-opacity-30"
                      style={{ backgroundColor: `${capability.color}15` }}
                    >
                      {React.cloneElement(capability.icon as React.ReactElement, { 
                        color: capability.color,
                        className: 'w-8 h-8' 
                      })}
                    </div>
                    <h3 className="text-2xl font-bold">{capability.title}</h3>
                  </div>
                  
                  <p className="text-gray-400 mb-6 line-clamp-2">{capability.description}</p>
                  
                  <div className="space-y-3">
                    {capability.features.map((feature) => (
                      <motion.div
                        key={feature.id}
                        className="flex items-center text-sm text-gray-300 group/feature relative"
                        onHoverStart={() => setHoveredFeature(feature.id)}
                        onHoverEnd={() => setHoveredFeature(null)}
                      >
                        <div 
                          className="w-1.5 h-1.5 rounded-full mr-3"
                          style={{ backgroundColor: capability.color }}
                        />
                        <span>{feature.text}</span>
                        {hoveredFeature === feature.id && feature.description && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="absolute left-0 bottom-full mb-2 p-3 rounded-lg bg-gray-700 text-xs w-48 z-10 shadow-xl"
                          >
                            {feature.description}
                            <div className="absolute -bottom-1 left-4 w-2 h-2 bg-gray-700 rotate-45" />
                          </motion.div>
                        )}
                      </motion.div>
                    ))}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.0 }}
                    whileTap={{ scale: 0.95 }}
                    className={`mt-6 px-4 py-2 rounded-lg flex items-center text-sm font-medium
                      bg-gradient-to-r ${capability.gradient} text-white opacity-90 hover:opacity-100`}
                  >
                    {capability.ctaText}
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        <Modal
          isOpen={!!selectedCapability}
          onClose={() => setSelectedCapability(null)}
          capability={selectedCapability}
        />
      </AnimatePresence>
    </>
  );
};

export default Capabilities;
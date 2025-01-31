'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';

interface Capability {
  id: string;
  title: string;
  description: string;
  features: string[];
  icon: React.ReactNode;
  color: string;
  gradient: string;
}

interface CapabilitiesProps {
  data?: {
    title: string;
    subtitle: string;
    capabilities: Capability[];
  };
}

const Capabilities: React.FC<CapabilitiesProps> = ({ 
  data = {
    title: 'Our Core Capabilities', 
    subtitle: 'Innovative Solutions Driving Technological Excellence',
    capabilities: []
  } 
}) => {
  const [selectedCapability, setSelectedCapability] = useState<Capability | null>(null);

  const defaultCapabilities: Capability[] = [
    {
      id: 'testing',
      title: 'Industrial Testing',
      description: 'Advanced quality assurance across diverse manufacturing domains',
      features: [
        'Multi-industry testing protocols',
        'Precision measurement techniques',
        'Comprehensive quality metrics'
      ],
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22v-7l-2-2V7.5a2.5 2.5 0 0 1 5 0V13l-2 2v7"/></svg>,
      color: '#4361EE',
      gradient: 'from-blue-500 to-blue-700'
    },
    {
      id: 'procurement',
      title: 'Procurement Solutions',
      description: 'Streamlined supply chain management and logistics optimization',
      features: [
        'Strategic material sourcing',
        'Vendor network management',
        'Cost-efficient procurement'
      ],
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/></svg>,
      color: '#00AB55',
      gradient: 'from-green-500 to-green-700'
    },
    {
      id: 'software',
      title: 'Software Solutions',
      description: 'Cutting-edge technological innovations and custom software development',
      features: [
        'IoT integration',
        'Custom software architecture',
        'Scalable tech solutions'
      ],
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="3" rx="2" ry="2"/></svg>,
      color: '#FFC107',
      gradient: 'from-yellow-500 to-yellow-700'
    }
  ];

  const capabilities = data.capabilities.length > 0 ? data.capabilities : defaultCapabilities;

  return (
    <div className=" text-white py-16 px-4 w-full">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600"
          >
            {data.title}
          </motion.h2>
          <p className="text-gray-400 max-w-2xl mx-auto">{data.subtitle}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {capabilities.map((capability) => (
            <motion.div
              key={capability.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="bg-gray-800 rounded-2xl overflow-hidden shadow-2xl border border-gray-700 transform transition-all"
              onClick={() => setSelectedCapability(capability)}
            >
              <div 
                className={`h-1 w-full bg-gradient-to-r ${capability.gradient}`}
              />
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div 
                    className="p-3 rounded-xl mr-4"
                    style={{ backgroundColor: `${capability.color}20` }}
                  >
                    {React.cloneElement(capability.icon as React.ReactElement, { 
                      color: capability.color,
                      className: 'w-8 h-8' 
                    })}
                  </div>
                  <h3 className="text-xl font-bold">{capability.title}</h3>
                </div>
                <p className="text-gray-400 mb-4">{capability.description}</p>
                <div className="space-y-2">
                  {capability.features.map((feature, index) => (
                    <div key={index} className="flex items-center text-sm text-gray-300">
                      <Check className="w-4 h-4 mr-2 text-green-500" />
                      {feature}
                    </div>
                  ))}
                </div>
                <button 
                  className="mt-6 w-full flex items-center justify-center py-2 rounded-lg text-white font-semibold bg-blue-600 hover:bg-blue-700 transition-colors"
                >
                  Learn More <ArrowRight className="ml-2 w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Capabilities;
'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

interface ProcurementStep {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  gradient: string;
}

const Procurement: React.FC = () => {
  const procurementSteps: ProcurementStep[] = [
    {
      id: 'rawmaterials',
      title: 'Raw Materials',
      description: "Find Raw materials from Certified Vendors.\nHundreds of different materials available.\nBuy tested and certified raw materials.",
      icon: '/assets/raw-materials.png',
      color: '#4361EE',
      gradient: 'from-blue-500 to-blue-700'
    },
    {
      id: 'design',
      title: 'Product Design',
      description: "Dedicated product designers.\nIndustry-specific designs and designers.\nTruly inspiring and futuristic designs.",
      icon: '/assets/component.png',
      color: '#00AB55',
      gradient: 'from-green-500 to-green-700'
    },
    {
      id: 'prototyping',
      title: 'Prototyping',
      description: "Faster and choices of prototyping methods.\nHighly precise and tailored models.\nNext-gen materials and methods.",
      icon: '/assets/prototype.png',
      color: '#FFC107',
      gradient: 'from-yellow-500 to-yellow-700'
    },
    {
      id: 'manufacturing',
      title: 'Manufacturing',
      description: "Find most suitable and affordable manufacturing methods.\nWell-trained and ready-made manpower.\nCertified and accessible workplaces.",
      icon: '/assets/manufacturing.png',
      color: '#FF4842',
      gradient: 'from-red-500 to-red-700'
    },
    {
      id: 'packaging',
      title: 'Packaging',
      description: "Well designed and perfect packing.\nDedicated package testing availability.\nEco-friendly and reusable packing materials.",
      icon: '/assets/package.png',
      color: '#1890FF',
      gradient: 'from-cyan-500 to-cyan-700'
    },
    {
      id: 'logistics',
      title: 'Logistics',
      description: "Managed logistics worldwide.\nIntegrated SCM\nComprehensive support for imports and exports.",
      icon: '/assets/tracking.png',
      color: '#7635DC',
      gradient: 'from-purple-500 to-purple-700'
    }
  ];

  const [selectedStep, setSelectedStep] = useState<ProcurementStep>(procurementSteps[0]);

  return (
    <div className=" bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white py-16 px-4 w-full overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
            Our Portfolio
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-gray-800 rounded-2xl p-8 shadow-2xl"
          >
            <h3 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
              {selectedStep.title}
            </h3>
            {selectedStep.description.split('\n').map((line, index) => (
              <div key={index} className="flex items-center text-gray-300 mb-2">
                <Check className="w-5 h-5 mr-3 text-green-500" />
                <span>{line}</span>
              </div>
            ))}
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-3 gap-6"
          >
            {procurementSteps.map((step) => (
              <motion.div
                key={step.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedStep(step)}
                className={`
                  rounded-2xl p-4 flex flex-col items-center justify-center 
                  cursor-pointer transition-all
                  ${selectedStep.id === step.id 
                    ? `bg-gradient-to-r ${step.gradient} text-white` 
                    : 'bg-gray-800 hover:bg-gray-700'}
                `}
              >
                <div 
                  className="p-3 rounded-xl mb-3"
                  style={{ backgroundColor: `${step.color}20` }}
                >
                  <Image 
                    src={step.icon} 
                    alt={step.title} 
                    width={50} 
                    height={50} 
                    className={`
                      ${selectedStep.id === step.id 
                        ? 'filter brightness-0 invert' 
                        : 'opacity-70'}
                    `}
                  />
                </div>
                <h4 className="text-sm font-semibold text-center">{step.title}</h4>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Procurement;
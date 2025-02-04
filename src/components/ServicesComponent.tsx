'use client';
import React, { useState } from 'react';
import { Settings2, ChevronDown, ChevronRight } from 'lucide-react';

const ServicesComponent = () => {
  const [activeId, setActiveId] = useState(null);

  const servicesData = {
    heading: "Our Services",
    description: "Comprehensive service offerings",
    categories: [
      {
        id: 1,
        title: "Non Destructive Services",
        services: ["LINAC", "Nano and MicroCT Analysis", "Ultrasonic Testing (UT)", "Radiographic Testing (RT)", "Magnetic Particle Testing (MT)", "Dye Penetrant Testing (PT)", "Eddy Current Testing (ET)", "Visual Inspection", "Thermography"]
      },
      {
        id: 2,
        title: "Design Engineering Services",
        services: ["3D Scanning", "CAD/CAM Designing", "Reverse Engineering", "Simulation and Analysis services"]
      },
      {
        id: 3,
        title: "Manufacturing Services",
        services: ["E2E Manufacturing & Projects", "Subassemblies & Components", "Machining work", "Storage and Fabrication services"]
      },
      {
        id: 4,
        title: "Functional Services",
        services: ["Virtual / Mechanical Simulation", "Digital Simulation", "Reliability", "Fire and Safety", "Environmental Testings"]
      },
      {
        id: 5,
        title: "Materials Engineering Services",
        services: ["Mechanical Testing", "Thermal Testing", "Electrical Testing", "Chemical Testing", "Optical & Spectral services", "Acoustic Testing"]
      },
      {
        id: 6,
        title: "Rapid Prototype Services",
        services: ["3D Printing", "Injection Molding", "Clay or Wax Modeling", "CNC Machining", "Rapid Casting", "Laser Cutting", "Vacuum Forming", "Sheet Metal Prototyping", "Composite Layup", "Water Jet Cutting"]
      }
    ]
  };

  const handleToggle = (id:any) => {
    setActiveId(activeId === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <div className="max-w-7xl mx-auto px-4 pt-16">
        {/* Header Section */}
        <div className="text-center mb-20 relative z-10">
          <div className="space-y-6">
            <Settings2 className="w-16 h-16 mx-auto text-blue-500 animate-spin-slow" />
            <h2 className="text-5xl font-bold text-white bg-clip-text">
              {servicesData.heading}
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              {servicesData.description}
            </p>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6 pb-24">
          {servicesData.categories.map((category) => (
            <div
              key={category.id}
              className="relative group"
            >
              {/* Hover Border Effect */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Main Content Container */}
              <div className="relative bg-slate-900 rounded-xl border border-slate-800 overflow-visible z-10">
                {/* Category Header */}
                <button
                  onClick={() => handleToggle(category.id)}
                  className="w-full flex items-start justify-between p-6 cursor-pointer hover:bg-slate-800/50 transition-colors"
                >
                  <div className="text-left">
                    <h3 className="text-xl font-semibold text-white mb-2">
                      {category.title}
                    </h3>
                    <p className="text-sm text-gray-400">
                      {category.services.length} Services Available
                    </p>
                  </div>
                  <ChevronDown 
                    className={`w-5 h-5 text-blue-400 transition-transform duration-300 ${
                      activeId === category.id ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {/* Services List */}
                <div 
                  className={`transition-all duration-300 ease-in-out ${
                    activeId === category.id ? 'block' : 'hidden'
                  }`}
                >
                  <div className="p-6 space-y-3 border-t border-slate-800">
                    {category.services.map((service, index) => (
                      <div
                        key={index}
                        className="flex items-center group/item hover:bg-slate-800/50 p-2 rounded-lg transition-colors"
                      >
                        <ChevronRight className="w-4 h-4 text-blue-500 mr-2" />
                        <span className="text-gray-300 text-sm group-hover/item:text-white transition-colors">
                          {service}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicesComponent;
"use client"
import React, { useState } from 'react';
import { PlusCircle, Trash2 } from 'lucide-react';

const CapabilitiesPage = () => {
  const [formData, setFormData] = useState({
    title: '',
    paragraph: '',
    capabilities: [
      { title: '', description: '' }
    ]
  });

  const handleInputChange = (e:any, field:any) => {
    setFormData({
      ...formData,
      [field]: e.target.value
    });
  };

  const handleCapabilityChange = (index:any, field:any, value:any) => {
    const updatedCapabilities = formData.capabilities.map((cap, i) => {
      if (i === index) {
        return { ...cap, [field]: value };
      }
      return cap;
    });

    setFormData({
      ...formData,
      capabilities: updatedCapabilities
    });
  };

  const addCapability = () => {
    setFormData({
      ...formData,
      capabilities: [...formData.capabilities, { title: '', description: '' }]
    });
  };

  const removeCapability = (index:any) => {
    const updatedCapabilities = formData.capabilities.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      capabilities: updatedCapabilities
    });
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Header */}
        <div className="border-b border-gray-200 p-6">
          <h1 className="text-2xl font-bold text-gray-900">Item Details</h1>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Title Input */}
          <div className="space-y-2">
            <label 
              htmlFor="title" 
              className="block text-sm font-medium text-gray-700"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              value={formData.title}
              onChange={(e) => handleInputChange(e, 'title')}
              placeholder="Enter title"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
            />
          </div>

          {/* Paragraph Input */}
          <div className="space-y-2">
            <label 
              htmlFor="paragraph" 
              className="block text-sm font-medium text-gray-700"
            >
              Paragraph
            </label>
            <textarea
              id="paragraph"
              value={formData.paragraph}
              onChange={(e) => handleInputChange(e, 'paragraph')}
              placeholder="Enter paragraph"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors min-h-[100px] resize-y"
            />
          </div>

          {/* Capabilities Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Capabilities</h3>
              <button 
                onClick={addCapability}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              >
                <PlusCircle className="w-4 h-4 mr-2" />
                Add Capability
              </button>
            </div>

            {formData.capabilities.map((capability, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium text-gray-900">Capability {index + 1}</h4>
                    <button
                      onClick={() => removeCapability(index)}
                      className={`p-2 rounded-md hover:bg-gray-100 transition-colors ${
                        formData.capabilities.length === 1 
                          ? 'text-gray-400 cursor-not-allowed' 
                          : 'text-red-500 hover:text-red-700'
                      }`}
                      disabled={formData.capabilities.length === 1}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="space-y-2">
                    <label 
                      htmlFor={`cap-title-${index}`}
                      className="block text-sm font-medium text-gray-700"
                    >
                      Title
                    </label>
                    <input
                      type="text"
                      id={`cap-title-${index}`}
                      value={capability.title}
                      onChange={(e) => handleCapabilityChange(index, 'title', e.target.value)}
                      placeholder="Enter capability title"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                    />
                  </div>

                  <div className="space-y-2">
                    <label 
                      htmlFor={`cap-desc-${index}`}
                      className="block text-sm font-medium text-gray-700"
                    >
                      Description
                    </label>
                    <textarea
                      id={`cap-desc-${index}`}
                      value={capability.description}
                      onChange={(e) => handleCapabilityChange(index, 'description', e.target.value)}
                      placeholder="Enter capability description"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors min-h-[80px] resize-y"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Save Button */}
          <button 
            className="w-full px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            Save Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default CapabilitiesPage;
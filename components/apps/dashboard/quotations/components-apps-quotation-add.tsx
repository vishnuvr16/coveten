"use client"
import React, { useState, ChangeEvent } from 'react';
import { Calendar, Upload, Plus, Minus, X } from 'lucide-react';

interface Service {
  id: number;
  name: string;
  quantity: number;
  price: number;
}

interface FormData {
  company: string;
  taxType: string;
  taxRate: number;
  expiryDate: string;
  terms: string;
  hsnCode: string;
  placeOfSupply: string;
  subject: string;
  type: string;
}

const NewQuotation = () => {
  const [services, setServices] = useState<Service[]>([
    { id: 1, name: '', quantity: 1, price: 0 }
  ]);
  
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  
  const [formData, setFormData] = useState<FormData>({
    company: '',
    taxType: 'GST',
    taxRate: 0,
    expiryDate: '',
    terms: '',
    hsnCode: '',
    placeOfSupply: '',
    subject: '',
    type: ''
  });

  const companies: string[] = ["Company A", "Company B", "Company C"];
  const taxTypes: string[] = ["GST", "SGST", "IGST"];
  const terms: string[] = ["Net 30", "Net 60", "Due on Receipt", "Custom"];
  const types: string[] = ["Service", "Product", "Event", "Learn"];

  const addService = (): void => {
    const newId = services.length + 1;
    setServices([...services, { id: newId, name: '', quantity: 1, price: 0 }]);
  };

  const removeService = (id: number): void => {
    if (services.length > 1) {
      setServices(services.filter(service => service.id !== id));
    }
  };

  const handleServiceChange = (id: number, field: keyof Service, value: string | number): void => {
    setServices(services.map(service => 
      service.id === id ? { ...service, [field]: value } : service
    ));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const files = e.target.files;
    if (files) {
      const fileArray = Array.from(files);
      setSelectedFiles([...selectedFiles, ...fileArray]);
    }
  };

  const removeFile = (index: number): void => {
    setSelectedFiles(selectedFiles.filter((_, i) => i !== index));
  };

  const calculateTotal = (): number => {
    return services.reduce((sum, service) => sum + (service.quantity * service.price), 0);
  };

  const handleFormChange = (field: keyof FormData, value: string | number): void => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="min-h-screen p-2">
      <div className="max-w-5xl mx-auto panel rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-white mb-8">Create New Quotation</h1>
        
        {/* Top Section */}
        <div className="grid grid-cols-2 gap-6 mb-8">
          <div className="space-y-6">
            {/* Company Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Select Company
              </label>
              <select 
                className="w-full p-3 bg-[#1b2e4b] rounded-lg text-gray-200 focus:ring-blue-500 focus:border-blue-500"
                value={formData.company}
                onChange={(e) => handleFormChange('company', e.target.value)}
              >
                <option value="">Select a company</option>
                {companies.map(company => (
                  <option key={company} value={company}>{company}</option>
                ))}
              </select>
            </div>

            {/* Tax Details */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Tax Type
                </label>
                <select 
                  className="w-full p-3 bg-[#1b2e4b] rounded-lg text-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={formData.taxType}
                  onChange={(e) => handleFormChange('taxType', e.target.value)}
                >
                  {taxTypes.map(tax => (
                    <option key={tax} value={tax}>{tax}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Tax Rate (%)
                </label>
                <input 
                  type="number" 
                  className="w-full p-3 bg-[#1b2e4b] rounded-lg text-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  min="0"
                  max="100"
                  value={formData.taxRate}
                  onChange={(e) => handleFormChange('taxRate', parseFloat(e.target.value))}
                />
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {/* Date and Terms */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Expiry Date
                </label>
                <div className="relative">
                  <input 
                    type="date" 
                    className="w-full p-3 bg-[#1b2e4b] text-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={formData.expiryDate}
                    onChange={(e) => handleFormChange('expiryDate', e.target.value)}
                  />
                  <Calendar className="absolute right-3 top-3 text-gray-400" size={20} />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Terms
                </label>
                <select 
                  className="w-full p-3 bg-[#1b2e4b] rounded-lg text-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={formData.terms}
                  onChange={(e) => handleFormChange('terms', e.target.value)}
                >
                  {terms.map(term => (
                    <option key={term} value={term}>{term}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* HSN and Place of Supply */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  HSN/SAC Code
                </label>
                <input 
                  type="text" 
                  className="w-full p-3 bg-[#1b2e4b] rounded-lg text-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={formData.hsnCode}
                  onChange={(e) => handleFormChange('hsnCode', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Place of Supply
                </label>
                <input 
                  type="text" 
                  className="w-full p-3 bg-[#1b2e4b] rounded-lg text-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={formData.placeOfSupply}
                  onChange={(e) => handleFormChange('placeOfSupply', e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Subject and Type */}
        <div className="grid grid-cols-2 gap-6 mb-8">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Subject
            </label>
            <input 
              type="text" 
              className="w-full p-3 bg-[#1b2e4b] rounded-lg text-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={formData.subject}
              onChange={(e) => handleFormChange('subject', e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Type
            </label>
            <select 
              className="w-full p-3 bg-[#1b2e4b] rounded-lg text-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={formData.type}
              onChange={(e) => handleFormChange('type', e.target.value)}
            >
              {types.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Services Section */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-400">Services</h2>
            <button 
              onClick={addService}
              className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              <Plus size={20} />
              Add Service
            </button>
          </div>

          <div className="space-y-4">
            {services.map((service) => (
              <div key={service.id} className="flex gap-4 items-start p-4 rounded-lg">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Service Name
                  </label>
                  <input 
                    type="text" 
                    value={service.name}
                    onChange={(e) => handleServiceChange(service.id, 'name', e.target.value)}
                    className="w-full p-3 bg-[#1b2e4b] text-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div className="w-32">
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Quantity
                  </label>
                  <input 
                    type="number"
                    value={service.quantity}
                    onChange={(e) => handleServiceChange(service.id, 'quantity', parseInt(e.target.value))}
                    min="1"
                    className="w-full p-3 bg-[#1b2e4b]  text-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div className="w-40">
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Price
                  </label>
                  <input 
                    type="number"
                    value={service.price}
                    onChange={(e) => handleServiceChange(service.id, 'price', parseFloat(e.target.value))}
                    min="0"
                    step="0.01"
                    className="w-full p-3 bg-[#1b2e4b] rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <button 
                  onClick={() => removeService(service.id)}
                  className="mt-8 p-2 text-red-500 hover:bg-[#1b2e4b] rounded-lg transition-colors"
                >
                  <Minus size={20} />
                </button>
              </div>
            ))}
          </div>

          <div className="mt-4 text-right">
            <p className="text-white font-bold text-2xl">
              Total: ${calculateTotal().toFixed(2)}
            </p>
          </div>
        </div>

        {/* File Upload Section */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-400 mb-4">Documents</h2>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <input
              type="file"
              multiple
              onChange={handleFileChange}
              className="hidden"
              id="file-upload"
            />
            <label 
              htmlFor="file-upload" 
              className="cursor-pointer flex flex-col items-center justify-center gap-2"
            >
              <Upload size={32} className="text-gray-400" />
              <span className="text-sm text-gray-600">
                Drop files here or click to upload
              </span>
            </label>
          </div>

          {/* File List */}
          {selectedFiles.length > 0 && (
            <div className="mt-4 space-y-2">
              {selectedFiles.map((file, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-600">{file.name}</span>
                  <button 
                    onClick={() => removeFile(index)}
                    className="text-red-500 hover:bg-red-50 p-1 rounded-full"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium">
            Create Quotation
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewQuotation;
"use client";
import React, { useState } from 'react';
import { PlusCircle, Trash2, ArrowRight, Check } from 'lucide-react';
import { useSelector } from 'react-redux';
import { IRootState } from '@/store';

interface Product {
  id: number;
  name: string;
  price: number;
  addedDate: string;
  isPopular: boolean;
  isSpecial: boolean;
}

interface ProductFormData {
  name: string;
  price: number;
  videoUrl: string;
  fileUrl: string;
  category: string;
  mainImage: string;
  sideImages: string[];
  shortDescription: string;
  technicalDetails: {
    make: string;
    model: string;
    series: string;
    version: string;
    originCountry: string;
  };
  prerequisites: {
    sitePreparation: string;
    powerRequirements: string;
  };
}

const ComponentsAppsProducts = () => {
  const [activeTab, setActiveTab] = useState<'listing' | 'create'>('listing');
  const [currentStep, setCurrentStep] = useState(1);
  const [sideImages, setSideImages] = useState<string[]>(['']);
  const [brochures, setBrochures] = useState<string[]>(['']);
  const themeConfig = useSelector((state:IRootState) => state.themeConfig)
  
  // Sample products data
  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      name: "Product 1",
      price: 999,
      addedDate: "2024-12-27",
      isPopular: false,
      isSpecial: true
    }
  ]);

  const handleDeleteProduct = (id: number) => {
    setProducts(products.filter(product => product.id !== id));
  };

  const toggleProductStatus = (id: number, type: 'popular' | 'special') => {
    setProducts(products.map(product => {
      if (product.id === id) {
        return {
          ...product,
          [type === 'popular' ? 'isPopular' : 'isSpecial']: 
          !product[type === 'popular' ? 'isPopular' : 'isSpecial']
        };
      }
      return product;
    }));
  };

  const addSideImage = () => {
    setSideImages([...sideImages, '']);
  };

  const removeSideImage = (index: number) => {
    setSideImages(sideImages.filter((_, i) => i !== index));
  };

  const addBrochure = () => {
    setBrochures([...brochures, '']);
  };

  const removeBrochure = (index: number) => {
    setBrochures(brochures.filter((_, i) => i !== index));
  };


  const renderProductListing = () => (
    <div className="overflow-x-auto p-2 shadow-lg">
      <table className="w-full">
        <thead className="bg-[#1b2e4b] border-b border-gray-600">
          <tr>
            <th className="p-4 text-left">S.No</th>
            <th className="p-4 text-left">Name</th>
            <th className="p-4 text-left">Price</th>
            <th className="p-4 text-left">Added Date</th>
            <th className="p-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={product.id} className="border-b border-gray-600 ">
              <td className="p-4">{index + 1}</td>
              <td className="p-4">{product.name}</td>
              <td className="p-4">${product.price}</td>
              <td className="p-4">{product.addedDate}</td>
              <td className="p-4 space-x-2">
                <button className="bg-blue-600 px-3 py-1 rounded hover:bg-blue-700">
                  Update
                </button>
                <button 
                  onClick={() => handleDeleteProduct(product.id)}
                  className="bg-red-600 px-3 py-1 rounded hover:bg-red-700"
                >
                  Delete
                </button>
                <button 
                  onClick={() => toggleProductStatus(product.id, 'popular')}
                  className={`px-3 py-1 rounded ${
                    product.isPopular ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-600 hover:bg-gray-700'
                  }`}
                >
                  {product.isPopular ? 'Remove Popular' : 'Make Popular'}
                </button>
                <button 
                  onClick={() => toggleProductStatus(product.id, 'special')}
                  className={`px-3 py-1 rounded ${
                    product.isSpecial ? 'bg-purple-600 hover:bg-purple-700' : 'bg-gray-600 hover:bg-gray-700'
                  }`}
                >
                  {product.isSpecial ? 'Remove Special' : 'Make Special'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderStep1 = () => (
    <div className="bg-[#1b2e4b] p-8 rounded-xl space-y-6">
      <h3 className="text-xl font-bold text-white mb-6">Basic Product Details</h3>
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-white mb-2">Product Name</label>
          <input
            type="text"
            className="w-full p-3 bg-[#253655] text-white rounded border border-gray-600 focus:outline-none focus:border-blue-500"
            placeholder="Enter product name"
          />
        </div>
        <div>
          <label className="block text-white mb-2">Price</label>
          <input
            type="number"
            className="w-full p-3 bg-[#253655] text-white rounded border border-gray-600 focus:outline-none focus:border-blue-500"
            placeholder="Enter price"
          />
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-white mb-2">Video URL</label>
          <input
            type="url"
            className="w-full p-3 bg-[#253655] text-white rounded border border-gray-600 focus:outline-none focus:border-blue-500"
            placeholder="Enter video URL"
          />
        </div>
        <div>
          <label className="block text-white mb-2">File URL</label>
          <input
            type="url"
            className="w-full p-3 bg-[#253655] text-white rounded border border-gray-600 focus:outline-none focus:border-blue-500"
            placeholder="Enter file URL"
          />
        </div>
      </div>
      <div>
        <label className="block text-white mb-2">Category</label>
        <select className="w-full p-3 bg-[#253655] text-white rounded border border-gray-600 focus:outline-none focus:border-blue-500">
          <option value="">Select category</option>
          <option value="category1">Category 1</option>
          <option value="category2">Category 2</option>
        </select>
      </div>
      <div>
        <label className="block text-white mb-2">Short Description</label>
        <textarea
          className="w-full p-3 bg-[#253655] text-white rounded border border-gray-600 focus:outline-none focus:border-blue-500"
          rows={4}
          placeholder="Enter short description"
        />
      </div>
      <div className="flex justify-end">
        <button
          type="button"
          onClick={() => setCurrentStep(2)}
          className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 flex items-center"
        >
          Next Step <ArrowRight className="ml-2" />
        </button>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="bg-[#1b2e4b] p-8 rounded-xl space-y-6">
      <h3 className="text-xl font-bold text-white mb-6">Images</h3>
      <div>
        <label className="block text-white mb-2">Main Image</label>
        <input
          type="file"
          accept="image/*"
          className="w-full p-3 bg-[#253655] text-white rounded border border-gray-600 focus:outline-none focus:border-blue-500"
        />
      </div>
      <div>
        <div className="flex justify-between items-center mb-4">
          <label className="text-white">Side Images</label>
          <button
            type="button"
            onClick={addSideImage}
            className="bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700 flex items-center"
          >
            <PlusCircle className="mr-2" /> Add Image
          </button>
        </div>
        {sideImages.map((image, index) => (
          <div key={index} className="flex mb-3">
            <input
              type="file"
              accept="image/*"
              className="w-full p-3 bg-[#253655] text-white rounded border border-gray-600 focus:outline-none focus:border-blue-500"
            />
            {sideImages.length > 1 && (
              <button
                type="button"
                onClick={() => removeSideImage(index)}
                className="bg-red-600 text-white p-3 rounded ml-3 hover:bg-red-700"
              >
                <Trash2 />
              </button>
            )}
          </div>
        ))}
      </div>
      <div className="flex justify-between">
        <button
          type="button"
          onClick={() => setCurrentStep(1)}
          className="bg-gray-600 text-white px-6 py-3 rounded hover:bg-gray-700"
        >
          Previous
        </button>
        <button
          type="button"
          onClick={() => setCurrentStep(3)}
          className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 flex items-center"
        >
          Next Step <ArrowRight className="ml-2" />
        </button>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="bg-[#1b2e4b] p-8 rounded-xl space-y-6">
      <h3 className="text-xl font-bold text-white mb-6">Technical Details</h3>
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-white mb-2">Make</label>
          <input
            type="text"
            className="w-full p-3 bg-[#253655] text-white rounded border border-gray-600 focus:outline-none focus:border-blue-500"
            placeholder="Enter make"
          />
        </div>
        <div>
          <label className="block text-white mb-2">Model</label>
          <input
            type="text"
            className="w-full p-3 bg-[#253655] text-white rounded border border-gray-600 focus:outline-none focus:border-blue-500"
            placeholder="Enter model"
          />
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-white mb-2">Series</label>
          <input
            type="text"
            className="w-full p-3 bg-[#253655] text-white rounded border border-gray-600 focus:outline-none focus:border-blue-500"
            placeholder="Enter series"
          />
        </div>
        <div>
          <label className="block text-white mb-2">Version</label>
          <input
            type="text"
            className="w-full p-3 bg-[#253655] text-white rounded border border-gray-600 focus:outline-none focus:border-blue-500"
            placeholder="Enter version"
          />
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-white mb-2">Origin Country</label>
          <input
            type="text"
            className="w-full p-3 bg-[#253655] text-white rounded border border-gray-600 focus:outline-none focus:border-blue-500"
            placeholder="Enter origin country"
          />
        </div>
        <div>
          <label className="block text-white mb-2">Product Dimensions</label>
          <input
            type="text"
            className="w-full p-3 bg-[#253655] text-white rounded border border-gray-600 focus:outline-none focus:border-blue-500"
            placeholder="Enter product dimensions"
          />
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-white mb-2">Product Weight</label>
          <input
            type="text"
            className="w-full p-3 bg-[#253655] text-white rounded border border-gray-600 focus:outline-none focus:border-blue-500"
            placeholder="Enter product weight"
          />
        </div>
        <div>
          <label className="block text-white mb-2">hsnSACCode</label>
          <input
            type="text"
            className="w-full p-3 bg-[#253655] text-white rounded border border-gray-600 focus:outline-none focus:border-blue-500"
            placeholder="Enter hsnSACCode"
          />
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-white mb-2">Warranty</label>
          <input
            type="text"
            className="w-full p-3 bg-[#253655] text-white rounded border border-gray-600 focus:outline-none focus:border-blue-500"
            placeholder="Enter warranty"
          />
        </div>
        <div>
          <label className="block text-white mb-2">Delivery Time</label>
          <input
            type="text"
            className="w-full p-3 bg-[#253655] text-white rounded border border-gray-600 focus:outline-none focus:border-blue-500"
            placeholder="Enter delivery time"
          />
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-white mb-2">Product Demonstration</label>
          <input
            type="text"
            className="w-full p-3 bg-[#253655] text-white rounded border border-gray-600 focus:outline-none focus:border-blue-500"
            placeholder="Enter product demonstration"
          />
        </div>
        <div>
          <label className="block text-white mb-2">Product Training</label>
          <input
            type="text"
            className="w-full p-3 bg-[#253655] text-white rounded border border-gray-600 focus:outline-none focus:border-blue-500"
            placeholder="Enter product training"
          />
        </div>
      </div>
      <div className="flex justify-between">
        <button
          type="button"
          onClick={() => setCurrentStep(2)}
          className="bg-gray-600 text-white px-6 py-3 rounded hover:bg-gray-700"
        >
          Previous
        </button>
        <button
          type="button"
          onClick={() => setCurrentStep(4)}
          className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 flex items-center"
        >
          Next Step <ArrowRight className="ml-2" />
        </button>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="bg-[#1b2e4b] p-8 rounded-xl space-y-6">
      <h3 className="text-xl font-bold text-white mb-6">Pre-requisites</h3>
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-white mb-2">Site Preparation</label>
          <input
            type="text"
            className="w-full p-3 bg-[#253655] text-white rounded border border-gray-600 focus:outline-none focus:border-blue-500"
            placeholder="Enter site preparation"
          />
        </div>
        <div>
          <label className="block text-white mb-2">Power Sockets</label>
          <input
            type="text"
            className="w-full p-3 bg-[#253655] text-white rounded border border-gray-600 focus:outline-none focus:border-blue-500"
            placeholder="Enter power sockets"
          />
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-white mb-2">Power Backups</label>
          <input
            type="text"
            className="w-full p-3 bg-[#253655] text-white rounded border border-gray-600 focus:outline-none focus:border-blue-500"
            placeholder="Enter power backups"
          />
        </div>
        <div>
          <label className="block text-white mb-2">SystemSoftwareIncludingOS</label>
          <input
            type="text"
            className="w-full p-3 bg-[#253655] text-white rounded border border-gray-600 focus:outline-none focus:border-blue-500"
            placeholder="Enter systemSoftwareIncludingOS"
          />
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-white mb-2">iotStatus</label>
          <input
            type="text"
            className="w-full p-3 bg-[#253655] text-white rounded border border-gray-600 focus:outline-none focus:border-blue-500"
            placeholder="Enter iotStatus"
          />
        </div>
        <div>
          <label className="block text-white mb-2">aiMLReady</label>
          <input
            type="text"
            className="w-full p-3 bg-[#253655] text-white rounded border border-gray-600 focus:outline-none focus:border-blue-500"
            placeholder="Enter aiMLReady"
          />
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-white mb-2">operatorTraining</label>
          <input
            type="text"
            className="w-full p-3 bg-[#253655] text-white rounded border border-gray-600 focus:outline-none focus:border-blue-500"
            placeholder="Enter operatorTraining"
          />
        </div>
        <div>
          <label className="block text-white mb-2">anyApprovals</label>
          <input
            type="text"
            className="w-full p-3 bg-[#253655] text-white rounded border border-gray-600 focus:outline-none focus:border-blue-500"
            placeholder="Enter anyApprovals"
          />
        </div>
      </div>
      <div className="flex justify-between">
        <button
          type="button"
          onClick={() => setCurrentStep(3)}
          className="bg-gray-600 text-white px-6 py-3 rounded hover:bg-gray-700"
        >
          Previous
        </button>
        <button
          type="button"
          onClick={() => setCurrentStep(5)}
          className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 flex items-center"
        >
          Next Step <ArrowRight className="ml-2" />
        </button>
      </div>
    </div>
  );

  const renderStep5 = () => (
    <div className="bg-[#1b2e4b] p-8 rounded-xl space-y-6">
      <h3 className="text-xl font-bold text-white mb-6">Other Information</h3>
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-white mb-2">amcCMC</label>
          <input
            type="text"
            className="w-full p-3 bg-[#253655] text-white rounded border border-gray-600 focus:outline-none focus:border-blue-500"
            placeholder="Enter amcCMC"
          />
        </div>
        <div>
          <label className="block text-white mb-2">amcCMCCharges</label>
          <input
            type="text"
            className="w-full p-3 bg-[#253655] text-white rounded border border-gray-600 focus:outline-none focus:border-blue-500"
            placeholder="Enter amcCMCCharges"
          />
        </div>
      </div>

      <h3 className="text-xl font-bold text-white mb-6">Buying Mechanism</h3>
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-white mb-2">orderingMethod</label>
          <input
            type="text"
            className="w-full p-3 bg-[#253655] text-white rounded border border-gray-600 focus:outline-none focus:border-blue-500"
            placeholder="Enter orderingMethod"
          />
        </div>
        <div>
          <label className="block text-white mb-2">deliveryMode</label>
          <input
            type="text"
            className="w-full p-3 bg-[#253655] text-white rounded border border-gray-600 focus:outline-none focus:border-blue-500"
            placeholder="Enter deliveryMode"
          />
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-white mb-2">grossWeight</label>
          <input
            type="text"
            className="w-full p-3 bg-[#253655] text-white rounded border border-gray-600 focus:outline-none focus:border-blue-500"
            placeholder="Enter grossWeight"
          />
        </div>
        <div>
          <label className="block text-white mb-2">applyForPreSiteInspection</label>
          <input
            type="text"
            className="w-full p-3 bg-[#253655] text-white rounded border border-gray-600 focus:outline-none focus:border-blue-500"
            placeholder="Enter applyForPreSiteInspection"
          />
        </div>
      </div>

      <h3 className="text-xl font-bold text-white mb-6">Items in Box</h3>
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-white mb-2">actualProduct</label>
          <input
            type="text"
            className="w-full p-3 bg-[#253655] text-white rounded border border-gray-600 focus:outline-none focus:border-blue-500"
            placeholder="Enter actualProduct"
          />
        </div>
        <div>
          <label className="block text-white mb-2">userManual</label>
          <input
            type="text"
            className="w-full p-3 bg-[#253655] text-white rounded border border-gray-600 focus:outline-none focus:border-blue-500"
            placeholder="Enter userManual"
          />
        </div>
      </div>
      <div className="grid ">
        <div>
          <label className="block text-white mb-2">technicalSpecificationBooklet</label>
          <input
            type="text"
            className="w-full p-3 bg-[#253655] text-white rounded border border-gray-600 focus:outline-none focus:border-blue-500"
            placeholder="Enter technicalSpecificationBooklet"
          />
        </div>
      </div>

      <h3 className='text-xl font-bold text-white mb-6'>Additional Purchases</h3>
        <div>
          <label className="block text-white mb-2">softwares</label>
          <input
            type="text"
            className="w-full p-3 bg-[#253655] text-white rounded border border-gray-600 focus:outline-none focus:border-blue-500"
            placeholder="Enter softwares"
          />
        </div>
        <div>
          <label className="block text-white mb-2">hardwares</label>
          <input
            type="text"
            className="w-full p-3 bg-[#253655] text-white rounded border border-gray-600 focus:outline-none focus:border-blue-500"
            placeholder="Enter hardwares"
          />
        </div>
      
      <div className="flex justify-between">
        <button
          type="button"
          onClick={() => setCurrentStep(3)}
          className="bg-gray-600 text-white px-6 py-3 rounded hover:bg-gray-700"
        >
          Previous
        </button>
        <button
          type="button"
          onClick={() => setCurrentStep(6)}
          className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 flex items-center"
        >
          Next Step <ArrowRight className="ml-2" />
        </button>
      </div>
    </div>
  );

  const renderStep6 = () => (
    <div className="bg-[#1b2e4b] p-8 rounded-xl space-y-6">
      <h3 className="text-xl font-bold text-white mb-6">Brochures</h3>
      <div>
        <div className="flex justify-between items-center mb-4">
          <label className="text-white">Add brochures</label>
          <button
            type="button"
            onClick={addBrochure}
            className="bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700 flex items-center"
          >
            <PlusCircle className="mr-2" /> Add Brochure
          </button>
        </div>
        {brochures.map((brochure, index) => (
          <div key={index} className="flex mb-3">
            <input
              type="file"
              accept="pdf/*"
              className="w-full p-3 bg-[#253655] text-white rounded border border-gray-600 focus:outline-none focus:border-blue-500"
            />
            {brochures.length > 1 && (
              <button
                type="button"
                onClick={() => removeBrochure(index)}
                className="bg-red-600 text-white p-3 rounded ml-3 hover:bg-red-700"
              >
                <Trash2 />
              </button>
            )}
          </div>
        ))}
      </div>
      <div className="flex justify-between">
        <button
          type="button"
          onClick={() => setCurrentStep(4)}
          className="bg-gray-600 text-white px-6 py-3 rounded hover:bg-gray-700"
        >
          Previous
        </button>
        <button
          type="submit"
          className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700 flex items-center"
        >
          Submit <Check className="ml-2" />
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen  p-8" style={{backgroundColor: themeConfig.backgroundColor}}>
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Add New Products</h1>
          <div className="space-x-4">
            <button
              onClick={() => setActiveTab('listing')}
              className={`px-6 py-2 rounded-lg ${
                activeTab === 'listing'
                  ? 'bg-blue-600 text-white'
                  : 'bg-[#1b2e4b] text-gray-300 hover:bg-[#253655]'
              }`}
            >
              Products
            </button>
            <button
              onClick={() => setActiveTab('create')}
              className={`px-6 py-2 rounded-lg ${
                activeTab === 'create'
                  ? 'bg-blue-600 text-white'
                  : 'bg-[#1b2e4b] text-gray-300 hover:bg-[#253655]'
              }`}
            >
              Create Product
            </button>
          </div>
        </div>

        {activeTab === 'listing' ? (
          renderProductListing()
        ) : (
          <form onSubmit={(e) => e.preventDefault()} className="max-w-4xl mx-auto">
            <div className="mb-8">
              <div className="flex justify-between items-center">
                <div className="flex space-x-4">
                  <div
                    onClick={()=>setCurrentStep(1)}
                    className={`w-8 h-8 rounded-full flex cursor-pointer items-center justify-center ${
                      currentStep >= 1 ? 'bg-blue-600' : 'bg-[#1b2e4b]'
                    }`}
                  >
                    1
                  </div>
                  <div
                  onClick={()=>setCurrentStep(2)}
                    className={`w-8 h-8 rounded-full cursor-pointer flex items-center justify-center ${
                      currentStep >= 2 ? 'bg-blue-600' : 'bg-[#1b2e4b]'
                    }`}
                  >
                    2
                  </div>
                  <div
                  onClick={()=>setCurrentStep(3)}
                    className={`w-8 h-8 rounded-full cursor-pointer flex items-center justify-center ${
                      currentStep >= 3 ? 'bg-blue-600' : 'bg-[#1b2e4b]'
                    }`}
                  >
                    3
                  </div>
                  <div
                  onClick={()=>setCurrentStep(4)}
                    className={`w-8 h-8 rounded-full cursor-pointer flex items-center justify-center ${
                      currentStep >= 4 ? 'bg-blue-600' : 'bg-[#1b2e4b]'
                    }`}
                  >
                    4
                  </div>
                  <div
                  onClick={()=>setCurrentStep(5)}
                    className={`w-8 h-8 rounded-full cursor-pointer flex items-center justify-center ${
                      currentStep >= 5 ? 'bg-blue-600' : 'bg-[#1b2e4b]'
                    }`}
                  >
                    5
                  </div>
                  <div
                  onClick={()=>setCurrentStep(6)}
                    className={`w-8 h-8 rounded-full cursor-pointer flex items-center justify-center ${
                      currentStep >= 6 ? 'bg-blue-600' : 'bg-[#1b2e4b]'
                    }`}
                  >
                    6
                  </div>
                </div>
                <div className="text-sm text-gray-400">
                  Step {currentStep} of 6
                </div>
              </div>
            </div>

            {currentStep === 1 && renderStep1()}
            {currentStep === 2 && renderStep2()}
            {currentStep === 3 && renderStep3()}
            {currentStep === 4 && renderStep4()}
            {currentStep === 5 && renderStep5()}
            {currentStep === 6 && renderStep6()}
          </form>
        )}
      </div>
    </div>
  );
};

export default ComponentsAppsProducts;
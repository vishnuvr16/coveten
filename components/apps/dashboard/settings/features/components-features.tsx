"use client"
import React, { useState } from 'react';

// TypeScript interfaces
interface Service {
  id: number;
  name: string;
  isOnHome: boolean;
}

const Featurespage = () => {
  // Sample initial data - in real app this would come from an API
  const [features, setFeatures] = useState<Service[]>([
    { id: 1, name: 'Web Development', isOnHome: true },
    { id: 2, name: 'Mobile App Development', isOnHome: false },
    { id: 3, name: 'UI/UX Design', isOnHome: true },
  ]);

  // Handlers for various actions
  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      setFeatures(features.filter(feature => feature.id !== id));
    }
  };

  const handleHomeToggle = (id: number) => {
    setFeatures(features.map(feature => 
      feature.id === id 
        ? { ...feature, isOnHome: !feature.isOnHome }
        : feature
    ));
  };

  const handleAddNew = () => {
    // In a real app, this would open a modal or navigate to a new page
    alert('Add New Service clicked - implement modal or navigation here');
  };

  return (
    <div className="p-6">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Features</h1>
        <button 
          onClick={handleAddNew}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <span className="text-xl">+</span> Add New
        </button>
      </div>

      {/* Features Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Sr. No</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Name</th>
              <th className="px-6 py-3 text-right text-sm font-semibold text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {features.map((feature, index) => (
              <tr key={feature.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-500">
                  {index + 1}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {feature.name}
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button 
                      onClick={() => alert(`Update ${feature.name}`)}
                      className="text-blue-600 hover:text-blue-800 px-2 py-1 text-sm"
                    >
                      Update
                    </button>
                    <button 
                      onClick={() => handleHomeToggle(feature.id)}
                      className={`px-2 py-1 text-sm ${
                        feature.isOnHome 
                          ? 'text-green-600 hover:text-green-800' 
                          : 'text-gray-600 hover:text-gray-800'
                      }`}
                    >
                      {feature.isOnHome ? 'Remove from Home' : 'Add to Home'}
                    </button>
                    <button 
                      onClick={() => handleDelete(feature.id)}
                      className="text-red-600 hover:text-red-800 px-2 py-1 text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Featurespage;
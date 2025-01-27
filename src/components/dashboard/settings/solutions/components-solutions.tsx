"use client"
import React, { useState } from 'react';

// TypeScript interfaces
interface Service {
  id: number;
  name: string;
  isOnHome: boolean;
}

const ServicesPage = () => {
  // Sample initial data - in real app this would come from an API
  const [services, setServices] = useState<Service[]>([
    { id: 1, name: 'Web Development', isOnHome: true },
    { id: 2, name: 'Mobile App Development', isOnHome: false },
    { id: 3, name: 'UI/UX Design', isOnHome: true },
  ]);

  // Handlers for various actions
  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      setServices(services.filter(service => service.id !== id));
    }
  };

  const handleHomeToggle = (id: number) => {
    setServices(services.map(service => 
      service.id === id 
        ? { ...service, isOnHome: !service.isOnHome }
        : service
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
        <h1 className="text-3xl font-bold">Services</h1>
        <button 
          onClick={handleAddNew}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <span className="text-xl">+</span> Add New
        </button>
      </div>

      {/* Services Table */}
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
            {services.map((service, index) => (
              <tr key={service.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-500">
                  {index + 1}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {service.name}
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button 
                      onClick={() => alert(`Update ${service.name}`)}
                      className="text-blue-600 hover:text-blue-800 px-2 py-1 text-sm"
                    >
                      Update
                    </button>
                    <button 
                      onClick={() => handleHomeToggle(service.id)}
                      className={`px-2 py-1 text-sm ${
                        service.isOnHome 
                          ? 'text-green-600 hover:text-green-800' 
                          : 'text-gray-600 hover:text-gray-800'
                      }`}
                    >
                      {service.isOnHome ? 'Remove from Home' : 'Add to Home'}
                    </button>
                    <button 
                      onClick={() => handleDelete(service.id)}
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

export default ServicesPage;
"use client"
import React, { useState } from 'react';

interface Service {
  id: string;
  name: string;
}

interface ServiceCategory {
  id: string;
  title: string;
  services: Service[];
}

interface FormData {
  heading: string;
  description: string;
  serviceCategories: ServiceCategory[];
}

// Define a type for dynamic error keys
type ErrorKeys = 
  | 'heading' 
  | 'description' 
  | 'categories' 
  | `category${number}` 
  | `categoryServices${number}` 
  | `service${number}-${number}`;

// Define the errors type with an index signature
interface FormErrors {
  [key: string]: string | undefined;
  heading?: string;
  description?: string;
  categories?: string;
}

const ServiceNetworkDetails: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    heading: '',
    description: '',
    serviceCategories: []
  });

  const [errors, setErrors] = useState<FormErrors>({});

  // Validate form data
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.heading.trim()) {
      newErrors.heading = 'Heading is required';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }

    if (formData.serviceCategories.length === 0) {
      newErrors.categories = 'At least one service category is required';
    }

    formData.serviceCategories.forEach((category, index) => {
      if (!category.title.trim()) {
        newErrors[`category${index}` as ErrorKeys] = 'Category title is required';
      }
      if (category.services.length === 0) {
        newErrors[`categoryServices${index}` as ErrorKeys] = 'At least one service is required';
      }
      category.services.forEach((service, serviceIndex) => {
        if (!service.name.trim()) {
          newErrors[`service${index}-${serviceIndex}` as ErrorKeys] = 'Service name is required';
        }
      });
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Add new service category
  const addServiceCategory = () => {
    setFormData(prev => ({
      ...prev,
      serviceCategories: [
        ...prev.serviceCategories,
        {
          id: crypto.randomUUID(),
          title: '',
          services: []
        }
      ]
    }));
  };

  // Remove service category
  const removeServiceCategory = (categoryId: string) => {
    setFormData(prev => ({
      ...prev,
      serviceCategories: prev.serviceCategories.filter(cat => cat.id !== categoryId)
    }));
  };

  // Add new service to category
  const addService = (categoryId: string) => {
    setFormData(prev => ({
      ...prev,
      serviceCategories: prev.serviceCategories.map(cat => {
        if (cat.id === categoryId) {
          return {
            ...cat,
            services: [...cat.services, { id: crypto.randomUUID(), name: '' }]
          };
        }
        return cat;
      })
    }));
  };

  // Remove service from category
  const removeService = (categoryId: string, serviceId: string) => {
    setFormData(prev => ({
      ...prev,
      serviceCategories: prev.serviceCategories.map(cat => {
        if (cat.id === categoryId) {
          return {
            ...cat,
            services: cat.services.filter(service => service.id !== serviceId)
          };
        }
        return cat;
      })
    }));
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Form submitted:', formData);
      // Handle form submission logic here
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Item Details</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Heading */}
        <div>
          <label className="block mb-2 font-medium">
            Heading:
            <input
              type="text"
              value={formData.heading}
              onChange={e => setFormData(prev => ({ ...prev, heading: e.target.value }))}
              className="w-full mt-1 p-2 border rounded"
            />
          </label>
          {errors.heading && <p className="text-red-500 text-sm mt-1">{errors.heading}</p>}
        </div>

        {/* Description */}
        <div>
          <label className="block mb-2 font-medium">
            Description:
            <textarea
              value={formData.description}
              onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className="w-full mt-1 p-2 border rounded"
              rows={4}
            />
          </label>
          {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
        </div>

        {/* Service Categories */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Service Categories</h2>
          {errors.categories && <p className="text-red-500 text-sm mb-2">{errors.categories}</p>}
          
          <div className="space-y-4">
            {formData.serviceCategories.map((category, categoryIndex) => (
              <div key={category.id} className="p-4 border rounded">
                <div className="flex justify-between items-center mb-4">
                  <input
                    type="text"
                    value={category.title}
                    onChange={e => {
                      setFormData(prev => ({
                        ...prev,
                        serviceCategories: prev.serviceCategories.map(cat =>
                          cat.id === category.id ? { ...cat, title: e.target.value } : cat
                        )
                      }));
                    }}
                    placeholder="Category Title"
                    className="flex-1 p-2 border rounded mr-4"
                  />
                  <button
                    type="button"
                    onClick={() => removeServiceCategory(category.id)}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Remove Category
                  </button>
                </div>

                {errors[`category${categoryIndex}`] && (
                  <p className="text-red-500 text-sm mb-2">{errors[`category${categoryIndex}`]}</p>
                )}

                {/* Services */}
                <div className="ml-4 space-y-2">
                  {category.services.map((service, serviceIndex) => (
                    <div key={service.id} className="flex items-center">
                      <input
                        type="text"
                        value={service.name}
                        onChange={e => {
                          setFormData(prev => ({
                            ...prev,
                            serviceCategories: prev.serviceCategories.map(cat =>
                              cat.id === category.id
                                ? {
                                    ...cat,
                                    services: cat.services.map(s =>
                                      s.id === service.id ? { ...s, name: e.target.value } : s
                                    )
                                  }
                                : cat
                            )
                          }));
                        }}
                        placeholder="Service Name"
                        className="flex-1 p-2 border rounded mr-2"
                      />
                      <button
                        type="button"
                        onClick={() => removeService(category.id, service.id)}
                        className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  {errors[`categoryServices${categoryIndex}`] && (
                    <p className="text-red-500 text-sm mt-1">{errors[`categoryServices${categoryIndex}`]}</p>
                  )}
                  <button
                    type="button"
                    onClick={() => addService(category.id)}
                    className="mt-2 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Add Service
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <button
            type="button"
            onClick={addServiceCategory}
            className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Add Service Category
          </button>
        </div>

        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default ServiceNetworkDetails;
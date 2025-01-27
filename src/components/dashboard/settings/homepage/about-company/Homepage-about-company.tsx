"use client"
import React, { useState, useEffect } from 'react';

// TypeScript interfaces
interface Point {
  id: string;
  title: string;
  description: string;
  url: string;
  iconUrl: string | File;
}

interface AboutUsData {
  title: string;
  description: string;
  image: File | string;
  hasPoints: Point[];
}

const initialData: AboutUsData = {
  title: '',
  description: '',
  image: '',
  hasPoints: []
};

const HomepageAboutCompany = () => {
  const [data, setData] = useState<AboutUsData>(initialData);
  const [errors, setErrors] = useState<Partial<AboutUsData>>({});
  const [loading, setLoading] = useState<boolean>(false);

  // Form validation
  const validateForm = (): boolean => {
    const newErrors: Partial<AboutUsData> = {};

    if (!data.title.trim()) {
      newErrors.title = 'Title is required';
    }

    if (!data.description.trim()) {
      newErrors.description = 'Description is required';
    }

    data.hasPoints.forEach((point, index) => {
      if (!point.title.trim() || !point.description.trim() || !point.url.trim()) {
        if (!newErrors.hasPoints) {
          newErrors.hasPoints = [];
        }
        newErrors.hasPoints[index] = { 
          id: point.id,
          title: !point.title.trim() ? 'Title is required' : '',
          description: !point.description.trim() ? 'Description is required' : '',
          url: !point.url.trim() ? 'URL is required' : '',
          iconUrl: ''
        };
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      // Handle form submission logic here
      console.log('Form data:', data);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setData(prev => ({
        ...prev,
        image: file
      }));
    }
  };

  const handlePointChange = (index: number, field: keyof Point, value: string | File) => {
    setData(prev => ({
      ...prev,
      hasPoints: prev.hasPoints.map((point, i) => 
        i === index ? { ...point, [field]: value } : point
      )
    }));
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Title
          </label>
          <input
            type="text"
            value={data.title}
            onChange={(e) => setData(prev => ({ ...prev, title: e.target.value }))}
            className={`w-full px-3 py-2 border rounded-md ${
              errors.title ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-500">{errors.title}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            value={data.description}
            onChange={(e) => setData(prev => ({ ...prev, description: e.target.value }))}
            className={`w-full px-3 py-2 border rounded-md ${
              errors.description ? 'border-red-500' : 'border-gray-300'
            }`}
            rows={4}
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-500">{errors.description}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Image
          </label>
          <input
            type="file"
            onChange={handleImageChange}
            accept="image/*"
            className="w-full px-3 py-2 border rounded-md border-gray-300"
          />
        </div>

        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-gray-900">Points</h2>
          {data.hasPoints.map((point, index) => (
            <div key={point.id} className="p-4 border rounded-md space-y-4">
              <h3 className="font-medium text-gray-700">Point {index + 1}</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  value={point.title}
                  onChange={(e) => handlePointChange(index, 'title', e.target.value)}
                  className="w-full px-3 py-2 border rounded-md border-gray-300"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <input
                  type="text"
                  value={point.description}
                  onChange={(e) => handlePointChange(index, 'description', e.target.value)}
                  className="w-full px-3 py-2 border rounded-md border-gray-300"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  URL
                </label>
                <input
                  type="text"
                  value={point.url}
                  onChange={(e) => handlePointChange(index, 'url', e.target.value)}
                  className="w-full px-3 py-2 border rounded-md border-gray-300"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Icon
                </label>
                <input
                  type="file"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handlePointChange(index, 'iconUrl', file);
                  }}
                  accept="image/*"
                  className="w-full px-3 py-2 border rounded-md border-gray-300"
                />
              </div>
            </div>
          ))}
        </div>

        <div>
          <button
            type="submit"
            disabled={loading}
            className={`px-4 py-2 text-white font-semibold rounded-md ${
              loading 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {loading ? 'Updating...' : 'Update'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default HomepageAboutCompany;
'use client'

import { IRootState } from '@/store';
import React, { useState, useEffect } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { useSelector } from 'react-redux';

interface AboutPageData {
  title: string;
  image: string | null;
  description: string;
}

interface FileInputEvent extends React.ChangeEvent<HTMLInputElement> {
  target: HTMLInputElement & {
    files: FileList;
  };
}

const AboutUs: React.FC = () => {
  // Form state
  const [formData, setFormData] = useState<AboutPageData>({
    title: '',
    image: null,
    description: ''
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errors, setErrors] = useState<Partial<AboutPageData>>({});

  // Validation function
  const validateForm = (): boolean => {
    const newErrors: Partial<AboutPageData> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle image upload
  const handleImageChange = (e: FileInputEvent) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 5000000) { // 5MB limit
        setErrors(prev => ({
          ...prev,
          image: 'Image size should be less than 5MB'
        }));
        return;
      }
      setImageFile(file);
      setFormData(prev => ({
        ...prev,
        image: URL.createObjectURL(file)
      }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Form submitted:', formData);
      // Reset form after successful submission
      setFormData({
        title: '',
        image: null,
        description: ''
      });
      setImageFile(null);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const themeConfig = useSelector((state:IRootState) => state.themeConfig);
  const semidark = useSelector((state: IRootState) => state.themeConfig.semidark);
  console.log(semidark)

  return (
    <div className={semidark ? 'dark' : ''} style={{backgroundColor: themeConfig.backgroundColor}}>
      <div className="max-w-5xl mx-auto">
        <form onSubmit={handleSubmit}   className={`rounded-lg shadow-sm p-6 space-y-6 ${semidark ? 'white' : ''}`}>
          {/* Title Input */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className={`mt-1 block w-full rounded-md border ${
                errors.title ? 'border-red-300' : 'border-gray-300'
              } px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-600">{errors.title}</p>
            )}
          </div>

          {/* Image Upload */}
          <div>
            <label htmlFor="image" className="block text-sm font-medium text-gray-700">
              Cover Image
            </label>
            <div className="mt-1 flex items-center">
              <input
                type="file"
                id="image"
                name="image"
                accept="image/*"
                onChange={handleImageChange}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
            </div>
            {errors.image && (
              <p className="mt-1 text-sm text-red-600">{errors.image}</p>
            )}
            {formData.image && (
              <div className="mt-2">
                <img
                  src={formData.image}
                  alt="Preview"
                  className="h-32 w-auto object-cover rounded-md"
                />
              </div>
            )}
          </div>

          {/* Description Editor */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Page Content
            </label>
            <div className="mt-1">
              <textarea
                id="description"
                name="description"
                rows={6}
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                className={`block w-full rounded-md border ${
                  errors.description ? 'border-red-300' : 'border-gray-300'
                } px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
            </div>
            {errors.description && (
              <p className="mt-1 text-sm text-red-600">{errors.description}</p>
            )}
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                isSubmitting ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
            >
              {isSubmitting ? 'Updating...' : 'Update'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AboutUs;
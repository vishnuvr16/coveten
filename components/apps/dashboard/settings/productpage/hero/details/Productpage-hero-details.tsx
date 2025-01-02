"use client"
import React, { useState, useCallback } from 'react';
import { Upload } from 'lucide-react';

// Define types for form data and validation
interface HeroDetails {
  heading: string;
  image: File | null;
}

interface ValidationErrors {
  heading?: string;
  image?: string;
}

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png', 'image/gif'];

const ProductpageHeroDetails = () => {
  const [details, setDetails] = useState<HeroDetails>({
    heading: '',
    image: null
  });
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isDragging, setIsDragging] = useState(false);

  // Validation functions
  const validateImage = (file: File): string | undefined => {
    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      return 'Please upload a valid image file (JPEG, PNG, or GIF)';
    }
    if (file.size > MAX_FILE_SIZE) {
      return 'File size must be less than 10MB';
    }
    return undefined;
  };

  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {};

    if (!details.heading.trim()) {
      newErrors.heading = 'Heading is required';
    }

    if (!details.image) {
      newErrors.image = 'Image is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Event handlers
  const handleHeadingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDetails(prev => ({
      ...prev,
      heading: e.target.value
    }));
    if (errors.heading) {
      setErrors(prev => ({ ...prev, heading: undefined }));
    }
  };

  const handleImageChange = useCallback((file: File) => {
    const imageError = validateImage(file);
    if (imageError) {
      setErrors(prev => ({ ...prev, image: imageError }));
      return;
    }

    setDetails(prev => ({
      ...prev,
      image: file
    }));
    setErrors(prev => ({ ...prev, image: undefined }));
    
    // Create preview URL
    const url = URL.createObjectURL(file);
    setPreviewUrl(prev => {
      if (prev) URL.revokeObjectURL(prev);
      return url;
    });
  }, []);

  // Drag and drop handlers
  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file) {
      handleImageChange(file);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleImageChange(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Submitted details:', details);
      // Handle form submission here
    }
  };

  return (
    <div className="w-full mx-auto bg-white rounded-lg shadow-md">
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Homepage Hero Details</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label 
              htmlFor="heading" 
              className="block text-sm font-medium text-gray-700"
            >
              Heading
            </label>
            <input
              id="heading"
              type="text"
              value={details.heading}
              onChange={handleHeadingChange}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.heading ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter heading text"
            />
            {errors.heading && (
              <p className="text-sm text-red-500 mt-1">{errors.heading}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Hero Image
            </label>
            <div
              onDragEnter={handleDragEnter}
              onDragOver={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`relative border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer transition-colors ${
                isDragging
                  ? 'border-blue-500 bg-blue-50'
                  : errors.image
                  ? 'border-red-500 hover:border-red-600'
                  : 'border-gray-300 hover:border-blue-500'
              }`}
              onClick={() => document.getElementById('image')?.click()}
            >
              <input
                id="image"
                type="file"
                className="hidden"
                accept={ALLOWED_FILE_TYPES.join(',')}
                onChange={handleFileInput}
              />
              <Upload className="w-8 h-8 text-gray-400 mb-2" />
              <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
              <p className="text-xs text-gray-500 mt-1">PNG, JPG, GIF up to 10MB</p>
            </div>
            {errors.image && (
              <p className="text-sm text-red-500 mt-1">{errors.image}</p>
            )}
            
            {previewUrl && (
              <div className="mt-4">
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="w-full h-48 object-cover rounded-lg"
                />
              </div>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Save Details
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProductpageHeroDetails;
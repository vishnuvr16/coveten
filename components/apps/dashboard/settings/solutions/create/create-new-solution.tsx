"use client"
import React, { useState, ChangeEvent } from 'react';

// TypeScript interfaces
interface Category {
  id: number;
  name: string;
}

interface FormData {
  categories: number[];
  title: string;
  coverImage: File | null;
  thumbnailImage: File | null;
  description: string;
  pageContent: string;
}

const AddNewSolution = () => {
  // Sample categories
  const categories: Category[] = [
    { id: 1, name: 'Web Development' },
    { id: 2, name: 'Mobile Development' },
    { id: 3, name: 'UI/UX Design' },
    { id: 4, name: 'Cloud Services' },
  ];

  const [formData, setFormData] = useState<FormData>({
    categories: [],
    title: '',
    coverImage: null,
    thumbnailImage: null,
    description: '',
    pageContent: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});

  // Preview states for images
  const [coverPreview, setCoverPreview] = useState<string>('');
  const [thumbnailPreview, setThumbnailPreview] = useState<string>('');

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>, type: 'cover' | 'thumbnail') => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        setErrors({ ...errors, [type === 'cover' ? 'coverImage' : 'thumbnailImage']: 'File size should be less than 5MB' });
        return;
      }
      
      const reader = new FileReader();
      reader.onloadend = () => {
        if (type === 'cover') {
          setCoverPreview(reader.result as string);
          setFormData({ ...formData, coverImage: file });
        } else {
          setThumbnailPreview(reader.result as string);
          setFormData({ ...formData, thumbnailImage: file });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Partial<Record<keyof FormData, string>> = {};

    if (formData.categories.length === 0) {
      newErrors.categories = 'Please select at least one category';
    }
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    if (!formData.coverImage) {
      newErrors.coverImage = 'Cover image is required';
    }
    if (!formData.thumbnailImage) {
      newErrors.thumbnailImage = 'Thumbnail image is required';
    }
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    if (!formData.pageContent.trim()) {
      newErrors.pageContent = 'Page content is required';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // Handle form submission
      console.log('Form data:', formData);
    }
  };

  const selectedCategoryValues = formData.categories.map(String);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Add New Service</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Categories */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Categories*
          </label>
          <select
            multiple
            className="w-full border-gray-300 rounded-lg shadow-sm p-2 h-32"
            value={selectedCategoryValues}
            onChange={(e) => {
              const values = Array.from(e.target.selectedOptions, option => Number(option.value));
              setFormData({ ...formData, categories: values });
            }}
          >
            {categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          {errors.categories && (
            <p className="text-red-500 text-sm mt-1">{errors.categories}</p>
          )}
        </div>


        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Title*
          </label>
          <input
            type="text"
            className="w-full border-gray-300 rounded-lg shadow-sm p-2"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title}</p>
          )}
        </div>

        {/* Images */}
        <div className="grid grid-cols-2 gap-6">
          {/* Cover Image */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Cover Image*
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
              {coverPreview ? (
                <div className="relative">
                  <img src={coverPreview} alt="Cover preview" className="w-full h-48 object-cover rounded" />
                  <button
                    type="button"
                    onClick={() => {
                      setCoverPreview('');
                      setFormData({ ...formData, coverImage: null });
                    }}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
                  >
                    ×
                  </button>
                </div>
              ) : (
                <div className="text-center">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageChange(e, 'cover')}
                    className="hidden"
                    id="coverImage"
                  />
                  <label
                    htmlFor="coverImage"
                    className="cursor-pointer text-blue-600 hover:text-blue-800"
                  >
                    Upload Cover Image
                  </label>
                </div>
              )}
            </div>
            {errors.coverImage && (
              <p className="text-red-500 text-sm mt-1">{errors.coverImage}</p>
            )}
          </div>

          {/* Thumbnail Image */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Thumbnail Image*
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
              {thumbnailPreview ? (
                <div className="relative">
                  <img src={thumbnailPreview} alt="Thumbnail preview" className="w-full h-48 object-cover rounded" />
                  <button
                    type="button"
                    onClick={() => {
                      setThumbnailPreview('');
                      setFormData({ ...formData, thumbnailImage: null });
                    }}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
                  >
                    ×
                  </button>
                </div>
              ) : (
                <div className="text-center">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageChange(e, 'thumbnail')}
                    className="hidden"
                    id="thumbnailImage"
                  />
                  <label
                    htmlFor="thumbnailImage"
                    className="cursor-pointer text-blue-600 hover:text-blue-800"
                  >
                    Upload Thumbnail Image
                  </label>
                </div>
              )}
            </div>
            {errors.thumbnailImage && (
              <p className="text-red-500 text-sm mt-1">{errors.thumbnailImage}</p>
            )}
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description*
          </label>
          <textarea
            className="w-full border-gray-300 rounded-lg shadow-sm p-2 h-32"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">{errors.description}</p>
          )}
        </div>

        {/* Rich Text Editor for Page Content */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Page Content*
          </label>
          <div className="border rounded-lg overflow-hidden">
            {/* Basic formatting toolbar */}
            <div className="bg-gray-50 border-b p-2 flex gap-2">
              <button
                type="button"
                className="p-1 hover:bg-gray-200 rounded"
                onClick={() => {
                  // Implement bold formatting
                }}
              >
                B
              </button>
              <button
                type="button"
                className="p-1 hover:bg-gray-200 rounded italic"
                onClick={() => {
                  // Implement italic formatting
                }}
              >
                I
              </button>
              <button
                type="button"
                className="p-1 hover:bg-gray-200 rounded underline"
                onClick={() => {
                  // Implement underline formatting
                }}
              >
                U
              </button>
            </div>
            <textarea
              className="w-full p-4 h-64 focus:outline-none"
              value={formData.pageContent}
              onChange={(e) => setFormData({ ...formData, pageContent: e.target.value })}
            />
          </div>
          {errors.pageContent && (
            <p className="text-red-500 text-sm mt-1">{errors.pageContent}</p>
          )}
        </div>

        {/* Submit Button */}
        <div className="flex justify-end gap-4">
          <button
            type="button"
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            onClick={() => window.history.back()}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Create Service
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddNewSolution;
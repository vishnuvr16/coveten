"use client"
import { IRootState } from '@/src/store';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

// TypeScript interfaces
interface Ad {
  id?: string;
  images: string;
  imageFile?: File;
  isBanner: boolean;
  link: string;
  title: string;
}

interface AdvertisementProps {
  initialAds?: Ad[];
  onSave?: (ads: Ad[]) => void;
}

// Sample data
const sampleAds: Ad[] = [
  {
    id: '1',
    images: '',
    isBanner: true,
    link: 'https://example.com/ad1',
    title: 'Premium Membership'
  }
];

const Advertisement: React.FC<AdvertisementProps> = ({ 
  initialAds = sampleAds,
  onSave 
}) => {
  const [ads, setAds] = useState<Ad[]>(initialAds);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const themeConfig = useSelector((state: IRootState) => state.themeConfig);


  // Validation function
  const validateAd = (ad: Ad, index: number): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!ad.title.trim()) {
      newErrors[`title-${index}`] = 'Title is required';
    }
    if (!ad.link.trim()) {
      newErrors[`link-${index}`] = 'Link is required';
    } else if (!/^https?:\/\/.+/.test(ad.link)) {
      newErrors[`link-${index}`] = 'Please enter a valid URL starting with http:// or https://';
    }
    if (!ad.images && !ad.imageFile) {
      newErrors[`image-${index}`] = 'Image is required';
    }

    setErrors(prev => ({ ...prev, ...newErrors }));
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>, 
    index: number
  ) => {
    const { name, value, type, checked } = e.target;
    setAds(prevAds => {
      const newAds = [...prevAds];
      newAds[index] = {
        ...newAds[index],
        [name]: type === 'checkbox' ? checked : value,
      };
      return newAds;
    });
    // Clear error when user starts typing
    if (errors[`${name}-${index}`]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[`${name}-${index}`];
        return newErrors;
      });
    }
  };

  const handleFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setErrors(prev => ({
        ...prev,
        [`image-${index}`]: 'Please select an image file'
      }));
      return;
    }

    // Validate file size (e.g., max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setErrors(prev => ({
        ...prev,
        [`image-${index}`]: 'Image size should be less than 5MB'
      }));
      return;
    }

    // Create preview URL
    const previewUrl = URL.createObjectURL(file);

    setAds(prevAds => {
      const newAds = [...prevAds];
      newAds[index] = {
        ...newAds[index],
        images: previewUrl,
        imageFile: file
      };
      return newAds;
    });

    // Clear any existing image errors
    if (errors[`image-${index}`]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[`image-${index}`];
        return newErrors;
      });
    }
  };

  const handleRemoveAd = (index: number) => {
    setAds(prevAds => {
      const newAds = prevAds.filter((_, i) => i !== index);
      // Clean up any URLs created with URL.createObjectURL
      if (prevAds[index].images && prevAds[index].imageFile) {
        URL.revokeObjectURL(prevAds[index].images);
      }
      return newAds;
    });
  };

  const handleRemoveImage = (index: number) => {
    setAds(prevAds => {
      const newAds = [...prevAds];
      if (newAds[index].images && newAds[index].imageFile) {
        URL.revokeObjectURL(newAds[index].images);
      }
      newAds[index] = {
        ...newAds[index],
        images: '',
        imageFile: undefined
      };
      return newAds;
    });
  };

  const handleSubmit = () => {
    let isValid = true;
    ads.forEach((ad, index) => {
      if (!validateAd(ad, index)) {
        isValid = false;
      }
    });

    if (isValid && onSave) {
      onSave(ads);
    }
  };

  // Clean up URLs when component unmounts
  useEffect(() => {
    return () => {
      ads.forEach(ad => {
        if (ad.images && ad.imageFile) {
          URL.revokeObjectURL(ad.images);
        }
      });
    };
  }, []);
  return (
    <div className="min-h-screen pt-3" style={{color: themeConfig.primaryColor}}>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">
          Advertisement Manager
        </h1>

        <div className="space-y-8">
          {ads.map((ad, index) => (
            <div 
              key={index} 
              className="bg-[#2f4367] rounded-lg p-6 relative transform transition-all hover:scale-[1.01] hover:shadow-xl"
            >
              <button
                onClick={() => handleRemoveAd(index)}
                className="absolute top-4 right-4 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md transition-colors"
              >
                Remove
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-white mb-2">
                      Title
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={ad.title}
                      onChange={(e) => handleInputChange(e, index)}
                      className={`w-full bg-[#1a2847] text-white px-4 py-2 rounded-md border ${
                        errors[`title-${index}`] ? 'border-red-500' : 'border-[#3f557a]'
                      }`}
                      placeholder="Enter ad title"
                    />
                    {errors[`title-${index}`] && (
                      <p className="text-red-500 text-sm mt-1">{errors[`title-${index}`]}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-white mb-2">
                      Link
                    </label>
                    <input
                      type="url"
                      name="link"
                      value={ad.link}
                      onChange={(e) => handleInputChange(e, index)}
                      className={`w-full bg-[#1a2847] text-white px-4 py-2 rounded-md border ${
                        errors[`link-${index}`] ? 'border-red-500' : 'border-[#3f557a]'
                      }`}
                      placeholder="https://"
                    />
                    {errors[`link-${index}`] && (
                      <p className="text-red-500 text-sm mt-1">{errors[`link-${index}`]}</p>
                    )}
                  </div>

                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      name="isBanner"
                      checked={ad.isBanner}
                      onChange={(e) => handleInputChange(e, index)}
                      className="w-4 h-4 bg-[#1a2847] border-[#3f557a] rounded"
                    />
                    <label className="text-white">
                      Display as Banner
                    </label>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-white mb-2">
                      Image
                    </label>
                    <div className="flex items-center space-x-4">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileChange(e, index)}
                        className="text-white file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-[#3f557a] file:text-white hover:file:bg-[#4a6288] file:cursor-pointer cursor-pointer"
                      />
                    </div>
                    {errors[`image-${index}`] && (
                      <p className="text-red-500 text-sm mt-1">{errors[`image-${index}`]}</p>
                    )}
                  </div>

                  {ad.images && (
                    <div className="relative group">
                      <img
                        src={ad.images}
                        alt={ad.title}
                        className="w-full h-40 object-cover rounded-md"
                      />
                      <button
                        onClick={() => handleRemoveImage(index)}
                        className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        ×
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-between mt-8">
          <button
            onClick={() => setAds(prev => [...prev, { 
              images: '', 
              isBanner: false, 
              link: '', 
              title: '' 
            }])}
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-md transition-colors"
          >
            Add New Ad
          </button>

          <button
            onClick={handleSubmit}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md transition-colors"
          >
            Save All Ads
          </button>
        </div>
      </div>
    </div>
  );
};

export default Advertisement;
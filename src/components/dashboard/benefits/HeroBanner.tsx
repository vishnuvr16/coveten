"use client"
import { IRootState } from '@/src/store';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

// Type Definitions
interface Hero {
  id?: string;
  title: string;
  image: string;
  location: string;
  description: string;
  registrationUrl?: string;
  registrationLabel?: string;
  createdBy?: string;
}

interface BenefitInfo {
  id: string;
  tagline: string[];
  hasHeroitems: {
    hasLargeHeros: Hero[];
    hasSmallHeros: Hero[];
  };
}

// Sample Data
const sampleBenefitInfo: BenefitInfo = {
  id: '1',
  tagline: ['Experience the difference', 'Join our community'],
  hasHeroitems: {
    hasLargeHeros: [
      {
        id: '1',
        title: 'Summer Adventure',
        image: '/sample/image1.jpg',
        location: 'Mountain View',
        description: 'Experience the thrill of summer adventures',
        registrationUrl: '/register',
        registrationLabel: 'Join Now',
        createdBy: 'Admin'
      }
    ],
    hasSmallHeros: [
      {
        id: '2',
        title: 'City Explorer',
        image: '/sample/image2.jpg',
        location: 'Downtown',
        description: 'Discover urban adventures',
        registrationUrl: '/explore',
        registrationLabel: 'Explore',
        createdBy: 'Admin'
      }
    ]
  }
};

// Hero Form Component
interface HeroFormProps {
  hero: Hero;
  index: number;
  onSave: (hero: Hero) => void;
  onDelete: () => void;
}

const HeroForm: React.FC<HeroFormProps> = ({ hero, index, onSave, onDelete }) => {
  const [formData, setFormData] = useState<Hero>(hero);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const themeConfig = useSelector((state: IRootState) => state.themeConfig);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0];
      setImagePreview(URL.createObjectURL(file));
      setFormData(prev => ({ ...prev, image: URL.createObjectURL(file) }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const formStyle = {
    backgroundColor: themeConfig.backgroundColor,
    color: "black"
  };

  const buttonStyle = {
    backgroundColor: themeConfig.backgroundColor,
    color: '#ffffff'
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 rounded-lg shadow-lg mb-4" style={formStyle}>
      <div className="grid grid-cols-1 gap-4">
        <h3 className="text-xl font-bold mb-2" >
          Hero {index + 1}
        </h3>

        <div className="space-y-2">
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Title"
            className="w-full p-2 rounded border focus:outline-none focus:ring-2"
            required
          />

          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Location"
            className="w-full p-2 rounded border focus:outline-none focus:ring-2"
            required
          />

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
            className="w-full p-2 rounded border focus:outline-none focus:ring-2 h-24"
            required
          />

          <div className="flex flex-col space-y-2">
            <label className="text-sm font-medium">Image</label>
            <input
              type="file"
              onChange={handleImageChange}
              accept="image/*"
              className="w-full p-2 rounded border"
            />
            {imagePreview && (
              <img src={imagePreview} alt="Preview" className="w-32 h-32 object-cover rounded" />
            )}
          </div>

          <div className="flex space-x-2 mt-4">
            <button
              type="submit"
              className="px-4 py-2 rounded transition-colors duration-200 bg-[#243656] text-white"
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={onDelete}
              className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600 transition-colors duration-200"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

// Main HeroBanner Component
const HeroBanner: React.FC = () => {
  const [benefitInfo, setBenefitInfo] = useState<BenefitInfo>(sampleBenefitInfo);
  const themeConfig = useSelector((state: IRootState) => state.themeConfig);

  const handleHeroSave = (heroType: 'large' | 'small', index: number, updatedHero: Hero) => {
    setBenefitInfo(prev => {
      const newBenefitInfo = { ...prev };
      const heroArray = heroType === 'large' ? 'hasLargeHeros' : 'hasSmallHeros';
      newBenefitInfo.hasHeroitems[heroArray][index] = updatedHero;
      return newBenefitInfo;
    });
  };

  const handleHeroDelete = (heroType: 'large' | 'small', index: number) => {
    setBenefitInfo(prev => {
      const newBenefitInfo = { ...prev };
      const heroArray = heroType === 'large' ? 'hasLargeHeros' : 'hasSmallHeros';
      newBenefitInfo.hasHeroitems[heroArray].splice(index, 1);
      return newBenefitInfo;
    });
  };

  return (
    <div className="min-h-screen p-6 bg-[#243656]" style={{ backgroundColor: themeConfig.backgroundColor }}>
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8" style={{ color: themeConfig.primaryColor }}>
          Hero Banner Management
        </h1>

        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4">
              Large Heroes
            </h2>
            {benefitInfo.hasHeroitems.hasLargeHeros.map((hero, index) => (
              <HeroForm
                key={hero.id || index}
                hero={hero}
                index={index}
                onSave={(updatedHero) => handleHeroSave('large', index, updatedHero)}
                onDelete={() => handleHeroDelete('large', index)}
              />
            ))}
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">
              Small Heroes
            </h2>
            {benefitInfo.hasHeroitems.hasSmallHeros.map((hero, index) => (
              <HeroForm
                key={hero.id || index}
                hero={hero}
                index={index}
                onSave={(updatedHero) => handleHeroSave('small', index, updatedHero)}
                onDelete={() => handleHeroDelete('small', index)}
              />
            ))}
          </section>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
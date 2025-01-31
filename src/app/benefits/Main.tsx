"use client"
import React, { useState, useEffect } from 'react';

// TypeScript interfaces
interface Hero {
  id: string;
  title: string;
  image: string;
  description: string;
  location: string;
  createdAt?: string;
  createdBy?: string;
}

interface NewsArticle {
  id: string;
  image: string;
  heading: string;
  description: string;
  location: string;
  startAt: string;
  endAt: string;
  createdAt: string;
}

interface NewsContent {
  id: string;
  category: string;
  mainImage: string;
  mainHeading: string;
  mainDescription: string;
  registrationUrl: string;
  registrationLabel: string;
  location: string;
  hasArticles: NewsArticle[];
}

interface Advertisement {
  id: string;
  title: string;
  images: string[];
  isBanner: boolean;
  link: string;
}

interface BenefitPage {
  id: string;
  tagline: string;
  hasHeroitems: {
    hasLargeHeros: Hero[];
    hasSmallHeros: Hero[];
  };
  hasNewscontent: NewsContent[];
  hasAds: Advertisement[];
}

// Sample data
const sampleData: { benefitPages: BenefitPage[] } = {
  benefitPages: [{
    id: '1',
    tagline: 'Discover Amazing Benefits',
    hasHeroitems: {
      hasLargeHeros: [
        {
          id: '1',
          title: 'Summer Wellness Program',
          image: '/api/placeholder/800/400',
          description: 'Join our comprehensive wellness program with exciting activities and rewards.',
          location: 'Multiple Locations',
        }
      ],
      hasSmallHeros: [
        {
          id: '2',
          title: 'Fitness Classes',
          image: '/api/placeholder/400/300',
          description: 'Daily fitness classes with certified trainers',
          location: 'City Gym'
        },
        {
          id: '3',
          title: 'Mental Health Support',
          image: '/api/placeholder/400/300',
          description: '24/7 mental health resources and counseling',
          location: 'Online'
        }
      ]
    },
    hasNewscontent: [{
      id: '1',
      category: 'Wellness',
      mainImage: '/api/placeholder/600/300',
      mainHeading: 'Employee Wellness Week',
      mainDescription: 'A week dedicated to employee wellness with various activities and workshops.',
      registrationUrl: '#',
      registrationLabel: 'Register Now',
      location: 'Main Campus',
      hasArticles: [
        {
          id: '1',
          image: '/api/placeholder/300/200',
          heading: 'Yoga Workshop',
          description: 'Learn yoga basics with expert instructors',
          location: 'Wellness Center',
          startAt: '2025-02-01T09:00:00',
          endAt: '2025-02-01T10:30:00',
          createdAt: '2025-01-15T00:00:00'
        }
      ]
    }],
    hasAds: [{
      id: '1',
      title: 'Special Offer',
      images: ['/api/placeholder/1200/300'],
      isBanner: true,
      link: '#'
    }]
  }]
};

const BenefitPageContent: React.FC = () => {
  const [activeNewsIndex, setActiveNewsIndex] = useState(0);
  const [isHovered, setIsHovered] = useState<string | null>(null);

  const benefitData = sampleData.benefitPages[0];

  return (
    <div className="max-w-7xl mx-auto px-4">
      {/* Hero Section */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-center mb-8">{benefitData.tagline}</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Large Hero */}
          <div className="lg:col-span-2 group relative cursor-pointer"
               onMouseEnter={() => setIsHovered('large-hero')}
               onMouseLeave={() => setIsHovered(null)}>
            <img 
              src={benefitData.hasHeroitems.hasLargeHeros[0].image}
              alt={benefitData.hasHeroitems.hasLargeHeros[0].title}
              className="w-full h-96 object-cover rounded-lg shadow-lg transition-transform duration-300 group-hover:scale-[1.02]"
            />
            <div className={`absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent text-white rounded-b-lg transition-opacity duration-300 ${isHovered === 'large-hero' ? 'opacity-100' : 'opacity-90'}`}>
              <h2 className="text-2xl font-bold mb-2">{benefitData.hasHeroitems.hasLargeHeros[0].title}</h2>
              <p className="text-sm">{benefitData.hasHeroitems.hasLargeHeros[0].description}</p>
            </div>
          </div>

          {/* Small Heroes */}
          <div className="space-y-6">
            {benefitData.hasHeroitems.hasSmallHeros.map((hero, index) => (
              <div key={hero.id} 
                   className="group relative cursor-pointer"
                   onMouseEnter={() => setIsHovered(`small-hero-${index}`)}
                   onMouseLeave={() => setIsHovered(null)}>
                <img 
                  src={hero.image}
                  alt={hero.title}
                  className="w-full h-44 object-cover rounded-lg shadow-lg transition-transform duration-300 group-hover:scale-[1.02]"
                />
                <div className={`absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent text-white rounded-b-lg transition-opacity duration-300 ${isHovered === `small-hero-${index}` ? 'opacity-100' : 'opacity-90'}`}>
                  <h3 className="text-lg font-bold">{hero.title}</h3>
                  <p className="text-sm">{hero.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* News Section */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold mb-6">Latest News & Events</h2>
        {benefitData.hasNewscontent.map((news, index) => (
          <div key={news.id} className="bg-gray-50 rounded-lg p-6 mb-6">
            <div className="flex flex-col md:flex-row gap-6">
              <img 
                src={news.mainImage}
                alt={news.mainHeading}
                className="w-full md:w-1/3 h-64 object-cover rounded-lg"
              />
              <div className="flex-1">
                <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-3">
                  {news.category}
                </span>
                <h3 className="text-2xl font-bold mb-3">{news.mainHeading}</h3>
                <p className="text-gray-600 mb-4">{news.mainDescription}</p>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors duration-300">
                  {news.registrationLabel}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Advertisements */}
      <div className="mb-12">
        {benefitData.hasAds.map(ad => (
          ad.isBanner && (
            <div key={ad.id} className="relative overflow-hidden rounded-lg cursor-pointer group">
              <img 
                src={ad.images[0]}
                alt={ad.title}
                className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h3 className="text-white text-2xl font-bold">{ad.title}</h3>
              </div>
            </div>
          )
        ))}
      </div>
    </div>
  );
};

export default BenefitPageContent;
"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';


interface Product {
  id: string;
  title: string;
  image: string;
  price: number;
  rating: number;
  reviewCount: number;
  shortDescription: string;
  category: string;
  brand: string;
  inStock: boolean;
}

interface ProductAd {
  id: string;
  image: string;
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
}

const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    title: 'Professional Power Drill',
    image: '/api/placeholder/400/300',
    price: 299.99,
    rating: 4.8,
    reviewCount: 256,
    shortDescription: 'Heavy-duty cordless drill with 20V lithium battery',
    category: 'Power Tools',
    brand: 'TechCraft',
    inStock: true
  },
  {
    id: '2',
    title: 'Industrial Laser Level',
    image: '/api/placeholder/400/300',
    price: 449.99,
    rating: 4.9,
    reviewCount: 189,
    shortDescription: 'Self-leveling laser with 360-degree coverage',
    category: 'Measurement Tools',
    brand: 'PrecisionPro',
    inStock: true
  },
  {
    id: '3',
    title: 'Hydraulic Floor Jack',
    image: '/api/placeholder/400/300',
    price: 199.99,
    rating: 4.7,
    reviewCount: 312,
    shortDescription: '3-ton capacity professional-grade floor jack',
    category: 'Automotive Tools',
    brand: 'PowerLift',
    inStock: false
  }
];

const MOCK_POPULAR_PRODUCTS: Product[] = [
  {
    id: '4',
    title: 'Premium Air Compressor',
    image: '/api/placeholder/400/300',
    price: 599.99,
    rating: 4.9,
    reviewCount: 423,
    shortDescription: '60-gallon vertical professional air compressor',
    category: 'Air Tools',
    brand: 'TechCraft',
    inStock: true
  },
  {
    id: '5',
    title: 'Digital Multimeter',
    image: '/api/placeholder/400/300',
    price: 149.99,
    rating: 4.8,
    reviewCount: 567,
    shortDescription: 'Professional auto-ranging digital multimeter',
    category: 'Electronic Tools',
    brand: 'PrecisionPro',
    inStock: true
  },
  {
    id: '6',
    title: 'Welding Machine',
    image: '/api/placeholder/400/300',
    price: 799.99,
    rating: 4.9,
    reviewCount: 289,
    shortDescription: 'Multi-process welder with digital display',
    category: 'Welding Equipment',
    brand: 'PowerLift',
    inStock: true
  }
];

const MOCK_ADS: ProductAd[] = [
  {
    id: '1',
    image: '/api/placeholder/1200/400',
    title: 'Summer Sale on Power Tools',
    description: 'Get up to 40% off on professional power tools',
    buttonText: 'Shop Now',
    buttonLink: '#'
  },
  {
    id: '2',
    image: '/api/placeholder/1200/400',
    title: 'New Professional Series Launch',
    description: 'Discover our latest range of precision tools',
    buttonText: 'Learn More',
    buttonLink: '#'
  },
  {
    id: '3',
    image: '/api/placeholder/1200/400',
    title: 'Special Bundle Deals',
    description: 'Save big on professional tool bundles',
    buttonText: 'View Deals',
    buttonLink: '#'
  }
];

const ProductCategoryPage: React.FC = () => {
  const [selectedFilters, setSelectedFilters] = useState({
    brand: 'all',
    price: 'all',
    rating: 'all'
  });
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentAd, setCurrentAd] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % MOCK_ADS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const adTimer = setInterval(() => {
      setCurrentAd((prev) => (prev + 1) % MOCK_ADS.length);
    }, 4000);
    return () => clearInterval(adTimer);
  }, []);

  const AdsSlider: React.FC = () => (
    <div className="relative w-full h-96 overflow-hidden rounded-xl my-16 shadow-2xl">
      <div className="absolute top-4 right-4 z-10 flex gap-2">
        {MOCK_ADS.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentAd(index)}
            className={`w-3 h-3 rounded-full transition-colors duration-300 ${
              index === currentAd ? 'bg-white' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
      {MOCK_ADS.map((ad, index) => (
        <div
          key={ad.id}
          className={`absolute w-full h-full transition-all duration-700 transform ${
            index === currentAd ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'
          }`}
        >
          <Image
            src={ad.image}
            alt={ad.title}
            layout="fill"
            objectFit="cover"
            className="brightness-50"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center p-8">
            <h2 className="text-4xl font-bold mb-4">{ad.title}</h2>
            <p className="text-xl mb-8">{ad.description}</p>
            <button className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-blue-50 transition-colors duration-300">
              {ad.buttonText}
            </button>
          </div>
        </div>
      ))}
    </div>
  );

  const ProductCard: React.FC<{ product: Product }> = ({ product }) => (
    <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl overflow-hidden shadow-lg transform transition-transform duration-300 hover:scale-105">
      <div className="relative h-48">
        <Image
          src={product.image}
          alt={product.title}
          layout="fill"
          objectFit="cover"
          className="transition-opacity duration-300 hover:opacity-90"
        />
        {!product.inStock && (
          <div className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-full text-sm">
            Out of Stock
          </div>
        )}
      </div>
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold text-gray-800">{product.title}</h3>
          <span className="text-xl font-bold text-blue-600">${product.price}</span>
        </div>
        <p className="text-gray-600 text-sm mb-3">{product.shortDescription}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-sm text-gray-600 ml-2">({product.reviewCount})</span>
          </div>
          <Link href="/products/product-description/productId">
            <button
              className={`px-4 py-2 rounded-lg transition-colors duration-300 ${
                product.inStock
                  ? 'bg-blue-600 hover:bg-blue-700 text-white'
                  : 'bg-gray-300 cursor-not-allowed text-gray-500'
              }`}
            >
              View
            </button>
          </Link>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Hero Banner */}
      <div className="relative h-96 overflow-hidden rounded-xl shadow-2xl">
        {MOCK_ADS.map((ad, index) => (
          <div
            key={ad.id}
            className={`absolute w-full h-full transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Image
              src={ad.image}
              alt={ad.title}
              layout="fill"
              objectFit="cover"
              className="brightness-50"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <h1 className="text-4xl md:text-6xl font-bold text-white text-center">
                {ad.title}
              </h1>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-8">
          <select
            className="px-4 py-2 rounded-lg bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={selectedFilters.brand}
            onChange={(e) => setSelectedFilters({ ...selectedFilters, brand: e.target.value })}
          >
            <option value="all">All Brands</option>
            <option value="TechCraft">TechCraft</option>
            <option value="PrecisionPro">PrecisionPro</option>
            <option value="PowerLift">PowerLift</option>
          </select>
          <select
            className="px-4 py-2 rounded-lg bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={selectedFilters.price}
            onChange={(e) => setSelectedFilters({ ...selectedFilters, price: e.target.value })}
          >
            <option value="all">All Prices</option>
            <option value="0-100">$0 - $100</option>
            <option value="101-300">$101 - $300</option>
            <option value="301+">$301+</option>
          </select>
          <select
            className="px-4 py-2 rounded-lg bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={selectedFilters.rating}
            onChange={(e) => setSelectedFilters({ ...selectedFilters, rating: e.target.value })}
          >
            <option value="all">All Ratings</option>
            <option value="4+">4+ Stars</option>
            <option value="3+">3+ Stars</option>
          </select>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {MOCK_PRODUCTS.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Ads Slider */}
        <AdsSlider />

        {/* Popular Products Section */}
        <div className="my-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Popular Products
            <div className="w-24 h-1 bg-blue-600 mx-auto mt-4"></div>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {MOCK_POPULAR_PRODUCTS.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-16 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl shadow-lg p-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold text-blue-600">2,500+</span>
              <span className="text-gray-600 mt-2">Products Sold</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold text-blue-600">98%</span>
              <span className="text-gray-600 mt-2">Customer Satisfaction</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold text-blue-600">4.8</span>
              <span className="text-gray-600 mt-2">Average Rating</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold text-blue-600">50+</span>
              <span className="text-gray-600 mt-2">Trusted Partners</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCategoryPage;
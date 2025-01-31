"use client";
import React, { useState } from 'react';
import YouTube from 'react-youtube';
import { ChevronRight, Star, Download, Box, Truck, Shield, Clock, PenTool } from 'lucide-react';

interface ProductDetails {
    id: string;
    name: string;
    brand: string;
    model: string;
    description: string;
    shortDescription: string;
    price: {
      current: number;
      original?: number;
      discount?: number;
    };
    availability: {
      status: 'in-stock' | 'out-of-stock' | 'pre-order';
      quantity?: number;
      restockDate?: string;
    };
    rating: {
      average: number;
      count: number;
    };
    certification: string[];
    warranty: {
      duration: string;
      coverage: string;
    };
    shipping: {
      methods: {
        name: string;
        duration: string;
        price: number;
      }[];
      restrictions?: string[];
    };
    images: {
      id: string;
      url: string;
      alt: string;
      type: 'main' | 'gallery' | 'diagram' | 'certification';
    }[];
    videos: {
      id: string;
      youtubeId: string;
      title: string;
      thumbnail: string;
    }[];
    features: {
      title: string;
      description: string;
      icon?: string;
    }[];
    specifications: {
      category: string;
      items: {
        label: string;
        value: string;
      }[];
    }[];
    technicalDetails: {
      dimensions: {
        length: number;
        width: number;
        height: number;
        unit: string;
      };
      weight: {
        value: number;
        unit: string;
      };
      powerRequirements: {
        voltage: string;
        frequency: string;
        consumption: string;
      };
      materials: string[];
      certifications: string[];
    };
    diagrams: {
      id: string;
      url: string;
      title: string;
      description: string;
    }[];
    prerequisites: {
      required: string[];
      recommended: string[];
    };
    installation: {
      difficulty: 'easy' | 'medium' | 'hard';
      time: string;
      steps: {
        order: number;
        title: string;
        description: string;
        image?: string;
      }[];
      tools: string[];
    };
    boxContents: {
      mainItems: string[];
      accessories: string[];
      documents: string[];
    };
    downloads: {
      category: string;
      files: {
        name: string;
        url: string;
        type: string;
        size: string;
      }[];
    }[];
    support: {
      manual: string;
      videoGuides: string[];
      faq: {
        question: string;
        answer: string;
      }[];
      contact: {
        phone: string;
        email: string;
        hours: string;
      };
    };
    relatedProducts: {
      id: string;
      name: string;
      image: string;
      price: number;
      category: string;
    }[];
  }

const ProductPage: React.FC<{ product: ProductDetails }> = ({ product }) => {
  const [selectedImage, setSelectedImage] = useState<string>(
    product.images.find(img => img.type === 'main')?.url || ''
  );
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedVideo, setSelectedVideo] = useState(product.videos[0]?.youtubeId);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-gray-900 pt-10">
      {/* Top Navigation Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <span>Home</span>
            <ChevronRight size={16} />
            <span>Products</span>
            <ChevronRight size={16} />
            <span>{product.brand}</span>
            <ChevronRight size={16} />
            <span className="text-gray-900 font-medium">{product.name}</span>
          </div>
        </div>
      </div>

      {/* Main Product Section */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - Images and Videos */}
          <div>
            {/* Main Image */}
            <div className="bg-white rounded-lg overflow-hidden mb-4 border">
              <img
                src={selectedImage}
                alt={product.name}
                className="w-full h-[500px] object-contain"
              />
            </div>

            {/* Image Gallery */}
            <div className="grid grid-cols-5 gap-2 mb-6">
              {product.images.map((image) => (
                <button
                  key={image.id}
                  onClick={() => setSelectedImage(image.url)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 
                    ${selectedImage === image.url ? 'border-blue-500' : 'border-gray-200'}`}
                >
                  <img
                    src={image.url}
                    alt={image.alt}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>

            {/* Videos Section */}
            {product.videos.length > 0 && (
              <div className="bg-white rounded-lg border p-4 mb-6">
                <h3 className="text-lg font-semibold mb-4">Product Videos</h3>
                <div className="aspect-video mb-4">
                  <YouTube
                    videoId={selectedVideo}
                    className="w-full h-full"
                    opts={{
                      width: '100%',
                      height: '100%',
                      playerVars: { autoplay: 0 },
                    }}
                  />
                </div>
                {product.videos.length > 1 && (
                  <div className="grid grid-cols-4 gap-2">
                    {product.videos.map((video) => (
                      <button
                        key={video.id}
                        onClick={() => setSelectedVideo(video.youtubeId)}
                        className={`relative aspect-video rounded-lg overflow-hidden
                          ${selectedVideo === video.youtubeId ? 'ring-2 ring-blue-500' : ''}`}
                      >
                        <img
                          src={video.thumbnail}
                          alt={video.title}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right Column - Product Information */}
          <div>
            {/* Product Header */}
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {product.name}
              </h1>
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={20}
                      className={i < Math.floor(product.rating.average) 
                        ? 'text-yellow-400 fill-current' 
                        : 'text-gray-300'}
                    />
                  ))}
                  <span className="ml-2 text-sm text-gray-600">
                    ({product.rating.count} reviews)
                  </span>
                </div>
                <span className="text-gray-400">|</span>
                <span className="text-sm text-gray-600">
                  Model: {product.model}
                </span>
              </div>

              {/* Price Section */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <div className="flex items-baseline space-x-3">
                  <span className="text-3xl font-bold text-gray-900">
                    {formatPrice(product.price.current)}
                  </span>
                  {product.price.original && (
                    <span className="text-lg text-gray-500 line-through">
                      {formatPrice(product.price.original)}
                    </span>
                  )}
                  {product.price.discount && (
                    <span className="text-green-600 font-medium">
                      Save {product.price.discount}%
                    </span>
                  )}
                </div>
              </div>

              {/* Quick Features */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                {product.features.slice(0, 4).map((feature, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      <PenTool className="w-5 h-5 text-blue-500" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">
                        {feature.title}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Availability & Shipping */}
              <div className="space-y-4 mb-6">
                <div className="flex items-center space-x-2">
                  <Box className="w-5 h-5 text-green-500" />
                  <span className={`font-medium 
                    ${product.availability.status === 'in-stock' 
                      ? 'text-green-600' 
                      : 'text-red-600'}`}>
                    {product.availability.status === 'in-stock' 
                      ? 'In Stock' 
                      : 'Out of Stock'}
                  </span>
                  {product.availability.quantity && (
                    <span className="text-sm text-gray-600">
                      ({product.availability.quantity} units available)
                    </span>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <Truck className="w-5 h-5 text-blue-500" />
                  <span className="text-sm text-gray-600">
                    Free shipping on orders over $1000
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Shield className="w-5 h-5 text-blue-500" />
                  <span className="text-sm text-gray-600">
                    {product.warranty.duration} warranty
                  </span>
                </div>
              </div>

              {/* Add to Cart Section */}
              <div className="bg-white rounded-lg border p-4 mb-6">
                <button className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg 
                  font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 
                  focus:ring-blue-500 focus:ring-offset-2">
                  Add to Cart
                </button>
              </div>
            </div>

            {/* Technical Specifications Preview */}
            <div className="bg-white rounded-lg border p-4 mb-6">
              <h3 className="text-lg font-semibold mb-4">Quick Specifications</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <p className="text-sm">
                    <span className="font-medium">Dimensions: </span>
                    {product.technicalDetails.dimensions.length} x 
                    {product.technicalDetails.dimensions.width} x 
                    {product.technicalDetails.dimensions.height} 
                    {product.technicalDetails.dimensions.unit}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Weight: </span>
                    {product.technicalDetails.weight.value} 
                    {product.technicalDetails.weight.unit}
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm">
                    <span className="font-medium">Power: </span>
                    {product.technicalDetails.powerRequirements.voltage}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Certification: </span>
                    {product.technicalDetails.certifications.join(', ')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Information Tabs */}
        <div className="mt-12">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8">
              {['overview', 'specifications', 'installation', 'downloads', 'support'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm
                    ${activeTab === tab
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </nav>
          </div>

          <div className="py-8">
            {activeTab === 'overview' && (
              <div className="space-y-8">
                {/* Product Description */}
                <section>
                  <h2 className="text-2xl font-bold mb-4">Product Overview</h2>
                  <div className="prose max-w-none">
                    <p className="text-gray-600">{product.description}</p>
                  </div>
                </section>

                {/* Features Grid */}
                <section>
                  <h3 className="text-xl font-bold mb-4">Key Features</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {product.features.map((feature, index) => (
                      <div key={index} className="bg-white rounded-lg border p-4">
                        <h4 className="font-medium text-lg mb-2">{feature.title}</h4>
                        <p className="text-gray-600">{feature.description}</p>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Technical Diagrams */}
                <section>
                  <h3 className="text-xl font-bold mb-4">Technical Diagrams</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {product.diagrams.map((diagram) => (
                      <div key={diagram.id} className="bg-white rounded-lg border overflow-hidden">
                        <img
                          src={diagram.url}
                          alt={diagram.title}
                          className="w-full h-64 object-contain"
                        />
                        <div className="p-4">
                          <h4 className="font-medium mb-2">{diagram.title}</h4>
                          <p className="text-sm text-gray-600">{diagram.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Box Contents */}
                <section>
                  <h3 className="text-xl font-bold mb-4">What's in the Box</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white rounded-lg border p-4">
                      <h4 className="font-medium mb-3">Main Components</h4>
                      <ul className="space-y-2">
                        {product.boxContents.mainItems.map((item, index) => (
                          <li key={index} className="flex items-center text-gray-600">
                            <Box className="w-4 h-4 mr-2 text-blue-500" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-white rounded-lg border p-4">
                      <h4 className="font-medium mb-3">Accessories</h4>
                      <ul className="space-y-2">
                        {product.boxContents.accessories.map((item, index) => (
                          <li key={index} className="flex items-center text-gray-600">
                            <PenTool className="w-4 h-4 mr-2 text-blue-500" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-white rounded-lg border p-4">
                      <h4 className="font-medium mb-3">Documentation</h4>
                      <ul className="space-y-2">
                        {product.boxContents.documents.map((item, index) => (
                          <li key={index} className="flex items-center text-gray-600">
                            <Download className="w-4 h-4 mr-2 text-blue-500" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </section>
              </div>
            )}

            {activeTab === 'specifications' && (
              <div className="space-y-8">
                {/* Technical Specifications */}
                {product.specifications.map((category, index) => (
                  <section key={index}>
                    <h3 className="text-xl font-bold mb-4">{category.category}</h3>
                    <div className="bg-white rounded-lg border overflow-hidden">
                      <table className="min-w-full divide-y divide-gray-200">
                        <tbody className="divide-y divide-gray-200">
                          {category.items.map((spec, i) => (
                            <tr key={i} className={i % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                              <td className="px-6 py-4 w-1/3 text-sm font-medium text-gray-900">
                                {spec.label}
                              </td>
                              <td className="px-6 py-4 text-sm text-gray-600">
                                {spec.value}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </section>
                ))}

                {/* Certifications */}
                <section>
                  <h3 className="text-xl font-bold mb-4">Certifications</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {product.certification.map((cert, index) => (
                      <div key={index} className="bg-white rounded-lg border p-4 flex items-center justify-center">
                        <span className="text-gray-600">{cert}</span>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            )}

            {activeTab === 'installation' && (
              <div className="space-y-8">
                {/* Installation Overview */}
                <section>
                  <div className="bg-white rounded-lg border p-6 mb-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="text-center">
                        <Clock className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                        <h4 className="font-medium">Installation Time</h4>
                        <p className="text-gray-600">{product.installation.time}</p>
                      </div>
                      <div className="text-center">
                        <PenTool className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                        <h4 className="font-medium">Difficulty Level</h4>
                        <p className="text-gray-600 capitalize">{product.installation.difficulty}</p>
                      </div>
                      <div className="text-center">
                        <Box className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                        <h4 className="font-medium">Tools Required</h4>
                        <p className="text-gray-600">{product.installation.tools.length} tools needed</p>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Installation Steps */}
                <section>
                  <h3 className="text-xl font-bold mb-4">Installation Guide</h3>
                  <div className="space-y-6">
                    {product.installation.steps.map((step) => (
                      <div key={step.order} className="bg-white rounded-lg border overflow-hidden">
                        <div className="p-6">
                          <div className="flex items-start">
                            <div className="flex-shrink-0 bg-blue-500 rounded-full w-8 h-8 flex items-center justify-center text-white font-medium">
                              {step.order}
                            </div>
                            <div className="ml-4">
                              <h4 className="text-lg font-medium mb-2">{step.title}</h4>
                              <p className="text-gray-600">{step.description}</p>
                            </div>
                          </div>
                          {step.image && (
                            <img
                              src={step.image}
                              alt={`Step ${step.order}`}
                              className="mt-4 w-full h-48 object-cover rounded-lg"
                            />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Required Tools */}
                <section>
                  <h3 className="text-xl font-bold mb-4">Required Tools</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {product.installation.tools.map((tool, index) => (
                      <div key={index} className="bg-white rounded-lg border p-4 flex items-center">
                        <PenTool className="w-5 h-5 text-blue-500 mr-2" />
                        <span className="text-gray-600">{tool}</span>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            )}

            {activeTab === 'downloads' && (
              <div className="space-y-8">
                {product.downloads.map((category, index) => (
                  <section key={index}>
                    <h3 className="text-xl font-bold mb-4">{category.category}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {category.files.map((file, fileIndex) => (
                        <a
                          key={fileIndex}
                          href={file.url}
                          className="bg-white rounded-lg border p-4 flex items-center hover:bg-gray-50"
                        >
                          <Download className="w-6 h-6 text-blue-500 mr-3" />
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900">{file.name}</h4>
                            <p className="text-sm text-gray-500">
                              {file.type} • {file.size}
                            </p>
                          </div>
                        </a>
                      ))}
                    </div>
                  </section>
                ))}
              </div>
            )}

            {activeTab === 'support' && (
              <div className="space-y-8">
                {/* Support Contact */}
                <section>
                  <h3 className="text-xl font-bold mb-4">Contact Support</h3>
                  <div className="bg-white rounded-lg border p-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="text-center">
                        <div className="font-medium mb-2">Phone Support</div>
                        <p className="text-blue-600">{product.support.contact.phone}</p>
                      </div>
                      <div className="text-center">
                        <div className="font-medium mb-2">Email Support</div>
                        <p className="text-blue-600">{product.support.contact.email}</p>
                      </div>
                      <div className="text-center">
                        <div className="font-medium mb-2">Support Hours</div>
                        <p className="text-gray-600">{product.support.contact.hours}</p>
                      </div>
                    </div>
                  </div>
                </section>

                {/* FAQs */}
                <section>
                  <h3 className="text-xl font-bold mb-4">Frequently Asked Questions</h3>
                  <div className="space-y-4">
                    {product.support.faq.map((item, index) => (
                      <div key={index} className="bg-white rounded-lg border p-4">
                        <h4 className="font-medium text-gray-900 mb-2">{item.question}</h4>
                        <p className="text-gray-600">{item.answer}</p>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Video Guides */}
                {product.support.videoGuides.length > 0 && (
                  <section>
                    <h3 className="text-xl font-bold mb-4">Video Guides</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {product.support.videoGuides.map((videoUrl, index) => (
                        <div key={index} className="aspect-video">
                          <iframe
                            src={videoUrl}
                            className="w-full h-full rounded-lg"
                            allowFullScreen
                          />
                        </div>
                      ))}
                    </div>
                  </section>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Related Products</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {product.relatedProducts.map((item) => (
              <div key={item.id} className="bg-white rounded-lg border overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-medium mb-2">{item.name}</h3>
                  <p className="text-blue-600 font-medium">
                    {formatPrice(item.price)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProductPage;
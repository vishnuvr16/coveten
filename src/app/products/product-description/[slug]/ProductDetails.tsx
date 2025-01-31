// mockProductData.ts
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
  
export const mockProduct: ProductDetails = {
    id: "prod-001",
    name: "Professional Grade Widget 3000",
    brand: "TechCorp",
    model: "WDG-3000-PRO",
    description: "The Widget 3000 is our flagship professional-grade device, featuring state-of-the-art technology and unparalleled performance.",
    shortDescription: "Professional-grade widget with advanced features",
    price: {
      current: 999.99,
      original: 1299.99,
      discount: 23
    },
    availability: {
      status: 'in-stock',
      quantity: 50
    },
    rating: {
      average: 4.5,
      count: 127
    },
    certification: ["CE", "ISO 9001", "RoHS", "Energy Star"],
    warranty: {
      duration: "2 years",
      coverage: "Full parts and labor"
    },
    shipping: {
      methods: [
        {
          name: "Standard Shipping",
          duration: "3-5 business days",
          price: 0
        },
        {
          name: "Express Shipping",
          duration: "1-2 business days",
          price: 25
        }
      ]
    },
    images: [
      {
        id: "img-001",
        url: "/api/placeholder/800/800",
        alt: "Widget 3000 Front View",
        type: "main"
      },
      {
        id: "img-002",
        url: "/api/placeholder/800/800",
        alt: "Widget 3000 Side View",
        type: "gallery"
      },
      {
        id: "img-003",
        url: "/api/placeholder/800/800",
        alt: "Widget 3000 Back View",
        type: "gallery"
      }
    ],
    videos: [
      {
        id: "vid-001",
        youtubeId: "dQw4w9WgXcQ",
        title: "Widget 3000 Overview",
        thumbnail: "/api/placeholder/320/180"
      }
    ],
    features: [
      {
        title: "High Performance",
        description: "Advanced processing capabilities for maximum efficiency",
        icon: "cpu"
      },
      {
        title: "Energy Efficient",
        description: "Uses 50% less power than previous models",
        icon: "zap"
      }
    ],
    specifications: [
      {
        category: "Physical Specifications",
        items: [
          {
            label: "Dimensions",
            value: "12 x 8 x 3 inches"
          },
          {
            label: "Weight",
            value: "2.5 lbs"
          }
        ]
      }
    ],
    technicalDetails: {
      dimensions: {
        length: 12,
        width: 8,
        height: 3,
        unit: "inches"
      },
      weight: {
        value: 2.5,
        unit: "lbs"
      },
      powerRequirements: {
        voltage: "110-240V",
        frequency: "50/60Hz",
        consumption: "45W"
      },
      materials: ["Aluminum", "Steel", "ABS Plastic"],
      certifications: ["CE", "RoHS"]
    },
    diagrams: [
      {
        id: "diag-001",
        url: "/api/placeholder/800/600",
        title: "Component Layout",
        description: "Detailed view of internal components"
      }
    ],
    prerequisites: {
      required: ["Power outlet", "Internet connection"],
      recommended: ["Backup power supply"]
    },
    installation: {
      difficulty: "medium",
      time: "30-45 minutes",
      steps: [
        {
          order: 1,
          title: "Unbox the device",
          description: "Carefully remove all components from packaging",
          image: "/api/placeholder/800/600"
        }
      ],
      tools: ["Phillips screwdriver", "Level"]
    },
    boxContents: {
      mainItems: ["Widget 3000 Unit", "Power Supply"],
      accessories: ["Mounting Brackets", "Cable Kit"],
      documents: ["User Manual", "Quick Start Guide", "Warranty Card"]
    },
    downloads: [
      {
        category: "Documentation",
        files: [
          {
            name: "User Manual",
            url: "#",
            type: "PDF",
            size: "2.5 MB"
          }
        ]
      }
    ],
    support: {
      manual: "https://example.com/manual",
      videoGuides: ["https://example.com/video1"],
      faq: [
        {
          question: "How do I set up the Widget 3000?",
          answer: "Follow the quick start guide included in the box for basic setup instructions."
        }
      ],
      contact: {
        phone: "1-800-WIDGET",
        email: "support@widget.com",
        hours: "Mon-Fri 9AM-5PM EST"
      }
    },
    relatedProducts: [
      {
        id: "prod-002",
        name: "Widget 2000",
        image: "/api/placeholder/400/400",
        price: 799.99,
        category: "Professional Tools"
      }
    ]
  };
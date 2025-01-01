"use client";
import { IRootState } from "@/store";
import Link from "next/link";
import React from "react";
import { AiOutlineEye } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { useSelector } from "react-redux";


type HeroItem = {
  id: string;
  title: string;
  image: string;
};

type NewsContent = {
  id: string;
  category: string;
  mainImage: string;
  mainHeading: string;
  mainDescription: string;
  articles: { id: string; heading: string; image: string }[];
};

type Ad = {
  id: string;
  title: string;
  images: string;
};

type BenefitInfo = {
  tagline: string[];
  hasHeroitems: {
    hasLargeHeros: HeroItem[];
    hasSmallHeros: HeroItem[];
  };
  hasNewscontent: NewsContent[];
  hasAds: Ad[];
};

type Category = {
  id: string;
  name: string;
};

const sampleBenefitInfo: BenefitInfo = {
  tagline: ["Empowering communities", "Shaping the future"],
  hasHeroitems: {
    hasLargeHeros: [
      { id: "1", title: "Main Event Banner", image: "large1.jpg" },
      { id: "2", title: "Seasonal Highlights", image: "large2.jpg" },
    ],
    hasSmallHeros: [
      { id: "3", title: "Weekly Deals", image: "small1.jpg" },
      { id: "4", title: "Exclusive Offers", image: "small2.jpg" },
    ],
  },
  hasNewscontent: [
    {
      id: "1",
      category: "Technology",
      mainImage: "tech.jpg",
      mainHeading: "AI Advances in 2024",
      mainDescription: "Exploring the impact of artificial intelligence.",
      articles: [
        { id: "1", heading: "AI in Healthcare", image: "ai_health.jpg" },
        { id: "2", heading: "AI in Education", image: "ai_edu.jpg" },
      ],
    },
    {
      id: "2",
      category: "Environment",
      mainImage: "env.jpg",
      mainHeading: "Climate Change Actions",
      mainDescription: "Efforts to reduce carbon footprints.",
      articles: [],
    },
  ],
  hasAds: [
    { id: "1", title: "Ad 1", images: "ad1.jpg" },
    { id: "2", title: "Ad 2", images: "ad2.jpg" },
  ],
};

const sampleCategories: Category[] = [
  { id: "1", name: "Technology" },
  { id: "2", name: "Environment" },
];

const ComponentsAppsBenefits: React.FC = () => {
  const themeConfig = useSelector((state: IRootState) => state.themeConfig);


  const handleDelete = (section: string) => {
    alert(`${section} deleted successfully!`);
  };

  const sharedButtonStyles =
  "p-2 rounded-full text-center hover:bg-green-200 inline-flex items-center justify-center";

  const semidark = useSelector((state: IRootState) => state.themeConfig.semidark);

  return (
    <div className="min-h-screen" style={{backgroundColor: themeConfig.backgroundColor}}>
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-black mb-8" style={{color: themeConfig.primaryColor}}>
          Add Benefits
        </h1>
        <div className="space-y-6">
          {/* Overview Section */}
          <div className={`${semidark ? 'dark' : 'bg-gray-300'} shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow`}>
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-800">Overview</h2>
  
              <div className="space-x-4">
                <Link
                  href="benefits/overview"
                  className={`${sharedButtonStyles} bg-green-100 text-green-600`}
                >
                  <AiOutlineEye />
                </Link>
                <button
                  className={`${sharedButtonStyles} bg-red-100 text-red-600 hover:bg-red-200`}
                  onClick={() => handleDelete("Overview")}
                >
                  <MdDelete />
                </button>
              </div>
            </div>
            <div className="mt-4 text-gray-600 space-y-1">
              {sampleBenefitInfo.tagline.map((tagline, index) => (
                <p key={index}>{tagline}</p>
              ))}
            </div>
          </div>

          {/* Hero Banners Section */}
          <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-800">
                Hero Banners
              </h2>
              <div className="space-x-4">
                <Link
                  href="benefits/herobanner"
                  className={`${sharedButtonStyles} bg-green-100 text-green-600`}
                >
                  <AiOutlineEye />
                </Link>
                <button
                  className="p-2 rounded-full bg-red-100 text-red-600 hover:bg-red-200"
                  onClick={() => handleDelete("Hero Banners")}
                >
                  <MdDelete />
                </button>
              </div>
            </div>
            <div className="mt-4 space-y-2">
              <div>
                <h3 className="text-gray-700 font-medium">Large Banners:</h3>
                <ul className="text-gray-600">
                  {sampleBenefitInfo.hasHeroitems.hasLargeHeros.map((hero) => (
                    <li key={hero.id}>{hero.title}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-gray-700 font-medium">Small Banners:</h3>
                <ul className="text-gray-600">
                  {sampleBenefitInfo.hasHeroitems.hasSmallHeros.map((hero) => (
                    <li key={hero.id}>{hero.title}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Trending News Section */}
          <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-800">
                Trending News
              </h2>
              <div className="space-x-4">
                <Link
                  href="benefits/trendingnews"
                  className={`${sharedButtonStyles} bg-green-100 text-green-600`}
                >
                  <AiOutlineEye />
                </Link>
                    <button
                      className="p-2 rounded-full bg-red-100 text-red-600 hover:bg-red-200"
                    >
                      <MdDelete />
                    </button>
              </div>
            </div>
            <div className="mt-4">
              {sampleCategories.map((category) => (
                <p
                  key={category.id}
                  className="text-gray-600 flex justify-between"
                >
                  <span>{category.name}</span>
                  <span>
                    {sampleBenefitInfo.hasNewscontent.some(
                      (content) => content.category === category.name
                    )
                      ? "Data exists"
                      : "Data not exists"}
                  </span>
                </p>
              ))}
            </div>
          </div>

          {/* Advertisements Section */}
          <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-800">
                Advertisements
              </h2>
              <div className="space-x-4">
                <Link
                  href="benefits/advertisements"
                  className={`${sharedButtonStyles} bg-green-100 text-green-600`}
                >
                  <AiOutlineEye />
                </Link>
                <button
                  className="p-2 rounded-full bg-red-100 text-red-600 hover:bg-red-200"
                  onClick={() => handleDelete("Advertisements")}
                >
                  <MdDelete />
                </button>
              </div>
            </div>
            <div className="mt-4 space-y-1 text-gray-600">
              {sampleBenefitInfo.hasAds.map((ad) => (
                <p key={ad.id}>{ad.title}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComponentsAppsBenefits;

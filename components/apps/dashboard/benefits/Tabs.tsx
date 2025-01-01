'use client';
import React, { useState, Dispatch, SetStateAction } from 'react';

// Define prop types
type TabComponentProps = {
  updateBenefitPage: (data: any) => Promise<void>;
  setCurrentTab: Dispatch<SetStateAction<number>>;
  benefitInfo: any;
  setBenefitInfo: Dispatch<SetStateAction<any>>;
  createBenefitPage: (data: any) => Promise<void>;
  onComplete: () => void;
  handleHeroItemsSubmit?: () => void;
  handleNewsContentSubmit?: () => void;
  handleAdsSubmit?: () => void;
  setSelectedCategory?: Dispatch<SetStateAction<string>>;
  selectedCategory?: string;
  category?: { name: string; id: string }[];
};

// Individual tab components
const Overview: React.FC<TabComponentProps> = ({ updateBenefitPage }) => {
  return <div>Overview Content</div>;
};

const HeroBanner: React.FC<TabComponentProps> = ({ handleHeroItemsSubmit }) => {
  return <div>Hero Banner Content</div>;
};

const TrendingNews: React.FC<TabComponentProps> = ({
  selectedCategory,
  setSelectedCategory,
  category,
}) => {
  return <div>Trending News Content</div>;
};

const Advertisement: React.FC<TabComponentProps> = () => {
  return <div>Advertisement Content</div>;
};

// Tabs Component
const Tabs: React.FC<{
  updateBenefitPage: (data: any) => Promise<void>;
  setBenefitInfo: Dispatch<SetStateAction<any>>;
  benefitInfo: any;
  createBenefitPage: (data: any) => Promise<void>;
  onComplete: () => void;
  handleHeroItemsSubmit?: () => void;
  handleNewsContentSubmit?: () => void;
  handleAdsSubmit?: () => void;
  setSelectedCategory?: Dispatch<SetStateAction<string>>;
  selectedCategory?: string;
  category?: { name: string; id: string }[];
  onClose?: () => void;
}> = ({
  updateBenefitPage,
  setBenefitInfo,
  benefitInfo,
  createBenefitPage,
  onComplete,
  handleHeroItemsSubmit,
  handleNewsContentSubmit,
  handleAdsSubmit,
  setSelectedCategory,
  selectedCategory,
  category,
  onClose,
}) => {
  const [currentTab, setCurrentTab] = useState<number>(0);

  const tabs = [
    { id: 0, label: 'Overview', component: Overview },
    { id: 1, label: 'Hero Banners', component: HeroBanner },
    { id: 2, label: 'Trending News', component: TrendingNews },
    { id: 3, label: 'Advertisements', component: Advertisement },
  ];

  const TabContent = tabs[currentTab]?.component;

  return (
    <div className="w-full">
      {/* Tab buttons */}
      <div className="flex space-x-2 bg-gray-100 p-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setCurrentTab(tab.id)}
            className={`px-4 py-2 text-sm font-medium ${
              currentTab === tab.id ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="mt-4 p-4 border rounded">
        {TabContent && (
          <TabContent
            updateBenefitPage={updateBenefitPage}
            setCurrentTab={setCurrentTab}
            benefitInfo={benefitInfo}
            setBenefitInfo={setBenefitInfo}
            createBenefitPage={createBenefitPage}
            onComplete={onComplete}
            handleHeroItemsSubmit={handleHeroItemsSubmit}
            handleNewsContentSubmit={handleNewsContentSubmit}
            handleAdsSubmit={handleAdsSubmit}
            setSelectedCategory={setSelectedCategory}
            selectedCategory={selectedCategory}
            category={category}
          />
        )}
      </div>
    </div>
  );
};

export default Tabs;

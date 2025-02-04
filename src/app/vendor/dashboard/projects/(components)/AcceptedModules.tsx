import React, { useState } from 'react';

// Types
interface Module {
  id: string;
  ticket: string;
  title: string;
  status: 'NEW' | 'ACCEPTED' | 'UNDER_REVIEW' | 'COMPLETED' | 'REJECTED';
  description?: string;
  files?: string[];
  isViewed?: boolean;
  rejectedReason?: string;
  createdAt: string;
}

interface TabProps {
  label: string;
  isSelected: boolean;
  onClick: () => void;
}

// Custom Tab Component
const CustomTab: React.FC<TabProps> = ({ label, isSelected, onClick }) => (
  <button
    onClick={onClick}
    className={`py-2 px-8 mr-3 transition-all ${
      isSelected 
        ? 'border-b-2 border-blue-500 text-blue-600 font-medium'
        : 'text-gray-600 hover:text-gray-800 hover:border-b-2 hover:border-gray-300'
    }`}
  >
    {label}
  </button>
);

// Module Card Component
interface ModuleCardProps {
  module: Module;
  onAction?: (action: string, moduleId: string) => void;
  actionButtons?: boolean;
}

const ModuleCard: React.FC<ModuleCardProps> = ({ module, onAction, actionButtons = false }) => (
  <div className={`
    p-4 mb-4 rounded-lg border transition-all
    ${module.isViewed ? 'bg-white' : 'bg-blue-50'}
    hover:shadow-md
  `}>
    <div className="flex justify-between items-center">
      <div>
        <span className="text-sm text-gray-500">#{module.ticket}</span>
        <h3 className="text-lg font-medium mt-1">{module.title}</h3>
      </div>
      <div className={`
        px-3 py-1 rounded-full text-sm
        ${getStatusColor(module.status)}
      `}>
        {module.status}
      </div>
    </div>
    {actionButtons && (
      <div className="mt-4 flex gap-2">
        <button 
          onClick={() => onAction?.('view', module.id)}
          className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded transition-colors"
        >
          View Details
        </button>
        <button 
          onClick={() => onAction?.('accept', module.id)}
          className="px-4 py-2 bg-green-500 text-white hover:bg-green-600 rounded transition-colors"
        >
          Accept
        </button>
        <button 
          onClick={() => onAction?.('reject', module.id)}
          className="px-4 py-2 bg-red-500 text-white hover:bg-red-600 rounded transition-colors"
        >
          Reject
        </button>
      </div>
    )}
  </div>
);

// Helper function for status colors
function getStatusColor(status: Module['status']) {
  switch (status) {
    case 'NEW': return 'bg-blue-100 text-blue-800';
    case 'ACCEPTED': return 'bg-yellow-100 text-yellow-800';
    case 'UNDER_REVIEW': return 'bg-purple-100 text-purple-800';
    case 'COMPLETED': return 'bg-green-100 text-green-800';
    case 'REJECTED': return 'bg-red-100 text-red-800';
  }
}

// Main Tabs Component
const ModuleTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [modules] = useState<Module[]>(mockModules); 

  const tabs = ['New Modules', 'Accepted', 'Under Review', 'Completed'];

  const handleAction = (action: string, moduleId: string) => {
    console.log(`Action ${action} on module ${moduleId}`);
   
  };

  const filteredModules = modules.filter(module => {
    switch (activeTab) {
      case 0: return module.status === 'NEW';
      case 1: return module.status === 'ACCEPTED';
      case 2: return module.status === 'UNDER_REVIEW';
      case 3: return module.status === 'COMPLETED';
      default: return true;
    }
  });

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="border-b mb-6">
        {tabs.map((tab, index) => (
          <CustomTab
            key={tab}
            label={tab}
            isSelected={activeTab === index}
            onClick={() => setActiveTab(index)}
          />
        ))}
      </div>
      
      <div className="space-y-4">
        {filteredModules.map(module => (
          <ModuleCard
            key={module.id}
            module={module}
            onAction={handleAction}
            actionButtons={activeTab === 0}
          />
        ))}
        {filteredModules.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No modules found in this category
          </div>
        )}
      </div>
    </div>
  );
};

const mockModules: Module[] = [
  {
    id: '1',
    ticket: 'MOD-001',
    title: 'Integration Module',
    status: 'NEW',
    description: 'New integration module for API handling',
    isViewed: false,
    createdAt: new Date().toISOString()
  },
];

export default ModuleTabs;
"use client";
import React, { useState } from 'react';
import { Trash2, Eye, Filter } from 'lucide-react';

// TypeScript interfaces
interface Category {
  id: number;
  name: string;
  type: CategoryType;
}

type CategoryType = 'service' | 'solution' | 'product' | 'event';

const CategoriesPage = () => {
  const [activeTab, setActiveTab] = useState<'data' | 'addNew'>('data');
  const [filterType, setFilterType] = useState<CategoryType | 'all'>('all');
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newCategoryType, setNewCategoryType] = useState<CategoryType | ''>('');

  // Sample data
  const [categories, setCategories] = useState<Category[]>([
    { id: 1, name: 'Web Development', type: 'service' },
    { id: 2, name: 'Cloud Storage', type: 'solution' },
    { id: 3, name: 'Mobile App', type: 'product' },
    { id: 4, name: 'Tech Conference', type: 'event' },
  ]);

  const categoryTypes: CategoryType[] = ['service', 'solution', 'product', 'event'];

  const filteredCategories = filterType === 'all' 
    ? categories 
    : categories.filter(cat => cat.type === filterType);

  const handleDelete = (id: number): void => {
    setCategories(categories.filter(cat => cat.id !== id));
  };

  const handleAddCategory = (): void => {
    if (newCategoryName && newCategoryType) {
      const newCategory: Category = {
        id: categories.length + 1,
        name: newCategoryName,
        type: newCategoryType,
      };
      setCategories([...categories, newCategory]);
      setNewCategoryName('');
      setNewCategoryType('');
      setActiveTab('data');
    }
  };

  return (
    <div className="p-6 mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Categories</h1>
        <div className="space-x-2">
          <button 
            className={`px-4 py-2 rounded-md ${
              activeTab === 'data' 
                ? 'bg-blue-500 text-white' 
                : 'border border-gray-300 text-gray-700'
            }`}
            onClick={() => setActiveTab('data')}
          >
            Data
          </button>
          <button 
            className={`px-4 py-2 rounded-md ${
              activeTab === 'addNew' 
                ? 'bg-blue-500 text-white' 
                : 'border border-gray-300 text-gray-700'
            }`}
            onClick={() => setActiveTab('addNew')}
          >
            Add New
          </button>
        </div>
      </div>

      {activeTab === 'data' && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Categories List</h2>
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-gray-500" />
                <select
                  className="border border-gray-300 rounded-md px-3 py-1.5 text-sm"
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value as CategoryType | 'all')}
                >
                  <option value="all">All Types</option>
                  {categoryTypes.map(type => (
                    <option key={type} value={type}>
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className="p-4">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2 text-sm font-semibold">S.No</th>
                    <th className="text-left p-2 text-sm font-semibold">Name</th>
                    <th className="text-left p-2 text-sm font-semibold">Type</th>
                    <th className="text-left p-2 text-sm font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCategories.map((category, index) => (
                    <tr key={category.id} className="border-b">
                      <td className="p-2">{index + 1}</td>
                      <td className="p-2">{category.name}</td>
                      <td className="p-2 capitalize">{category.type}</td>
                      <td className="p-2">
                        <div className="flex gap-2">
                          <button className="p-1 hover:bg-gray-100 rounded-md">
                            <Eye className="h-4 w-4 text-gray-600" />
                          </button>
                          <button 
                            className="p-1 hover:bg-gray-100 rounded-md"
                            onClick={() => handleDelete(category.id)}
                          >
                            <Trash2 className="h-4 w-4 text-gray-600" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'addNew' && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold">Add New Category</h2>
          </div>
          <div className="p-4">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  placeholder="Enter category name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Type</label>
                <select
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  value={newCategoryType}
                  onChange={(e) => setNewCategoryType(e.target.value as CategoryType)}
                >
                  <option value="">Select category type</option>
                  {categoryTypes.map(type => (
                    <option key={type} value={type}>
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
              <button 
                className={`w-full px-4 py-2 rounded-md ${
                  !newCategoryName || !newCategoryType
                    ? 'bg-gray-300 cursor-not-allowed'
                    : 'bg-blue-500 hover:bg-blue-600 text-white'
                }`}
                onClick={handleAddCategory}
                disabled={!newCategoryName || !newCategoryType}
              >
                Add Category
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoriesPage;
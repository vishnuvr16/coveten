"use client"
import React, { useState } from 'react';
import { Eye, Trash2, Plus } from 'lucide-react';

interface NetworkSetting {
  id: number;
  heading: string;
  subContents: SubContent[];
}

interface SubContent {
  id: number;
  content: string;
}

const WhatWeDoPage = () => {
  const [activeTab, setActiveTab] = useState<'data' | 'add'>('data');
  const [settings, setSettings] = useState<NetworkSetting[]>([]);
  const [newSetting, setNewSetting] = useState<NetworkSetting>({
    id: 1,
    heading: '',
    subContents: [{ id: 1, content: '' }]
  });

  const handleTabChange = (tab: 'data' | 'add') => {
    setActiveTab(tab);
    // Reset the form when switching to add tab
    if (tab === 'add') {
      setNewSetting({
        id: settings.length + 1,
        heading: '',
        subContents: [{ id: 1, content: '' }]
      });
    }
  };

  const handleHeadingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewSetting({
      ...newSetting,
      heading: e.target.value
    });
  };

  const handleSubContentChange = (id: number, value: string) => {
    setNewSetting({
      ...newSetting,
      subContents: newSetting.subContents.map(item =>
        item.id === id ? { ...item, content: value } : item
      )
    });
  };

  const addSubContent = () => {
    const newId = newSetting.subContents.length > 0 
      ? Math.max(...newSetting.subContents.map(item => item.id)) + 1 
      : 1;
    
    setNewSetting({
      ...newSetting,
      subContents: [...newSetting.subContents, { id: newId, content: '' }]
    });
  };

  const removeSubContent = (id: number) => {
    // Only allow removal if there's more than one subcontent
    if (newSetting.subContents.length > 1) {
      setNewSetting({
        ...newSetting,
        subContents: newSetting.subContents.filter(item => item.id !== id)
      });
    }
  };

  const handleAddSetting = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate that heading and at least one subcontent is filled
    if (newSetting.heading.trim() && newSetting.subContents.some(sc => sc.content.trim())) {
      setSettings([...settings, newSetting]);
      // Reset form
      setNewSetting({
        id: settings.length + 2,
        heading: '',
        subContents: [{ id: 1, content: '' }]
      });
      setActiveTab('data');
    }
  };

  const handleDeleteSetting = (id: number) => {
    setSettings(settings.filter(setting => setting.id !== id));
  };

  return (
    <div className="p-6 mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Service Network Settings</h1>
        <div className="flex gap-2">
          <button
            onClick={() => handleTabChange('data')}
            className={`px-4 py-2 rounded-t-lg transition-colors ${
              activeTab === 'data'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            Data
          </button>
          <button
            onClick={() => handleTabChange('add')}
            className={`px-4 py-2 rounded-t-lg transition-colors ${
              activeTab === 'add'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            Add New
          </button>
        </div>
      </div>

      {activeTab === 'data' ? (
        <div className="bg-white rounded-lg shadow">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">S.No</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Heading</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {settings.map((setting, index) => (
                <tr key={setting.id}>
                  <td className="px-6 py-4 text-sm text-gray-900">{index + 1}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{setting.heading}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    <div className="flex gap-3">
                      <a href="details" className="text-blue-500 hover:text-blue-700">
                        <Eye size={20} />
                      </a>
                      <button
                        onClick={() => handleDeleteSetting(setting.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <form onSubmit={handleAddSetting} className="bg-white rounded-lg shadow p-6">
          <div className="mb-6">
            <label htmlFor="heading" className="block text-sm font-medium text-gray-700 mb-2">
              Heading
            </label>
            <input
              type="text"
              id="heading"
              value={newSetting.heading}
              onChange={handleHeadingChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-gray-700">Sub Contents</label>
              <button
                type="button"
                onClick={addSubContent}
                className="flex items-center gap-1 text-blue-500 hover:text-blue-700"
              >
                <Plus size={18} /> Add Sub Content
              </button>
            </div>
            
            {newSetting.subContents.map((subContent) => (
              <div key={subContent.id} className="flex gap-2">
                <input
                  type="text"
                  value={subContent.content}
                  onChange={(e) => handleSubContentChange(subContent.id, e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter sub content"
                  required
                />
                <button
                  type="button"
                  onClick={() => removeSubContent(subContent.id)}
                  className="text-red-500 hover:text-red-700 disabled:opacity-50"
                  disabled={newSetting.subContents.length === 1}
                >
                  <Trash2 size={20} />
                </button>
              </div>
            ))}
          </div>

          <button
            type="submit"
            className="mt-6 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
          >
            Add Setting
          </button>
        </form>
      )}
    </div>
  );
};

export default WhatWeDoPage;
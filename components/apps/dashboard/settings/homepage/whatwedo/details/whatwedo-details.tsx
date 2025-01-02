"use client"
import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

interface SubContent {
  id: number;
  content: string;
}

interface NetworkSettingDetails {
  heading: string;
  subContents: SubContent[];
}

const WhatWeDoDetailsPage = () => {
  const [details, setDetails] = useState<NetworkSettingDetails>({
    heading: '',
    subContents: [{ id: 1, content: '' }]
  });

  const handleHeadingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDetails({
      ...details,
      heading: e.target.value
    });
  };

  const handleSubContentChange = (id: number, value: string) => {
    setDetails({
      ...details,
      subContents: details.subContents.map(item =>
        item.id === id ? { ...item, content: value } : item
      )
    });
  };

  const addSubContent = () => {
    const newId = Math.max(...details.subContents.map(item => item.id)) + 1;
    setDetails({
      ...details,
      subContents: [...details.subContents, { id: newId, content: '' }]
    });
  };

  const removeSubContent = (id: number) => {
    if (details.subContents.length > 1) {
      setDetails({
        ...details,
        subContents: details.subContents.filter(item => item.id !== id)
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log('Submitted details:', details);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">WhatWeDo Details</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="heading" className="block text-sm font-medium text-gray-700 mb-2">
            Heading
          </label>
          <input
            type="text"
            id="heading"
            value={details.heading}
            onChange={handleHeadingChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-medium">Sub Contents</h2>
            <button
              type="button"
              onClick={addSubContent}
              className="flex items-center gap-2 text-blue-500 hover:text-blue-700"
            >
              <Plus size={20} /> Add Sub Content
            </button>
          </div>

          {details.subContents.map((subContent) => (
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
                className="text-red-500 hover:text-red-700"
                disabled={details.subContents.length === 1}
              >
                <Minus size={20} />
              </button>
            </div>
          ))}
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors"
        >
          Save Details
        </button>
      </form>
    </div>
  );
};

export default WhatWeDoDetailsPage;
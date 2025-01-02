"use client"
import React, { useState } from 'react';
import { Eye, Trash2 } from 'lucide-react';

interface HeroDetails {
  id: number;
  name: string;
  duration: string;
  certification: string;
}

const LearnItems: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'data' | 'add'>('data');
  const [heroes, setHeroes] = useState<HeroDetails[]>([
    { id: 1, name: 'ndt - ultrasonic testing', duration: 'short-term',certification: 'certificate' },
    { id: 2, name: 'ndt - visual inspection', duration: 'long-term', certification: 'certificate' },
    { id: 3, name: 'ndt - penetrant testing', duration: 'short-term', certification: 'certificate' },
  ]);
  const [newHeading, setNewHeading] = useState('');
  const [newDuration,setNewDuration] = useState('');
  const [newCertification,setNewCertifications] = useState('');

  const handleDelete = (id: number) => {
    setHeroes(heroes.filter(hero => hero.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    const newHero: HeroDetails = {
      id: heroes.length + 1,
      name: newHeading,
      duration: newDuration,
      certification: newCertification
    };
    setHeroes([...heroes, newHero]);
    setNewHeading('');
    setActiveTab('data');
  };

  return (
    <div className="p-6">
      {/* Header with Tabs */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Learn Items</h1>
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('data')}
            className={`px-4 py-2 rounded-t-lg transition-colors ${
              activeTab === 'data'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            Data
          </button>
          <button
            onClick={() => setActiveTab('add')}
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

      {/* Data Tab Content */}
      {activeTab === 'data' && (
        <div className="bg-white rounded-lg shadow">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">S.No</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Name</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Duration</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Certification</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {heroes.map((hero, index) => (
                <tr key={hero.id}>
                  <td className="px-6 py-4 text-sm text-gray-900">{index + 1}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{hero.name}</td>
                  <td className="px-6 py-4 text-sm">
                    <div className="flex gap-4">
                    <a href="hero/details" className="text-blue-500 hover:text-blue-700">
                        <Eye size={20} />
                      </a>
                      <Trash2 
                        className="w-5 h-5 text-red-500 cursor-pointer hover:text-red-700" 
                        onClick={() => handleDelete(hero.id)} 
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Add New Tab Content */}
      {activeTab === 'add' && (
        <div className="bg-white rounded-lg shadow p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
           
            <div>
              <label className="block text-sm font-medium text-gray-700">Title</label>
              <input
                type="text"
                value={newHeading}
                onChange={(e) => setNewHeading(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2"
              />
            </div>


            <div>
              <label className="block text-sm font-medium text-gray-700">Upload Image</label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
                <div className="space-y-1 text-center">
                  <div className="flex text-sm text-gray-600">
                    <label className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500">
                      <span>Upload a file</span>
                      <input
                        type="file"
                        className="sr-only"
                        accept="image/*"
                      />
                    </label>
                  </div>
                  <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                  {/* {newImage && (
                    <p className="text-sm text-green-500">Selected: {newImage.name}</p>
                  )} */}
                </div>
              </div>
            </div>

            

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Add New
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default LearnItems;
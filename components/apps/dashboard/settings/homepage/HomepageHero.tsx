"use client";
import React, { useState, ChangeEvent } from 'react';

interface Video {
  id: number;
  name: string;
}

const HomepageHero: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'data' | 'addNew'>('data');
  const [videos, setVideos] = useState<Video[]>([
    { id: 1, name: 'Video 1' },
    { id: 2, name: 'Video 2' }
  ]);
  const [newVideoName, setNewVideoName] = useState<string>('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleAddVideo = () => {
    if (!newVideoName.trim() || !selectedFile) {
      alert('Please fill in all fields');
      return;
    }

    const newVideo: Video = {
      id: videos.length + 1,
      name: newVideoName
    };

    setVideos([...videos, newVideo]);
    setNewVideoName('');
    setSelectedFile(null);
  };

  const handleDeleteVideo = (id: number) => {
    setVideos(videos.filter(video => video.id !== id));
  };

  const handleViewVideo = (id: number) => {
    // Implement view functionality
    console.log(`Viewing video ${id}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Video Settings</h1>
          <div className="space-x-4">
            <button
              onClick={() => setActiveTab('data')}
              className={`px-6 py-2 rounded-lg transition-all duration-300 ${
                activeTab === 'data'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Data
            </button>
            <button
              onClick={() => setActiveTab('addNew')}
              className={`px-6 py-2 rounded-lg transition-all duration-300 ${
                activeTab === 'addNew'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Add New
            </button>
          </div>
        </div>

        <div className="transition-all duration-300">
          {activeTab === 'data' && (
            <div className="animate-fadeIn">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="text-left p-4 border-b">Serial No</th>
                    <th className="text-left p-4 border-b">Name</th>
                    <th className="text-right p-4 border-b">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {videos.map((video) => (
                    <tr key={video.id} className="border-b hover:bg-gray-50">
                      <td className="p-4">{video.id}</td>
                      <td className="p-4">{video.name}</td>
                      <td className="p-4 text-right">
                        <button
                          onClick={() => handleViewVideo(video.id)}
                          className="text-blue-600 hover:text-blue-800 mr-4"
                        >
                          View
                        </button>
                        <button
                          onClick={() => handleDeleteVideo(video.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'addNew' && (
            <div className="animate-fadeIn space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Video Name
                </label>
                <input
                  type="text"
                  value={newVideoName}
                  onChange={(e) => setNewVideoName(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter video name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upload Video
                </label>
                <div className="flex items-center justify-center w-full">
                  <label className="w-full flex flex-col items-center px-4 py-6 bg-white text-gray-700 rounded-lg border-2 border-dashed border-gray-300 cursor-pointer hover:border-blue-500">
                    <svg
                      className="w-8 h-8 text-gray-400 mb-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      />
                    </svg>
                    <span className="text-sm text-gray-600">
                      {selectedFile ? selectedFile.name : 'Drop your video here or click to browse'}
                    </span>
                    <input
                      type="file"
                      className="hidden"
                      accept="video/*"
                      onChange={handleFileChange}
                    />
                  </label>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={handleAddVideo}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Add Video
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomepageHero;
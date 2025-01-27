"use client";
import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDropzone } from 'react-dropzone';
import { Search, Play, Trash2, Upload, X } from 'lucide-react';
import { useSelector } from 'react-redux';
import { IRootState } from '@/src/store';

interface Video {
  id: number;
  name: string;
  thumbnail?: string;
  size?: number;
  duration?: string;
  uploadDate: Date;
}

interface FileWithPreview extends File {
  preview?: string;
}

const HomepageVideo: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'data' | 'addNew'>('data');
  const [videos, setVideos] = useState<Video[]>([
    { id: 1, name: 'Product Launch Video', size: 25600000, duration: '5:30', uploadDate: new Date() },
    { id: 2, name: 'Company Overview', size: 15400000, duration: '3:45', uploadDate: new Date() }
  ]);
  const [newVideoName, setNewVideoName] = useState<string>('');
  const [selectedFile, setSelectedFile] = useState<FileWithPreview | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const themeConfig = useSelector((state: IRootState) => state.themeConfig);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles[0]) {
      setSelectedFile(Object.assign(acceptedFiles[0], {
        preview: URL.createObjectURL(acceptedFiles[0])
      }));
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'video/*': [] },
    maxSize: 100000000
  });

  const formatFileSize = (bytes: number = 0): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const filteredVideos = videos.filter(video => 
    video.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen text-gray-100" style={{backgroundColor: themeConfig.backgroundColor}}>
      
      <div className=" max-w-7xl p-3">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-12">
          <div>
            <h1 className="text-5xl font-bold  bg-clip-text text-transparent text-black" style={{color: themeConfig.primaryColor ? themeConfig.primaryColor : 'black'}}>
              Video Library
            </h1>
          </div>
          
          <div className="flex gap-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveTab('data')}
              className={`px-8 py-3 rounded-xl font-medium transition-all ${
                activeTab === 'data'
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-900/30'
                  : 'bg-gray-800 hover:bg-gray-700 text-gray-300'
              }`}
            >
              Data
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveTab('addNew')}
              className={`px-8 py-3 rounded-xl font-medium transition-all ${
                activeTab === 'addNew'
                  ? 'bg-gradient-to-r from-teal-600 to-emerald-600 text-white shadow-lg shadow-teal-900/30'
                  : 'bg-gray-800 hover:bg-gray-700 text-gray-300'
              }`}
            >
              Add new
            </motion.button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'data' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-8"
            >
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search videos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-gray-300 backdrop-blur-xl border border-gray-700 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredVideos.map((video) => (
                  <motion.div
                    key={video.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="group relative bg-gray-800/50 backdrop-blur-xl rounded-2xl overflow-hidden border border-gray-700/50 hover:border-purple-500/50 transition-all"
                  >
                    <div className="aspect-video bg-gray-900 relative">
                      {video.thumbnail ? (
                        <img src={video.thumbnail} alt={video.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Play className="w-16 h-16 text-gray-600" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="px-3 py-1 bg-gray-900/80 rounded-lg text-sm">
                          {video.duration}
                        </span>
                        <span className="px-3 py-1 bg-gray-900/80 rounded-lg text-sm">
                          {formatFileSize(video.size)}
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-6 space-y-4">
                      <div className="space-y-2">
                        <h3 className="text-xl font-semibold text-white line-clamp-1" style={{color: themeConfig.primaryColor ? themeConfig.primaryColor : 'gray-200'}}>{video.name}</h3>
                        <p className="text-sm text-gray-400" style={{color: themeConfig.primaryColor ? themeConfig.primaryColor : 'white'}}>
                          Uploaded {video.uploadDate.toLocaleDateString()}
                        </p>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="px-4 py-2 bg-purple-600/20 text-gray-200 rounded-lg hover:bg-purple-600/30 transition-colors"
                        >
                          Play Now
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setVideos(videos.filter(v => v.id !== video.id))}
                          className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-5 h-5" />
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'addNew' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="max-w-2xl mx-auto space-y-8"
            >
              <div className="space-y-4">
                <label className="block text-lg font-medium text-gray-200" style={{color: themeConfig.primaryColor ? themeConfig.primaryColor : 'black'}}>
                  Video Title
                </label>
                <input
                  type="text"
                  value={newVideoName}
                  onChange={(e) => setNewVideoName(e.target.value)}
                  className="w-full px-4 py-4 bg-gray-800/50 backdrop-blur-xl border border-gray-700 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500/50 transition-all"
                  placeholder="Enter a descriptive title"
                />
              </div>

              <div className="space-y-4">
                <label className="block text-lg font-medium text-gray-200" style={{color: themeConfig.primaryColor ? themeConfig.primaryColor : 'black'}}>
                  Video File
                </label>
                <div 
                  {...getRootProps()}
                  className={`relative border-2 border-dashed rounded-2xl transition-all ${
                    isDragActive 
                      ? 'border-teal-500 bg-teal-500/10' 
                      : 'border-gray-700 hover:border-gray-600'
                  }`}
                >
                  <input {...getInputProps()} />
                  
                  {selectedFile ? (
                    <div className="p-8">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <Play className="w-8 h-8 text-teal-400" />
                          <div>
                            <p className="text-white font-medium">{selectedFile.name}</p>
                            <p className="text-sm text-gray-400" style={{color: themeConfig.primaryColor ? themeConfig.primaryColor : 'gray-200'}}>{formatFileSize(selectedFile.size)}</p>
                          </div>
                        </div>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedFile(null);
                          }}
                          className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
                        >
                          <X className="w-5 h-5 text-gray-400" />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="p-12 text-center">
                      <Upload className="w-16 h-16 mx-auto mb-4 text-gray-500" />
                      <p className="text-lg text-gray-300">
                        Drop your video here or <span className="text-teal-400">browse</span>
                      </p>
                      <p className="mt-2 text-sm text-gray-500">
                        Maximum file size: 100MB
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    if (newVideoName && selectedFile) {
                      setVideos([...videos, {
                        id: Date.now(),
                        name: newVideoName,
                        size: selectedFile.size,
                        uploadDate: new Date(),
                        duration: '0:00'
                      }]);
                      setNewVideoName('');
                      setSelectedFile(null);
                    }
                  }}
                  disabled={!newVideoName || !selectedFile}
                  className={`w-full py-4 rounded-2xl font-medium transition-all ${
                    !newVideoName || !selectedFile
                      ? 'bg-gray-800 text-gray-500 cursor-not-allowed'
                      : 'bg-gradient-to-r from-teal-600 to-emerald-600 text-white shadow-lg shadow-teal-900/30 hover:shadow-xl hover:shadow-teal-900/40'
                  }`}
                >
                  Upload Video
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default HomepageVideo;
"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Theme Configuration
interface ThemeConfig {
  primary: string;
  secondary: string;
  background: string;
  text: string;
  accent: string;
  error: string;
  success: string;
  surface: string;
}

const defaultTheme: ThemeConfig = {
  primary: '#1a365d',
  secondary: '#2d3748',
  background: '#f7fafc',
  text: '#2d3748',
  accent: '#4299e1',
  error: '#e53e3e',
  success: '#38a169',
  surface: '#ffffff'
};

// Type Definitions
interface BenefitInfo {
  id?: string;
  tagline: string[];
}

// Sample Data
const sampleBenefitInfo: BenefitInfo = {
  id: '1',
  tagline: [
    'Transform your journey with us',
    'Discover endless possibilities',
    'Join our growing community'
  ]
};

interface TaglineItemProps {
  value: string;
  index: number;
  onUpdate: (index: number, value: string) => void;
  onDelete: (index: number) => void;
  theme: ThemeConfig;
}

const TaglineItem: React.FC<TaglineItemProps> = ({
  value,
  index,
  onUpdate,
  onDelete,
  theme
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(value);

  const handleSubmit = () => {
    if (inputValue.trim()) {
      onUpdate(index, inputValue);
      setIsEditing(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="flex items-center gap-3 mb-3"
    >
      {isEditing ? (
        <div className="flex-1 flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
            className="flex-1 p-2 rounded border focus:outline-none focus:ring-2"
            style={{ borderColor: theme.accent }}
            autoFocus
          />
          <button
            onClick={handleSubmit}
            className="px-3 py-1 rounded text-white"
            style={{ backgroundColor: theme.success }}
          >
            Save
          </button>
          <button
            onClick={() => {
              setInputValue(value);
              setIsEditing(false);
            }}
            className="px-3 py-1 rounded text-white"
            style={{ backgroundColor: theme.error }}
          >
            Cancel
          </button>
        </div>
      ) : (
        <div className="flex-1 flex items-center gap-2 p-3 rounded" style={{ backgroundColor: theme.surface }}>
          <span className="flex-1" style={{ color: theme.text }}>
            {value}
          </span>
          <button
            onClick={() => setIsEditing(true)}
            className="p-2 rounded hover:opacity-80"
            style={{ backgroundColor: theme.accent, color: 'white' }}
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(index)}
            className="p-2 rounded hover:opacity-80"
            style={{ backgroundColor: theme.error, color: 'white' }}
          >
            Delete
          </button>
        </div>
      )}
    </motion.div>
  );
};

const Overview: React.FC = () => {
  const [theme, setTheme] = useState<ThemeConfig>(defaultTheme);
  const [benefitInfo, setBenefitInfo] = useState<BenefitInfo>(sampleBenefitInfo);
  const [newTagline, setNewTagline] = useState('');
  const [isDirty, setIsDirty] = useState(false);
  const [notification, setNotification] = useState<{
    message: string;
    type: 'success' | 'error';
  } | null>(null);

  const showNotification = (message: string, type: 'success' | 'error') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleAddTagline = () => {
    if (newTagline.trim()) {
      setBenefitInfo(prev => ({
        ...prev,
        tagline: [...prev.tagline, newTagline.trim()]
      }));
      setNewTagline('');
      setIsDirty(true);
    }
  };

  const handleUpdateTagline = (index: number, value: string) => {
    const newTaglines = [...benefitInfo.tagline];
    newTaglines[index] = value;
    setBenefitInfo(prev => ({ ...prev, tagline: newTaglines }));
    setIsDirty(true);
  };

  const handleDeleteTagline = (index: number) => {
    setBenefitInfo(prev => ({
      ...prev,
      tagline: prev.tagline.filter((_, i) => i !== index)
    }));
    setIsDirty(true);
  };

  const handleSave = () => {
    // Simulate API call
    setTimeout(() => {
      showNotification('Changes saved successfully!', 'success');
      setIsDirty(false);
    }, 500);
  };

  return (
    <div className="min-h-screen p-6" style={{ backgroundColor: theme.background }}>
      <div className="max-w-3xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold mb-2" style={{ color: theme.primary }}>
            Overview
          </h1>
          <p className="text-lg" style={{ color: theme.secondary }}>
            Manage your benefit page taglines and content
          </p>
        </header>

        <div className="space-y-6">
          <section className="p-6 rounded-lg shadow-lg" style={{ backgroundColor: theme.surface }}>
            <h2 className="text-xl font-semibold mb-4" style={{ color: theme.primary }}>
              Taglines
            </h2>

            <div className="space-y-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newTagline}
                  onChange={(e) => setNewTagline(e.target.value)}
                  placeholder="Enter new tagline"
                  className="flex-1 p-2 rounded border focus:outline-none focus:ring-2"
                  style={{ borderColor: theme.accent }}
                  onKeyPress={(e) => e.key === 'Enter' && handleAddTagline()}
                />
                <button
                  onClick={handleAddTagline}
                  className="px-4 py-2 rounded text-white"
                  style={{ backgroundColor: theme.accent }}
                >
                  Add Tagline
                </button>
              </div>

              <AnimatePresence>
                {benefitInfo.tagline.map((tagline, index) => (
                  <TaglineItem
                    key={index}
                    value={tagline}
                    index={index}
                    onUpdate={handleUpdateTagline}
                    onDelete={handleDeleteTagline}
                    theme={theme}
                  />
                ))}
              </AnimatePresence>
            </div>
          </section>

          {isDirty && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="fixed bottom-6 right-6 flex gap-2"
            >
              <button
                onClick={handleSave}
                className="px-6 py-3 rounded-lg text-white font-medium shadow-lg"
                style={{ backgroundColor: theme.success }}
              >
                Save Changes
              </button>
            </motion.div>
          )}

          <AnimatePresence>
            {notification && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="fixed top-6 right-6 px-6 py-3 rounded-lg text-white font-medium shadow-lg"
                style={{
                  backgroundColor:
                    notification.type === 'success' ? theme.success : theme.error
                }}
              >
                {notification.message}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Overview;
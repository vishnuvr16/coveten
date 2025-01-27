"use client"
 import React, { useState } from 'react';
import { Eye, Trash2 } from 'lucide-react';
import { useSelector } from 'react-redux';
import { IRootState } from '@/src/store';
import Link from 'next/link';

// TypeScript interfaces
interface Capability {
  id: string;
  title: string;
  description: string;
}

interface ViewModalProps {
  capability: Capability;
  onClose: () => void;
}

interface DeleteModalProps {
  capability: Capability;
  onConfirm: () => void;
  onCancel: () => void;
}

const ViewModal: React.FC<ViewModalProps> = ({ capability, onClose }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
    <div className="bg-white rounded-lg p-6 max-w-lg w-full">
      <h2 className="text-xl font-bold mb-4">{capability.title}</h2>
      <p className="text-gray-600 mb-4">{capability.description}</p>
      <button
        onClick={onClose}
        className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
      >
        Close
      </button>
    </div>
  </div>
);

const DeleteModal: React.FC<DeleteModalProps> = ({ capability, onConfirm, onCancel }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
    <div className="bg-white rounded-lg p-6 max-w-md w-full">
      <h2 className="text-xl font-bold mb-2">Confirm Delete</h2>
      <p className="text-gray-600 mb-4">
        Are you sure you want to delete "{capability.title}"? This action cannot be undone.
      </p>
      <div className="flex gap-4 justify-end">
        <button
          onClick={onCancel}
          className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
);

const CapabilitiesListPage: React.FC = () => {
  // Sample data - replace with actual data fetching
  const [capabilities, setCapabilities] = useState<Capability[]>([
    {
      id: '1',
      title: 'Cloud Computing',
      description: 'Expertise in AWS, Azure, and Google Cloud Platform services.'
    },
    {
      id: '2',
      title: 'Machine Learning',
      description: 'Implementation of ML algorithms and deep learning models.'
    },
    {
      id: '3',
      title: 'DevOps',
      description: 'CI/CD pipeline setup and infrastructure automation.'
    }
  ]);

  const [viewCapability, setViewCapability] = useState<Capability | null>(null);
  const [deleteCapability, setDeleteCapability] = useState<Capability | null>(null);

  const handleDelete = (capability: Capability) => {
    setCapabilities(prev => prev.filter(cap => cap.id !== capability.id));
    setDeleteCapability(null);
  };

  const themeConfig = useSelector((state: IRootState) => state.themeConfig);

  return (
    <div className="container mx-auto" style={{backgroundColor: themeConfig.backgroundColor}}>
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="border-b border-gray-200 p-6">
          <h1 className="text-2xl font-bold text-gray-900">Capabilities List</h1>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Serial No.
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {capabilities.map((capability, index) => (
                <tr key={capability.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {capability.title}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end gap-2">
                      <Link href="capabilities/details"
                        className="p-2 text-blue-600 hover:text-blue-900 hover:bg-blue-50 rounded-full transition-colors"
                        title="View"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => setDeleteCapability(capability)}
                        className="p-2 text-red-600 hover:text-red-900 hover:bg-red-50 rounded-full transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* No items state */}
        {capabilities.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-sm">No capabilities found</p>
          </div>
        )}
      </div>

      {/* View Modal */}
      {viewCapability && (
        <ViewModal
          capability={viewCapability}
          onClose={() => setViewCapability(null)}
        />
      )}

      {/* Delete Modal */}
      {deleteCapability && (
        <DeleteModal
          capability={deleteCapability}
          onConfirm={() => handleDelete(deleteCapability)}
          onCancel={() => setDeleteCapability(null)}
        />
      )}
    </div>
  );
};

export default CapabilitiesListPage;
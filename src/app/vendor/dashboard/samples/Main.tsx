"use client"
import React, { useState } from 'react';
import ComplainModal from '../approve_Reports/ComplainModal';
import ViewModal from '../approve_Reports/ViewModal';
import { Eye, CheckCircle, XCircle } from 'lucide-react';

type ModuleStatus = 'DRAFT' | 'UNDER_REVIEW' | 'COMPLAINED';

interface Module {
  id: string;
  ticket: string;
  status: ModuleStatus;
  isApproveRequestViewed: boolean;
  forModule: {
    title: string;
    description: string;
    reports: string[];
  };
  clientHas?: {
    userIs: {
      id: string;
    };
  };
}

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const CustomPagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="mt-4 flex items-center justify-center space-x-2">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="rounded-md border px-3 py-1 text-sm disabled:opacity-50"
      >
        Previous
      </button>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`rounded-md px-3 py-1 text-sm ${
            currentPage === page
              ? 'bg-blue-600 text-white'
              : 'border hover:bg-gray-50'
          }`}
        >
          {page}
        </button>
      ))}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="rounded-md border px-3 py-1 text-sm disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
};

const Main: React.FC = () => {
  // States
  const [modules, setModules] = useState<Module[]>([]);
  const [currentModuleId, setCurrentModuleId] = useState('');
  const [isComplainModalOpen, setIsComplainModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);

  // Mock data for demonstration
  const mockModules: Module[] = [
    {
      id: '1',
      ticket: 'TK-001',
      status: 'UNDER_REVIEW',
      isApproveRequestViewed: true,
      forModule: {
        title: 'Module 1',
        description: 'Description for Module 1',
        reports: ['report1.pdf', 'report2.pdf']
      }
    },
    {
      id: '2',
      ticket: 'TK-002',
      status: 'DRAFT',
      isApproveRequestViewed: false,
      forModule: {
        title: 'Module 2',
        description: 'Description for Module 2',
        reports: ['report3.pdf']
      }
    }
  ];

  const handleApprove = (moduleId: string) => {
    setModules(modules.map(module => 
      module.id === moduleId 
        ? { ...module, status: 'DRAFT' as ModuleStatus } 
        : module
    ));
  };

  const handleComplain = (description: string) => {
    setModules(modules.map(module => 
      module.id === currentModuleId 
        ? { ...module, status: 'COMPLAINED' as ModuleStatus } 
        : module
    ));
    setIsComplainModalOpen(false);
  };

  const getCurrentModule = () => {
    return modules.find(module => module.id === currentModuleId)?.forModule;
  };

  const canApprove = (status: ModuleStatus): boolean => {
    return status === 'UNDER_REVIEW';
  };

  const canReject = (status: ModuleStatus): boolean => {
    return status === 'UNDER_REVIEW';
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mt-8 overflow-hidden rounded-lg border border-gray-200 bg-white shadow">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Serial
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Ticket ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Module Title
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-gray-700">
              {mockModules.map((module, index) => (
                <tr
                  key={module.id}
                  className={`${
                    module.isApproveRequestViewed ? 'bg-white' : 'bg-gray-50'
                  } hover:bg-gray-100 transition-colors`}
                >
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                    {index + 1}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                    {module.ticket}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {module.forModule.title || 'N/A'}
                  </td>
                  <td className="flex items-center justify-center space-x-2 px-6 py-4">
                    <button
                      onClick={() => {
                        setIsViewModalOpen(true);
                        setCurrentModuleId(module.id);
                      }}
                      className="inline-flex items-center rounded-md bg-blue-50 px-3 py-2 text-sm font-medium text-blue-700 hover:bg-blue-100"
                    >
                      <Eye className="mr-1.5 h-4 w-4" />
                      View
                    </button>
                    {canApprove(module.status) && (
                      <button
                        onClick={() => handleApprove(module.id)}
                        className="inline-flex items-center rounded-md bg-green-50 px-3 py-2 text-sm font-medium text-green-700 hover:bg-green-100"
                      >
                        <CheckCircle className="mr-1.5 h-4 w-4" />
                        Approve
                      </button>
                    )}
                    {canReject(module.status) && (
                      <button
                        onClick={() => {
                          setIsComplainModalOpen(true);
                          setCurrentModuleId(module.id);
                        }}
                        className="inline-flex items-center rounded-md bg-red-50 px-3 py-2 text-sm font-medium text-red-700 hover:bg-red-100"
                      >
                        <XCircle className="mr-1.5 h-4 w-4" />
                        Reject
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <CustomPagination
          currentPage={currentPage}
          totalPages={Math.ceil(mockModules.length / pageSize)}
          onPageChange={setCurrentPage}
        />
      </div>

      <ComplainModal
        isOpen={isComplainModalOpen}
        onClose={() => setIsComplainModalOpen(false)}
        onSubmit={handleComplain}
      />

      <ViewModal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        moduleDetails={getCurrentModule()}
      />
    </div>
  );
};

export default Main;
import React from 'react';
import DocumentCard from './DocumentCard';
import { PiNotebookDuotone } from 'react-icons/pi';

interface DocCardsProps {
  currentModule: string;
  setIsOpen: (isOpen: boolean) => void;
  confirmComplete: () => void;
  setVendorId: (id: string) => void;
}

interface ModuleTicket {
  id: string;
  reports: string[];
  ticket: string;
  status: 'DRAFT' | 'COMPLETED' | 'COMPLAINED';
}

const DocCards: React.FC<DocCardsProps> = ({ 
  currentModule, 
  setIsOpen, 
  confirmComplete, 
  setVendorId 
}) => {
  // Mock data - replace with your data source
  const moduleData: ModuleTicket | null = currentModule ? {
    id: currentModule,
    reports: ['document1.pdf', 'document2.pdf', 'document3.pdf'],
    ticket: 'TICKET-001',
    status: 'DRAFT'
  } : null;

  if (!moduleData) {
    return (
      <div className="flex flex-col flex-auto lg:p-10 flex-shrink-0 bg-white ml-7 h-full min-h-[80vh] lg:max-h-[80vh]">
        <div className='bg-white h-full w-full flex items-center justify-center space-x-2'>
          <span className='text-lg'><PiNotebookDuotone /></span>
          <p className='text-lg text-dimText'>Select a module to view documents</p>
        </div>
      </div>
    );
  }

  if (!moduleData.reports.length) {
    return (
      <div className="flex flex-col flex-auto lg:p-10 flex-shrink-0 bg-white ml-7 h-full min-h-[80vh] lg:max-h-[80vh]">
        <div className='bg-white h-full w-full flex items-center justify-center space-x-2'>
          <span className='text-lg'><PiNotebookDuotone /></span>
          <p className='text-lg text-dimText'>No Reports Found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-auto h-full px-6">
      <div className="flex flex-col flex-auto flex-shrink-0 rounded-lg bg-white h-full min-h-[85vh] lg:max-h-[85vh]">
        <div className='bg-white shadow-sm px-4 py-5 rounded-lg flex items-center justify-between'>
          <div className='flex items-center'>
            <p className='bg-green-500 w-3 h-3 rounded-full mr-2'></p>
            <p className='font-bold'>{moduleData.ticket}</p>
          </div>

          {moduleData.status !== "COMPLETED" && (
            <div className='space-x-3'>
              <button 
                onClick={() => {
                  setIsOpen(true);
                  setVendorId('mock-vendor-id'); // Replace with actual vendor ID if needed
                }} 
                className='bg-blue-600 text-white font-semibold px-4 py-1 rounded hover:bg-blue-700'
              >
                Comment
              </button>
              <button 
                onClick={confirmComplete} 
                className='bg-blue-600 text-white font-semibold px-4 py-1 rounded hover:bg-blue-700'
              >
                Confirm
              </button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full ml-5 h-full overflow-y-auto p-4">
          {moduleData.reports.map((url, i) => (
            <div key={i}>
              <DocumentCard url={url} index={i} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DocCards;
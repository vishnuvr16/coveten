'use client'
import React, { useState } from 'react';
import Sidebar from './Sidebar';
import DocCards from './DocCards';
import ComplainModal from './ComplainModal';

interface ModuleTicket {
  id: string;
  reports: string[];
  ticket: string;
  status: 'DRAFT' | 'COMPLETED' | 'COMPLAINED';
  forModule: {
    title: string;
  };
}

const Main = () => {
  // States
  const [currentModule, setCurrentModule] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  
  // Mock data - replace with your data source
  const mockModuleTickets: ModuleTicket[] = [
    {
      id: '1',
      reports: ['report1.pdf', 'report2.pdf'],
      ticket: 'TICKET-001',
      status: 'DRAFT',
      forModule: {
        title: 'Module 1'
      }
    },
    {
      id: '2',
      reports: ['report3.pdf'],
      ticket: 'TICKET-002',
      status: 'COMPLETED',
      forModule: {
        title: 'Module 2'
      }
    }
  ];

  const handleAddComplain = (complain: string) => {
    console.log('Adding complain:', complain, 'for module:', currentModule);
    setIsOpen(false);
    // Add your complain handling logic here
  };

  const handleConfirmComplete = () => {
    console.log('Confirming completion for module:', currentModule);
    // Add your completion handling logic here
  };

  return (
    <div className='flex flex-row h-full lg:max-h-[85vh] w-full overflow-x-hidden'>
      <Sidebar 
        data={mockModuleTickets} 
        setCurrentModule={setCurrentModule} 
      />
      <div className='w-full'>
        <DocCards 
          currentModule={currentModule}
          setIsOpen={setIsOpen}
          confirmComplete={handleConfirmComplete}
          setVendorId={() => {}} // Remove if vendor functionality isn't needed
        />
      </div>
      <ComplainModal 
        isOpen={isOpen} 
        setIsOpen={setIsOpen} 
        addComplain={handleAddComplain} 
      />
    </div>
  );
};

export default Main;
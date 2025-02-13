'use client'
import React, { useState } from 'react';
import SampleTable from './SampleTable';
import { toast } from 'react-hot-toast';

interface Module {
  id: string;
  title: string;
  sampleStatus: 'ON_WAY' | 'RECEIVED' | 'NOT_SENT';
  projectHas: {
    title: string;
  };
  moduleticketFor: {
    ticket: string;
  };
}

const Main = () => {
  // Mock initial data
  const [modules, setModules] = useState<Module[]>([
    {
      id: '1',
      title: 'Module 1',
      sampleStatus: 'NOT_SENT',
      projectHas: {
        title: 'Project A'
      },
      moduleticketFor: {
        ticket: 'TICKET-001'
      }
    },
    {
      id: '2',
      title: 'Module 2',
      sampleStatus: 'ON_WAY',
      projectHas: {
        title: 'Project B'
      },
      moduleticketFor: {
        ticket: 'TICKET-002'
      }
    }
  ]);

  const [isLoading, setIsLoading] = useState(false);

  const updateModuleStatus = async (id: string, status: 'ON_WAY' | 'RECEIVED' | 'NOT_SENT') => {
    setIsLoading(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    setModules(prevModules => 
      prevModules.map(module => 
        module.id === id 
          ? { ...module, sampleStatus: status }
          : module
      )
    );

    toast.success('Updated');
    setIsLoading(false);
  };

  return (
    <div>
      <SampleTable 
        data={modules} 
        updateModuleStatus={updateModuleStatus} 
      />
    </div>
  );
};

export default Main;
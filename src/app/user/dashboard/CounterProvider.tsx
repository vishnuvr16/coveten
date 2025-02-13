// CounterProvider.tsx
'use client'
import React, { createContext, ReactNode, useContext, useState } from 'react';

type ContextType = {
  invoiceCounter: number;
  moduleCounter: number;
  notificationCounter: number;
  handleUpdateView: (id: string, type: string) => void;
};

export const CounterContext = createContext<ContextType | undefined>(undefined);

type CounterProviderProps = {
  children: ReactNode;
};

const CounterProvider = ({ children }: CounterProviderProps) => {
  const [invoiceCounter, setInvoiceCounter] = useState(0);
  const [moduleCounter, setModuleCounter] = useState(0);
  const [notificationCounter, setNotificationCounter] = useState(0);

  const handleUpdateView = async (id: string, type: string) => {
    // Update local state based on type
    switch (type) {
      case "Estimation":
        setInvoiceCounter(prev => Math.max(0, prev - 1));
        break;
      case "Module":
        setModuleCounter(prev => Math.max(0, prev - 1));
        break;
      case "Notification":
        setNotificationCounter(prev => Math.max(0, prev - 1));
        break;
    }
  };

  const value: ContextType = {
    invoiceCounter,
    moduleCounter,
    notificationCounter,
    handleUpdateView,
  };

  return (
    <CounterContext.Provider value={value}>
      {children}
    </CounterContext.Provider>
  );
};

export const useCounterData = (): ContextType => {
  const context = useContext(CounterContext);
  if (!context) {
    throw new Error('useCounterData must be used within a CounterProvider');
  }
  return context;
};

export default CounterProvider;

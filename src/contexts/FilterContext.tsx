'use client'

import React, { createContext, useContext, useState } from 'react';
import { Kernel } from '@/types/filters';

interface FilterContextType {
  selectedKernel: Kernel | null;
  setSelectedKernel: (kernel: Kernel) => void;
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export const useFilterContext = () => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error('useFilterContext must be used within a FilterProvider');
  }
  return context;
};

export const FilterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedKernel, setSelectedKernel] = useState<Kernel | null>(null);

  return (
    <FilterContext.Provider value={{ selectedKernel, setSelectedKernel }}>
      {children}
    </FilterContext.Provider>
  );
};

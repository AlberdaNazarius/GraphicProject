'use client'

import React, { createContext, useContext, useRef } from 'react';

interface ImageContextType {
  imageRef: React.RefObject<HTMLImageElement>;
  modImageRef: React.RefObject<HTMLImageElement>;
}

const ImageContext = createContext<ImageContextType | undefined>(undefined);

export const useImageContext = () => {
  const context = useContext(ImageContext);
  if (!context) {
    throw new Error('useImageContext must be used within an ImageProvider');
  }
  return context;
};

export const ImageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const imageRef = useRef<HTMLImageElement | null>(null);
  const modImageRef = useRef<HTMLImageElement | null>(null);

  return (
    <ImageContext.Provider value={{ imageRef, modImageRef }}>
      {children}
    </ImageContext.Provider>
  );
};

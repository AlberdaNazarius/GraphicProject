'use client'

import React from 'react';
import {useImageContext} from '@/contexts/ImageContext';
import {useFilterContext} from '@/contexts/FilterContext';
import {applyFilter} from "@/utils/applyFilters";

const ApplyButton: React.FC = () => {
  const {imageRef, modImageRef} = useImageContext();
  const {selectedKernel} = useFilterContext();

  const useFilter = () => {
    const image = imageRef.current;
    const modImage = modImageRef.current;

    applyFilter(image, modImage, selectedKernel);
  };


  return (
    <button className='btn' onClick={useFilter}>
      Apply
    </button>
  );
};

export default ApplyButton;

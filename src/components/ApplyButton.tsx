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

    applyFilter(selectedKernel, image, modImage);
  };


  return (
    <button className='btn mt-4' onClick={useFilter}>
      Apply
    </button>
  );
};

export default ApplyButton;

import React, { useState, useEffect } from 'react';
import Histogram from './Histogram';
import {calculateHistogramAndCDF, fillHistogram, histogramEqualization} from "@/utils/histogramUtils";
import useCommonStore from "@/store/CommonStore";

interface ShowHistogramsProps {
  originalImageData: Uint8ClampedArray
}

const ShowHistograms: React.FC<ShowHistogramsProps> = ({ originalImageData }) => {
  const [originalHist, setOriginalHist] = useState<number[]>([]);
  const [filteredHist, setFilteredHist] = useState<number[]>([]);
  const [cdfNormalized, setCdfNormalized] = useState<number[]>([]);

  const {setModifiedImageData} = useCommonStore();

  useEffect(() => {
    setOriginalHist(fillHistogram(originalImageData));

    const equalizedImage = histogramEqualization(originalImageData);
    setFilteredHist(fillHistogram(equalizedImage));
    setModifiedImageData(equalizedImage);

    const { cdfNormalized } = calculateHistogramAndCDF(originalImageData);
    setCdfNormalized(cdfNormalized);
  }, [originalImageData]);

  return (
    <div className='flex items-center flex-col'>
      <div className='flex gap-10 mt-6'>
        <Histogram data={originalHist} title="Original Histogram"/>
        <Histogram data={filteredHist} title="Filtered Histogram"/>
      </div>
      <Histogram data={cdfNormalized} title="CDF Normalized" type='line'/>
    </div>
  );
};

export default ShowHistograms;
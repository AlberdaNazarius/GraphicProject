import React, { useState, useEffect } from 'react';
import Histogram from './Histogram';
import {histogramEqualization} from "@/utils/histogramUtils";

const ShowHistograms = ({ originalImageData }) => {
  const [originalHist, setOriginalHist] = useState([]);
  const [filteredHist, setFilteredHist] = useState([]);

  useEffect(() => {
    const originalHist = new Array(256).fill(0);
    for (let i = 0; i < originalImageData.length; i++) {
      originalHist[originalImageData[i]]++;
    }
    setOriginalHist(originalHist);

    const equalizedImage = histogramEqualization(originalImageData);
    const filteredHist = new Array(256).fill(0);
    for (let i = 0; i < equalizedImage.length; i++) {
      filteredHist[equalizedImage[i]]++;
    }
    setFilteredHist(filteredHist);
  }, [originalImageData]);

  return (
    <div className='flex gap-10 mt-6'>
      <Histogram data={originalHist} title="Original Histogram" />
      <Histogram data={filteredHist} title="Filtered Histogram" />
    </div>
  );
};

export default ShowHistograms;
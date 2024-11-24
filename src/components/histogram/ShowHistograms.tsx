import React, {useState, useEffect} from 'react';
import Histogram from './Histogram';
import {
  calculateHistogramAndCDF,
  fillHistogram,
  fillHistogramsForEachChannel,
  histogramEqualization
} from "@/utils/histogramUtils";
import useCommonStore from "@/store/CommonStore";

interface ShowHistogramsProps {
  originalImageData: Uint8ClampedArray,
  modifiedImageData: Uint8ClampedArray
}

const ShowHistograms: React.FC<ShowHistogramsProps> = ({originalImageData, modifiedImageData}) => {
  const [originalHist, setOriginalHist] = useState<number[]>([]);
  const [filteredHist, setFilteredHist] = useState<number[]>([]);
  const [cdfNormalized, setCdfNormalized] = useState<number[]>([]);

  const [rgbHistogramsOriginal, setRgbHistograms] = useState({red: [], green: [], blue: []});
  const [filteredRgbHistograms, setFilteredRgbHistograms] = useState({red: [], green: [], blue: []});


  const {setModifiedImageData, equalize, setEqualize, rgbHistograms} = useCommonStore();

  useEffect(() => {
    setOriginalHist(fillHistogram(originalImageData));
    setFilteredHist(fillHistogram(modifiedImageData));

    if (rgbHistograms) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      setRgbHistograms(fillHistogramsForEachChannel(originalImageData))
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      setFilteredRgbHistograms(fillHistogramsForEachChannel(modifiedImageData))
    }

    if (equalize) {
      const equalizedImage = histogramEqualization(originalImageData);
      setModifiedImageData(equalizedImage);
      setFilteredHist(fillHistogram(equalizedImage));

      const {cdfNormalized} = calculateHistogramAndCDF(originalImageData);
      setCdfNormalized(cdfNormalized);

      setEqualize(false);
    }
  }, [originalImageData, modifiedImageData, equalize]);

  return (
    <div className='flex items-center flex-col'>
      {!rgbHistograms &&
          <div className='flex gap-10 mt-6'>
            <Histogram data={originalHist} title="Original Histogram"/>
            <Histogram data={filteredHist} title="Filtered Histogram"/>
          </div>
      }
      {rgbHistograms &&
          <div className='mt-4'>
            <div className='flex'>
              <Histogram data={rgbHistogramsOriginal.red} title="Original Histogram" color='red'/>
              <Histogram data={rgbHistogramsOriginal.blue} title="Original Histogram" color='blue'/>
              <Histogram data={rgbHistogramsOriginal.green} title="Original Histogram" color='green'/>
            </div>
            <div className='flex'>
              <Histogram data={filteredRgbHistograms.red} title="Filtered Histogram" color='red'/>
              <Histogram data={filteredRgbHistograms.blue} title="Filtered Histogram" color='blue'/>
              <Histogram data={filteredRgbHistograms.green} title="Filtered Histogram" color='green'/>
            </div>
          </div>
      }
      {cdfNormalized.length > 0 && <Histogram data={cdfNormalized} title="CDF Normalized" type='line'/>}
    </div>
  );
};

export default ShowHistograms;
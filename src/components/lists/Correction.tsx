import React from "react";
import {applyColorBalanceFilter} from "@/utils/imageCorrectionUtlis";
import {useImageContext} from "@/contexts/ImageContext";
import {CorrectionTypes} from "@/types/imageCorrection";
import valueStore from "@/store/ValueStore";

const Correction: React.FC = ({}) => {
  const {imageRef, modImageRef} = useImageContext();
  const {gamma} = valueStore();

  const handleCorrectionClick = (type: CorrectionTypes) => {
    const image = imageRef.current;
    const modImage = modImageRef.current;
    applyColorBalanceFilter(image, modImage, gamma, type);
  }

  return (
    <li>
      <button onClick={() => handleCorrectionClick(CorrectionTypes.LEVEL_ADJUSTMENT)}>Level Correction</button>
      <button onClick={() => handleCorrectionClick(CorrectionTypes.GAMMA_CORRECTION)}>Gamma Correction</button>
      <button onClick={() => handleCorrectionClick(CorrectionTypes.LEVEL_AND_GAMMA)}>Level&Gamma Correction</button>
      <button onClick={() => handleCorrectionClick(CorrectionTypes.HISTOGRAM)}>Histogram Correction</button>
    </li>
  )
}

export default Correction;
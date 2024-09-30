'use client'

import {useImageContext} from "@/contexts/ImageContext";
import {Gradation} from "@/types/gradation";
import {applyGradationTransform} from "@/utils/gradationTransform";

const FilterList: React.FC = () => {
  const {imageRef, modImageRef} = useImageContext();

  const handleGradation = (gradation: Gradation) => {
    const image = imageRef.current;
    const modImage = modImageRef.current;

    applyGradationTransform(image, modImage, gradation)
  }

  return (
    <>
      <li>
        <button onClick={() => handleGradation(Gradation.Negative)}>Negative</button>
      </li>
      <li>
        <button onClick={() => handleGradation(Gradation.Logarithmic)}>Logarithmic</button>
      </li>
      <li>
        <button onClick={() => handleGradation(Gradation.Power)}>Exponent</button>
      </li>
    </>
  )
}

export default FilterList;
'use client'

import {useImageContext} from "@/contexts/ImageContext";
import {Gradation} from "@/types/gradation";
import {applyGradationTransform} from "@/utils/gradationTransform";
import valueStore from "@/store/ValueStore";


const FilterList: React.FC = () => {
  const {imageRef, modImageRef} = useImageContext();
  const {gamma} = valueStore();

  const handleGradation = (gradation: Gradation) => {
    const image = imageRef.current;
    const modImage = modImageRef.current;

    applyGradationTransform(image, modImage, gradation, gamma)
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
        <button onClick={() => handleGradation(Gradation.Power)}>Power</button>
      </li>
    </>
  )
}

export default FilterList;
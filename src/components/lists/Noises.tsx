import React from "react";
import {applyNoiseToImage} from "@/utils/noises";
import {useImageContext} from "@/contexts/ImageContext";
import {NoisesType} from "@/types/noises";

const Noises: React.FC = () => {
  const {imageRef, modImageRef} = useImageContext();
  const noiseLevel = 30;

  const handleClick = (type: NoisesType) => {
    const image = imageRef.current;
    const modImage = modImageRef.current;
    applyNoiseToImage(image, modImage, noiseLevel, type);
  }

  return (
    <li>
      <button onClick={() => handleClick(NoisesType.GAUSSIAN)}>Gaussian</button>
      <button onClick={() => handleClick(NoisesType.RAYLEIGH)}>Rayleigh</button>
      <button onClick={() => handleClick(NoisesType.IMPULSE)}>Impulse</button>
    </li>
  )
}

export default Noises;
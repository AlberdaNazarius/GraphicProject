import React from "react";
import {applyNoiseToImage} from "@/utils/noises";
import {useImageContext} from "@/contexts/ImageContext";
import {NoisesRemovalType, NoisesType} from "@/types/noises";
import {applyNoiseRemovalFiler} from "@/utils/noiseRemoval";

const Noises: React.FC = () => {
  const {imageRef, modImageRef} = useImageContext();
  const noiseLevel = 30;

  const handleNoiseClick = (type: NoisesType) => {
    const image = imageRef.current;
    const modImage = modImageRef.current;
    applyNoiseToImage(image, modImage, noiseLevel, type);
  }

  const handleNoiseRemovalClick = (type: NoisesRemovalType) => {
    const image = imageRef.current;
    const modImage = modImageRef.current;

    applyNoiseRemovalFiler(image, modImage, 3, type);
  }

  return (
    <li>
      <button onClick={() => handleNoiseClick(NoisesType.GAUSSIAN)}>Gaussian</button>
      <button onClick={() => handleNoiseClick(NoisesType.RAYLEIGH)}>Rayleigh</button>
      <button onClick={() => handleNoiseClick(NoisesType.IMPULSE)}>Impulse</button>
      <button onClick={() => handleNoiseRemovalClick(NoisesRemovalType.MEAN)}>Mean</button>
      <button onClick={() => handleNoiseRemovalClick(NoisesRemovalType.GEOMETRIC_MEAN)}>Geometric mean</button>
      <button onClick={() => handleNoiseRemovalClick(NoisesRemovalType.HARMONIC_MEAN)}>Harmonic mean</button>
      <button onClick={() => handleNoiseRemovalClick(NoisesRemovalType.CONTRAHARMONIC_MEAN)}>Contraharmonic mean</button>
      <button onClick={() => handleNoiseRemovalClick(NoisesRemovalType.MEDIAN)}>Median</button>
    </li>
  )
}

export default Noises;
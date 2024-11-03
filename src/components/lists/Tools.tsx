'use client';

import {useImageContext} from "@/contexts/ImageContext";
import React from "react";
import useCommonStore from "@/store/CommonStore";
import ImageUploader from "@/components/ImageUploader";
import SaveImageBtn from "@/components/SaveImageBtn";

const Tools: React.FC = () => {
  const {imageRef, modImageRef} = useImageContext();
  const {setImageUrl} = useCommonStore();

  const reset = () => {
    const originalImage = imageRef.current;
    const modImage = modImageRef.current;
    if (!originalImage || !modImage) {
      return;
    }
    modImageRef.current.src = imageRef.current.src;
  }

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImageUrl(imageUrl);
    }
  };

  const handleFourier = () => {

  }

  return (
    <li>
      <ImageUploader handleImageChange={handleImageChange}/>
      <SaveImageBtn/>
      <button onClick={handleFourier}>Fourier</button>
      <button onClick={reset}>Reset</button>
    </li>
  )
}

export default Tools;
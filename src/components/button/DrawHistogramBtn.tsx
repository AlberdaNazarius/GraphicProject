'use client'

import React from "react";
import {canvasImageData} from "@/utils/imageUtils";
import {useImageContext} from "@/contexts/ImageContext";
import useCommonStore from "@/store/CommonStore";

const DrawHistogramBtn = () => {
  const {imageRef} = useImageContext();
  const {setImageData} = useCommonStore();

  const handleClick = () => {
    const canvasData = canvasImageData(imageRef.current);
    if (!canvasData) {
      return;
    }
    setImageData(canvasData.data);
  }

  return (
    <button className='btn' onClick={handleClick}>
      Draw
    </button>
  )
};

export default DrawHistogramBtn;
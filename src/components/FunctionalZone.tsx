'use client'
import React from "react";
import Images from "@/components/Images";
import useCommonStore from "@/store/CommonStore";
import ShowHistograms from "@/components/histogram/ShowHistograms";

export default function FunctionalZone() {
  const {imageUrl, imageData, modifiedImageData} = useCommonStore();

  return (
    <div className='flex flex-col items-center'>
      {imageUrl && (
        <Images imagePath={imageUrl}/>
      )}
      {imageData && modifiedImageData && (
        <ShowHistograms originalImageData={imageData} modifiedImageData={modifiedImageData}/>
      )}
    </div>
  );
}

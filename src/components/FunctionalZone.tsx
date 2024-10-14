'use client'
import React from "react";
import Images from "@/components/Images";
import useCommonStore from "@/store/CommonStore";

export default function FunctionalZone() {
  const {image} = useCommonStore();

  return (
    <div className='flex flex-col items-center'>
      {image && (
        <Images imagePath={image}/>
      )}
    </div>
  );
}

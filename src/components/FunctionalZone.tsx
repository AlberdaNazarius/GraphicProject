'use client'
import React, {useState} from "react";
import Images from "@/components/Images";
import SaveImageBtn from "@/components/SaveImageBtn";
import ImageUploader from "@/components/ImageUploader";
import ApplyButton from "@/components/ApplyButton";

export default function FunctionalZone() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
    }
  };

  return (
    <div className='flex flex-col items-center'>
      <div className='flex flex-row gap-3'>
        <ImageUploader handleImageChange={handleImageChange}/>
        <SaveImageBtn/>
      </div>
      <ApplyButton/>
      {selectedImage && (
        <Images imagePath={selectedImage}/>
      )}
    </div>
  );
}

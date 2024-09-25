'use client'
import { useState } from "react";

export default function ImageUploader() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
    }
  };

  return (
    <div className='flex flex-col'>
      <input
        className="w-[97px] self-center"
        type="file"
        accept="image/*"
        onChange={handleImageChange}
      />
      {selectedImage && (
        <div className='flex mt-14 gap-10'>
          <img src={selectedImage} alt="Selected" width='500'/>
          <img src={selectedImage} alt="Selected" width='500'/>
        </div>
      )}
    </div>
  );
}

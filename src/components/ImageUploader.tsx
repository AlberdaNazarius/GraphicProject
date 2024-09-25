import React from 'react';

interface Props {
  handleImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const ImageUploader: React.FC<Props> = ({handleImageChange}) => {
  return (
    <input
      className="w-[97px] self-center"
      type="file"
      accept="image/*"
      onChange={handleImageChange}
    />
  );
};

export default ImageUploader;
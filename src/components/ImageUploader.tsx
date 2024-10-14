import React, {useRef} from 'react';

interface Props {
  handleImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const ImageUploader: React.FC<Props> = ({handleImageChange}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <>
      <button onClick={handleButtonClick}>
        Upload
      </button>
      <input
        className="hidden"
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleImageChange}
      />
    </>
  );
};

export default ImageUploader;
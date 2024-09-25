import React from 'react';

const SaveImageBtn: React.FC = () => {
  const handleSaveImage = () => {
    const imageElement = document.getElementById('mod-img') as HTMLImageElement;
    if (imageElement) {
      const link = document.createElement('a');
      link.href = imageElement.src;
      link.download = 'image.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <button className='w-fit border-[1px] border-black bg-[#f0f0f0] px-2 py-0.5' onClick={handleSaveImage}>Save Image</button>
  );
};

export default SaveImageBtn;
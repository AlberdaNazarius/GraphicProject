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
    <button onClick={handleSaveImage}>Save Image</button>
  );
};

export default SaveImageBtn;
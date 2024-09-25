import React from 'react';

interface Props {
  imagePath: string;
}

function Images(props: Props) {
  const {imagePath} = props;

  return (
    <div className='flex mt-14 gap-10'>
      <img src={imagePath} alt="Selected" width='500'/>
      <img id='mod-img' src={imagePath} alt="Selected" width='500'/>
    </div>
  );
}

export default Images;
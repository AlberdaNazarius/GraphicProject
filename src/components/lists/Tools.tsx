'use client';

import {useImageContext} from "@/contexts/ImageContext";

const Tools: React.FC = () => {
  const {imageRef, modImageRef} = useImageContext();

  const reset = () => {
    const originalImage = imageRef.current;
    const modImage = modImageRef.current;
    if (!originalImage || !modImage) {
      return;
    }
    modImageRef.current.src = imageRef.current.src;
  }

  return (
    <>
      <li>
        <button onClick={reset}>Reset</button>
      </li>
    </>
  )
}

export default Tools;
import { useImageContext } from '@/contexts/ImageContext'

interface Props {
  imagePath: string;
}

const Images: React.FC<Props> = ({ imagePath }) => {
  const { imageRef, modImageRef } = useImageContext();

  return (
    <div className='flex mt-14 gap-10'>
      <img className='grayscale' ref={imageRef} src={imagePath} width='500' alt="Original" />
      <img id='mod-img' className='grayscale' ref={modImageRef} src={imagePath} alt="Modified" width='500' />
    </div>
  );
};

export default Images;

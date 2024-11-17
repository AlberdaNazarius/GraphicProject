import {useImageContext} from '@/contexts/ImageContext'
import {useEffect} from "react";
import useCommonStore from "@/store/CommonStore";
import {updateImage} from "@/utils/imageUtils";

interface Props {
  imagePath: string;
}

const Images: React.FC<Props> = ({imagePath}) => {
  const {imageRef, modImageRef} = useImageContext();
  const {modifiedImageData} = useCommonStore();
  const isGrayscale = false;

  useEffect(() => {
    if (!modifiedImageData) {
      return
    }

    updateImage({
      data: modifiedImageData,
      imageRef: imageRef,
      modImageRef: modImageRef
    });
  }, [modifiedImageData]);

  return (
    <div className='flex mt-14 gap-10'>
      <img className={`${isGrayscale && 'grayscale'}`} ref={imageRef} src={imagePath} width='500' alt="Original"/>
      <img id='mod-img' className={`${isGrayscale && 'grayscale'}`} ref={modImageRef} src={imagePath} alt="Modified" width='500'/>
    </div>
  );
};

export default Images;

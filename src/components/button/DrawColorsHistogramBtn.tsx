import useCommonStore from "@/store/CommonStore";

const DrawColorsHistogramBtn = () => {
  const {rgbHistograms, setRgbHistograms} = useCommonStore();

  const handleClick = () => {
    setRgbHistograms(!rgbHistograms);
  }

  return(
    <button className='btn' onClick={handleClick}>
      Draw Colors
    </button>
  )
}

export default DrawColorsHistogramBtn;
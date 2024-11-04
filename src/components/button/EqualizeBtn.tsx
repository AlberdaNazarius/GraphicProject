'use client'

import React from "react";
import useCommonStore from "@/store/CommonStore";

const EqualizeBtn = () => {
  const {setEqualize} = useCommonStore();

  const handleClick = () => {
    setEqualize(true);
  }

  return (
    <button className='btn' onClick={handleClick}>
      Equalize
    </button>
  )
}

export default EqualizeBtn;
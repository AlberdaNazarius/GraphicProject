'use client'
import React from 'react';
import './sidebar.css'
import Matrix from "@/components/matrix/Matrix";
import ApplyButton from "@/components/ApplyButton";
import DrawHistogramBtn from "@/components/button/DrawHistogramBtn";
import EqualizeBtn from "@/components/button/EqualizeBtn";
import useValueStore from "@/store/ValueStore";

const Sidebar = () => {
  const {setNoiseMean, setNoiseLevel, setFilterSize, setWhiteDots, setBlackDots } = useValueStore();
  return (
    <div className='sidebar flex flex-col items-center gap-3'>
      <Matrix dimension={3}/>
      <div className='mt-4 flex gap-5'>
        <ApplyButton/>
        <DrawHistogramBtn/>
      </div>
      <EqualizeBtn/>
      <div className='flex flex-col gap-5'>
        <h3 className='text-xl font-bold'>Values</h3>
        <h4 className='text-lg font-bold'>Noise</h4>
        <div>
          <label>Noise Mean: </label>
          <input onChange={(e) => setNoiseMean(parseFloat(e.target.value))}/>
        </div>
        <div>
          <label>Noise level: </label>
          <input onChange={(e) => setNoiseLevel(parseFloat(e.target.value))}/>
        </div>
        <div>
          <label>Black: </label>
          <input onChange={(e) => setBlackDots(parseFloat(e.target.value))}/>
        </div>
        <div>
          <label>White: </label>
          <input onChange={(e) => setWhiteDots(parseFloat(e.target.value))}/>
        </div>
        <h4 className='text-lg font-bold'>Noise removal</h4>
        <div>
          <label>Q: </label>
          <input onChange={(e) => setFilterSize(parseFloat(e.target.value))}/>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
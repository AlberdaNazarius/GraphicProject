import React from 'react';
import './sidebar.css'
import Matrix from "@/components/matrix/Matrix";
import ApplyButton from "@/components/ApplyButton";
import DrawHistogramBtn from "@/components/button/DrawHistogramBtn";

const Sidebar = () => {
  return (
    <div className='sidebar flex flex-col items-center'>
      <Matrix dimension={3}/>
      <div className='mt-4 flex gap-5'>
        <ApplyButton/>
        <DrawHistogramBtn />
      </div>
    </div>
  );
};

export default Sidebar;
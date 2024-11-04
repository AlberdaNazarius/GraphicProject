import React from 'react';
import './sidebar.css'
import Matrix from "@/components/matrix/Matrix";
import ApplyButton from "@/components/ApplyButton";
import DrawHistogramBtn from "@/components/button/DrawHistogramBtn";
import EqualizeBtn from "@/components/button/EqualizeBtn";

const Sidebar = () => {
  return (
    <div className='sidebar flex flex-col items-center gap-3'>
      <Matrix dimension={3}/>
      <div className='mt-4 flex gap-5'>
        <ApplyButton/>
        <DrawHistogramBtn />
      </div>
      <EqualizeBtn />
    </div>
  );
};

export default Sidebar;
import React from 'react';
import './sidebar.css'
import Matrix from "@/components/matrix/Matrix";
import ApplyButton from "@/components/ApplyButton";

const Sidebar = () => {
  return (
    <div className='sidebar flex flex-col items-center'>
      <Matrix dimension={3}/>
      <ApplyButton/>
    </div>
  );
};

export default Sidebar;
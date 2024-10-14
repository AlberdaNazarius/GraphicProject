import React from 'react';
import './sidebar.css'
import Matrix from "@/components/matrix/Matrix";

const Sidebar = () => {
  return (
    <div className='sidebar'>
      <Matrix dimension={3}/>
    </div>
  );
};

export default Sidebar;
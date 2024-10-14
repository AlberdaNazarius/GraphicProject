'use client'

import FilterList from "@/components/lists/FilterList";
import GradationList from "@/components/lists/GradationList";
import Tools from "@/components/lists/Tools";
import React from "react";

export default function ToolBar() {
  const [gamma, setGamma] = React.useState(1);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGamma(Number(event.target.value));
  };

  return (
    <nav className="mb-8 fixed left-0 right-0 top-0 bg-[#444647] h-12 z-[1000]">
      <div className="dropdown ">
        <div tabIndex={0} role="button"
             className="btn bg-[#6d6f70] border-none rounded-none hover:bg-[#7f8385]">Method
        </div>
        <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box w-52 p-2 shadow">
          <FilterList/>
        </ul>
      </div>
      <div className="dropdown ">
        <div tabIndex={1} role="button"
             className="btn bg-[#6d6f70] border-none rounded-none hover:bg-[#7f8385]">Gradiation
        </div>
        <ul tabIndex={1} className="dropdown-content menu bg-base-100 rounded-box w-52 p-2 shadow">
          <GradationList gamma={gamma}/>
        </ul>
      </div>
      <div className="dropdown ">
        <div tabIndex={2} role="button"
             className="btn bg-[#6d6f70] border-none rounded-none hover:bg-[#7f8385]">Tools
        </div>
        <ul tabIndex={2} className="dropdown-content menu bg-base-100 rounded-box w-52 p-2 shadow">
          <Tools/>
        </ul>
      </div>
      <input onChange={handleChange} className='ml-3' placeholder='gamma'/>
    </nav>
  )
}
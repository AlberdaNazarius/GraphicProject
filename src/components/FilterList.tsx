'use client'

import React from 'react';
import {filters} from "@/types/filters";
import {useFilterContext} from "@/contexts/FilterContext";

const FilterList: React.FC = () => {
  const { setSelectedKernel } = useFilterContext();
  return (
    <ul>
      {Object.keys(filters).map((filterKey) => (
          <li key={filterKey}>
            <button onClick={() => setSelectedKernel(filters[filterKey])}>
              {filters[filterKey].title}
            </button>
          </li>
      ))}
    </ul>
  );
};

export default FilterList;

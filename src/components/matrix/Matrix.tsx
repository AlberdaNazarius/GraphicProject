'use client'

import './Matrix.css'
import {useState} from "react";

interface Props {
  dimension: number;
}

export default function Matrix(props: Props) {
  const basicDimension = props.dimension

  const [dimension, setDimension] = useState(basicDimension); // Initial number of inputs

  return (
    <div className='flex flex-col items-center mt-4'>
      <div className='flex items-center justify-between gap-2'>
        <button onClick={() => setDimension(dimension + 1)} className='btn btn-active rounded-2xl text-xl'>+</button>
        <button onClick={() => setDimension(dimension - 1)} className='btn btn-active rounded-2xl text-2xl'>-</button>
      </div>
      <div className='mt-6'>
        {Array.from({length: dimension}, (_, rowIndex) => (
          <div key={rowIndex} className="row">
            {Array.from({length: dimension}, (_, columnIndex) => (
              <input key={columnIndex} type="text" className='input input-bordered p-1 text-center'/>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
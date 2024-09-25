'use client'

import './Matrix.css'
import {useState} from "react";

interface Props {
  dimension: number;
}

export default function Matrix(props: Props) {
  const basicDimension = props.dimension

  const [dimension, setDimension] = useState(basicDimension);
  const [values, setValues] = useState<string[][]>(Array(10).fill(Array(10).fill('')));


  const handleInputChange = (rowIndex: number, index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    setValues(prevValues => {
      const newValues = [...prevValues];
      newValues[rowIndex][index] = event.target.value;
      return newValues;
    });
  };

  const resizeValues = (newDimension: number) => {
    setValues(prevValues => {
      const newValues = Array.from({length: newDimension}, (_, i) =>
        Array.from({length: newDimension}, (_, j) =>
          prevValues[i] && prevValues[i][j] ? prevValues[i][j] : ''
        )
      );
      return newValues;
    });
  };

  const returnValues = (rowIndex: number, colIndex: number): string => {
    const value = values[rowIndex][colIndex];
    if (!value) {
      return '';
    }
    return value;
  }

  const changeDimension = (newDimension: number) => {
    setDimension(newDimension);
    resizeValues(newDimension);
  }

  return (
    <div className='flex flex-col items-center mt-4'>
      <div className='flex items-center justify-between gap-2'>
        <button onClick={() => changeDimension(dimension + 1)} className='btn btn-active rounded-2xl text-xl'>+</button>
        <button onClick={() => changeDimension(dimension - 1)} className='btn btn-active rounded-2xl text-2xl'>-
        </button>
      </div>
      <div className='mt-6'>
        {Array.from({length: dimension}, (_, rowIndex) => (
          <div key={rowIndex} className="row">
            {Array.from({length: dimension}, (_, colIndex) => (
              <input
                type="text"
                className='input input-bordered p-1 text-center'
                value={returnValues(rowIndex, colIndex)}
                onChange={event => handleInputChange(rowIndex, colIndex, event)}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
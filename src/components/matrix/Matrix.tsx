'use client'

import './Matrix.css'
import {useEffect, useState} from "react";
import {useFilterContext} from "@/contexts/FilterContext";

interface Props {
  dimension: number;
}

export default function Matrix(props: Props) {
  const basicDimension = props.dimension

  const { selectedKernel } = useFilterContext();
  const [dimension, setDimension] = useState(basicDimension);
  const [values, setValues] = useState<string[][]>(Array(10).fill(Array(10).fill('')));

  useEffect(() => {
    if (selectedKernel) {
      const newDimension = selectedKernel.kernel.length;
      setDimension(newDimension); // Оновлюємо розмір матриці
      setValues(selectedKernel.kernel.map(row => row.map(value => value.toString()))); // Заповнюємо матрицю значеннями фільтра
    }
  }, [selectedKernel]);

  const handleInputChange = (rowIndex: number, index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    setValues(prevValues => {
      const newValues = [...prevValues];
      newValues[rowIndex][index] = event.target.value;
      return newValues;
    });
  };

  const resizeValues = (newDimension: number) => {
    setValues(prevValues => {
      return Array.from({length: newDimension}, (_, i) =>
        Array.from({length: newDimension}, (_, j) =>
          prevValues[i] && prevValues[i][j] ? prevValues[i][j] : ''
        )
      );
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
              // eslint-disable-next-line react/jsx-key
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
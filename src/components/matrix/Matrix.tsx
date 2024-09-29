'use client'

import './Matrix.css'
import {useEffect, useState} from "react";
import {useFilterContext} from "@/contexts/FilterContext";
import {Kernel} from "@/types/filters";

interface Props {
  dimension: number;
}

export default function Matrix(props: Props) {
  const basicDimension = props.dimension

  const {selectedKernel, setSelectedKernel} = useFilterContext();
  const [dimension, setDimension] = useState(basicDimension);
  const [values, setValues] = useState<string[][]>(Array(basicDimension).fill(Array(basicDimension).fill('')));

  useEffect(() => {
    if (selectedKernel && selectedKernel.title != 'Custom') {
      const newDimension = selectedKernel.kernel.length;
      setDimension(newDimension);
      setValues(selectedKernel.kernel.map(row => row.map(value => value.toString()))); // Заповнюємо матрицю значеннями фільтра
    }
  }, [selectedKernel]);

  useEffect(() => {
    resizeValues(dimension);
  }, []);

  const handleInputChange = (rowIndex: number, colIndex: number, event: React.ChangeEvent<HTMLInputElement>) => {
    setValues(prevValues => {
      const newValues = [...prevValues];
      newValues[rowIndex][colIndex] = event.target.value;
      return newValues;
    });

    const kernel: Kernel = {
      title: 'Custom',
      kernel: values.map(row => row.map(value => parseInt(value)))
    }
    setSelectedKernel(kernel)
  };

  const resizeValues = (newDimension: number) => {
    setValues(prevValues => {
      return Array.from({length: newDimension}, (_, i) =>
        Array.from({length: newDimension}, (_, j) =>
          prevValues[i] && prevValues[i][j] ? prevValues[i][j] : ''
        )
      );
    });

    console.log(values)
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
        <button onClick={() => changeDimension(dimension + 1)} className='btn rounded-2xl text-xl'>+</button>
        <button onClick={() => changeDimension(dimension - 1)} className='btn rounded-2xl text-2xl'>-
        </button>
      </div>
      <div className='mt-6'>
        {Array.from({length: dimension}, (_, rowIndex) => (
          <div className="row">
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
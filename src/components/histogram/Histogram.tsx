import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Title } from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Title);

const Histogram = ({ data, title }) => {
  const chartData = {
    labels: Array.from({ length: 256 }, (_, i) => i),
    datasets: [
      {
        label: title,
        data: data,
        backgroundColor: 'rgba(0, 123, 255, 0.5)',
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div>
      <Bar data={chartData} options={options} style={{ width: '500px' }}/>
    </div>
  );
};

export default Histogram;
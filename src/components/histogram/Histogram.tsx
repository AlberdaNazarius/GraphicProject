import React, {useEffect} from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Title } from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Title);

interface HistogramProps {
  data: number[];
  title: string;
  type?: 'bar' | 'line';
}

const Histogram: React.FC<HistogramProps> = ({ data, title }) => {
  const [chart, setChartData] = React.useState<number[]>([]);
  useEffect(() => {
    setChartData(data.slice(0, -1));
  }, [data]);

  const chartData = {
    labels: Array.from({ length: 256 }, (_, i) => i),
    datasets: [
      {
        label: title,
        data: chart,
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
      <Bar data={chartData} options={options} style={{ width: '500px', height: '300px' }}/>
    </div>
  );
};

export default Histogram;
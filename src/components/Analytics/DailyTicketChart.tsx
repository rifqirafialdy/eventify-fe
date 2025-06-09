'use client';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

type Props = {
  data: { [date: string]: number };
};

export default function DailyTicketChart({ data }: Props) {
console.log(data);

  const dates = Object.keys(data).sort();
  const values = dates.map((date) => data[date]);
  
  const chartData = {
    labels: dates,
    datasets: [
      {
        label: 'Tickets Sold',
        data: values,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
        tension: 0.3,
        pointRadius: 5,
        pointHoverRadius: 7,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Daily Ticket Sales',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
      },
    },
  };
 return  <div className="bg-white p-4 shadow rounded-md h-[400px]">
    <Line data={chartData} options={chartOptions} />
  </div>;
 
}

import React from 'react';
import { Chart, CategoryScale , ArcElement} from 'chart.js';
import { Pie } from "react-chartjs-2";

Chart.register(CategoryScale);
Chart.register(ArcElement);


function DataAnalysis() {

  // TODO: fetch data analysis from API
  const dataAnalysis = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        label: 'Total Users',
        data: [100, 150, 200, 250, 300, 350],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
      {
        label: 'New Users',
        data: [50, 75, 100, 125, 150, 175],
        fill: false,
        borderColor: 'rgb(192, 75, 192)',
        tension: 0.1,
      },
    ],
  };
  

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-bold mb-4">Data Analysis</h2>
      <Pie data={dataAnalysis} />
    </div>
  );
}

export default DataAnalysis;

import React from "react";
// import {Chart, ArcElement} from 'chart.js'
import Chart, { animator,ArcElement } from "chart.js/auto"

import { Bar } from "react-chartjs-2";

// Chart.register(ArcElement);

const BarChart = ({ chartData }) => {
  return (
    <div className="h-56 w-56 md:w-96">
        <Bar data={chartData} />
    </div>
  );
};

export default BarChart;
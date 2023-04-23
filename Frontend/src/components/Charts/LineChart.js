import React from "react";
// import {Chart, ArcElement} from 'chart.js'
import Chart, { animator,ArcElement } from "chart.js/auto"

import { Bar, Line } from "react-chartjs-2";

// Chart.register(ArcElement);

const LineChart = ({ chartData }) => {
  return (
    <div className="h-56 w-56 md:w-96">
        <Line data={chartData} />
    </div>
  );
};

export default LineChart;
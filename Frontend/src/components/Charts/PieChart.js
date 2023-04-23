import React from "react";
// import {Chart, ArcElement} from 'chart.js'
import Chart, { animator,ArcElement } from "chart.js/auto"

import { Pie } from "react-chartjs-2";

// Chart.register(ArcElement);

const PieChart = ({ chartData }) => {
  return (
    <div className="h-56">
      <Pie data={chartData} />
    </div>
  );
};

export default PieChart;
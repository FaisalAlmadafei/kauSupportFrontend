import React from "react";
import { Bar } from "react-chartjs-2";
import {Chart as ChartJS} from "chart.js/auto" 



function BarChart({ ChartData }) {
 

  return (
    <div>
      <div className="team-progress-chart">
        <Bar data={ChartData}  />
      </div>
    </div>
  );
}

export default BarChart;

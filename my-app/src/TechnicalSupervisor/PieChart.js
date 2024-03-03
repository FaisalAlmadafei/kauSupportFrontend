import React from "react";
import { Pie } from "react-chartjs-2";
import {Chart as ChartJS} from "chart.js/auto" 


function PieChart({ ChartData }) {
 

    return (
      <div>
        <div className="team-progress-chart">
          <Pie data={ChartData}  />
        </div>
      </div>
    );
  }
export default PieChart;

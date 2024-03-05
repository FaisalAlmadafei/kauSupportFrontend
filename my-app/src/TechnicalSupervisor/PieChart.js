import React from "react";
import { Pie } from "react-chartjs-2";
import {Chart as ChartJS} from "chart.js/auto" 


function PieChart({ ChartData, totalDevicesCount }) {
 

    return (
      <div>
        <div style={{color:"grey"}} className="team-progress-chart">
          <div>Total Number of devices : {totalDevicesCount}</div>
          <Pie data={ChartData}  />
        </div>
      </div>
    );
  }
export default PieChart;

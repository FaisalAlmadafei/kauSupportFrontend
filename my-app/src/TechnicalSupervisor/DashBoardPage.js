import React from "react";
import NavigationBar from "../SharedComponents/NavigationBar";
import { useEffect, useState } from "react";
import BarChart from "./BarChart";
import "../TechnicalSupervisorcCSS/DashBoardPage.css";



function DashBoardPage() {
  const [ProgressChartData, setProgressChartData] = useState(null);
  const [StatisticsChartData, setStatisticsChartData] = useState(null);


  useEffect(() => {
    getTeamProgress();
    getStatistics() ;
  }, []);

  async function getTeamProgress() {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    try {
      const response = await fetch(
        `https://kausupportapi.azurewebsites.net/api/TechnicalSupervisor_/GetTeamProgress`,
        requestOptions
      );

      if (response.ok) {
        const result = await response.json();
        setProgressChartData({
          labels: result.map(
            (member) => `${member.firstName} ${member.lastName}`
          ),
          datasets: [
            {
              label: "Remaining Reports",
              data: result.map((member) => member.numberOfReports),
              backgroundColor: ["rgb(8, 136, 211)            "]
            },
          ],
        });
      } else if (response.status === 400) {
        alert("An error occurred. Please try again.");
      } else {
        alert("An error occurred. Please try again.");
      }
    } catch (error) {
      console.log("error", error);
      alert("An error occurred. Please check your connection and try again.");
    }
  }

  async function getStatistics() {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    try {
      const response = await fetch(
        `https://kausupportapi.azurewebsites.net/api/TechnicalSupervisor_/GetReportStatistics`,
        requestOptions
      );

      if (response.ok) {
        const result = await response.json();
      
        setStatisticsChartData({
          labels: result.details.map(
            (type) => type.problemType
          ),
         
          datasets: [
            {
              label: "Total Number Of Reports",
            
              data: result.details.map((type) => type.count),
              backgroundColor: ["rgb(166, 152, 218)"]
            },
          ],
        });
      } else if (response.status === 400) {
        alert("An error occurred. Please try again.");
      } else {
        alert("An error occurred. Please try again.");
      }
    } catch (error) {
      console.log("error", error);
      alert("An error occurred. Please check your connection and try again.");
    }
  }

  return (
 <>
  <NavigationBar />
  <div className="charts-container">
  <div  className="team-progress-chart-container">\
      {ProgressChartData !== null ? (<BarChart className="bar-chart" ChartData={ProgressChartData} />) : (<></>)}


   
    </div>
    <div  className="team-progress-chart-container">\
      {StatisticsChartData !== null ? (<BarChart className="bar-chart" ChartData={StatisticsChartData} />) : (<></>)}


   
    </div>
  

  </div>
    

    
 </>
     
  );
}

export default DashBoardPage;

import React from "react";
import NavigationBar from "../SharedComponents/NavigationBar";
import { useEffect, useState } from "react";
import BarChart from "./BarChart";
import "../TechnicalSupervisorcCSS/DashBoardPage.css";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import MyReportCard from "../SharedComponents/MyReportCard";
import PieChart from "./PieChart";





function DashBoardPage() {
  const [ProgressChartData, setProgressChartData] = useState(null);
  const [StatisticsChartData, setStatisticsChartData] = useState(null);
  const [DevicesStatisticsChartData, setDevicesStatisticsChartData] = useState(null);

  const navigate = useNavigate();
const [Reports, setReports] = useState([]);


  useEffect(() => {
    getTeamProgress();
    getReportsStatistics() ;
    getReports() ;
    getDevicesStatistics();
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
              backgroundColor: ["rgb(8, 136, 211)"]
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

  async function getReportsStatistics() {
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

  async function getDevicesStatistics() {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    try {
      const response = await fetch(
        `https://kausupportapi.azurewebsites.net/api/TechnicalSupervisor_/GetDevicesStatistics`,
        requestOptions
      );

      if (response.ok) {
        const result = await response.json();
      
        setDevicesStatisticsChartData({
          labels: ["Working Devices" , "Reported Devices"],
          datasets: [
            {
           
            
              data: [result.workingDevicesCount , result.notWorkingDevicesCount],
              backgroundColor: ["rgb(9, 215, 119)" , "red"]
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

  async function getReports() {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    try {
      const response = await fetch(
        `https://kausupportapi.azurewebsites.net/api/TechnicalSupervisor_/MonitorReports`,
        requestOptions
      );

      if (response.ok) {
        const result = await response.json();
        setReports(result);
      } else if (response.status === 400) {
      
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
          <div onClick={()=>{navigate("/Home")}} className="back-icon">
        <IoIosArrowBack/>
        </div>
  <div className="charts-container">
  <div  className="team-progress-chart-container">\
      {ProgressChartData !== null ? (<BarChart className="bar-chart" ChartData={ProgressChartData} />) : (<></>)}


   
    </div>
    <div  className="team-progress-chart-container">\
      {StatisticsChartData !== null ? (<BarChart className="bar-chart" ChartData={StatisticsChartData} />) : (<></>)}


   
    </div>
  

  </div>

  <div  className="pie-chart-container">\
      {DevicesStatisticsChartData !== null ? (<PieChart className="bar-chart" ChartData={DevicesStatisticsChartData} />) : (<></>)}


   
    </div>

    
  {Reports.map((Report) => (
          <MyReportCard
          key={Report.reportID}
            reportID={Report.reportID}
            deviceNumber={Report.deviceNumber}
            deviceLocatedLab={Report.deviceLocatedLab}
            problemDescription={Report.problemDescription}
            actionTaken={Report.actionTaken}
            reportDate={Report.reportDate}
            repairDate={Report.repairDate} 
            reportStatus={Report.reportStatus}
            problemType={Report.problemType}
            serviceType={"Reports monitoring"}
            myReports={Reports}
            setmyReports={setReports}
            assignedToFirstName={Report.assignedToFirstName}
            assignedToLastName={Report.assignedToLastName}
            reportedByFirstName={Report.reportedByFirstName}
            reportedByLastName={Report.reportedByLastName}
         

          
          />
        ))}
    


    
 </>
     
  );
}

export default DashBoardPage;

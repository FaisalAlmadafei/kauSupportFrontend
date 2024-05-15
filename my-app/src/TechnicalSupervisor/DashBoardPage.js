import React from "react";
import NavigationBar from "../SharedComponents/NavigationBar";
import { useEffect, useState } from "react";
import BarChart from "./BarChart";
import "../TechnicalSupervisorcCSS/DashBoardPage.css";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import MyReportCard from "../SharedComponents/MyReportCard";
import PieChart from "./PieChart";
import Footer from "../SharedComponents/Footer";
import { Alert } from "antd";

function DashBoardPage() {
  const [ProgressChartData, setProgressChartData] = useState(null);
  const [StatisticsChartData, setStatisticsChartData] = useState(null);
  const [DevicesStatisticsChartData, setDevicesStatisticsChartData] =
    useState(null);
  const [totalDevicesCount, setTotalDevicesCount] = useState("");
  const [reportsTotalCount, setreportsTotalCount] = useState("");
  const [showAssignedAlert, setshowAssignedAlert] = useState(false);
  const [showNoTeamMemberAlert, setshowNoTeamMemberAlert] = useState(false);
  const [showReportHandledAlert, setshowReportHandledAlert] = useState(false);
  const [showNoActionTakenAlert, setshowNoActionTakenAlert] = useState(false);
  const navigate = useNavigate();
  const [Reports, setReports] = useState([]);

  useEffect(() => {
    getTeamProgress();
    getReportsStatistics();
    getReports();
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
              label: "Assigned Reports",
              data: result.map((member) => member.numberOfReports),
              backgroundColor: ["rgb(8, 136, 211)"],
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
        setreportsTotalCount(result.reportsTotalCount);
        setStatisticsChartData({
          labels: result.details.map((type) => type.problemType),

          datasets: [
            {
              label: "Number Of Reports",
              data: result.details.map((type) => type.count),
              backgroundColor: ["rgb(166, 152, 218)"],
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
        setTotalDevicesCount(result.totalDevicesCount);

        setDevicesStatisticsChartData({
          labels: [
            `Working Devices ${result.workingDevicesCount}`,
            `Reported Devices ${result.notWorkingDevicesCount}`,
          ],
          datasets: [
            {
              data: [result.workingDevicesCount, result.notWorkingDevicesCount],
              backgroundColor: ["rgb(9, 215, 119)", "red"],
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
  const [search, setSearch] = useState("");
  const filteredReports = Reports.filter((Report) =>
    Report.reportID.toString().toLowerCase().includes(search.toLowerCase())
  );
  return (
    <>
      <NavigationBar
        setSearch={setSearch}
        placeholderValue={"Search a report by ID"}
      />
      <div
        onClick={() => {
          navigate("/Home");
        }}
        className="back-icon"
      >
        <IoIosArrowBack />
      </div>
      {showAssignedAlert && (
        <Alert
          className="report-alert-success"
          message="Report Assigned Successfully!"
          type="success"
          showIcon
          closable
          onClose={() => setshowAssignedAlert(false)}
        />
      )}

      {showReportHandledAlert && (
        <Alert
          className="report-alert-success"
          message="Report Handled Successfully!"
          type="success"
          showIcon
          closable
          onClose={() => setshowAssignedAlert(false)}
        />
      )}

      {showNoTeamMemberAlert && (
        <Alert
          className="report-alert-warning"
          message="Please choose a team member to assign report"
          description="Please try again."
          type="warning"
          showIcon
          closable
          onClose={() => setshowNoTeamMemberAlert(false)}
        />
      )}

      {showNoActionTakenAlert && (
        <Alert
          className="report-alert-warning"
          message="Please add action taken on this report"
          description="Please try again."
          type="warning"
          showIcon
          closable
          onClose={() => setshowNoActionTakenAlert(false)}
        />
      )}

      <div className="charts-container">
        <div className="team-progress-chart-container">
          
          {ProgressChartData !== null ? (
            <BarChart
              className="bar-chart"
              ChartData={ProgressChartData}
              showTotalNumber={"false"}
            />
          ) : (
            <></>
          )}
        </div>
        <div className="team-progress-chart-container">
          
          {StatisticsChartData !== null ? (
            <BarChart
              className="bar-chart"
              ChartData={StatisticsChartData}
              reportsTotalCount={reportsTotalCount}
              showTotalNumber={"true"}
            />
          ) : (
            <></>
          )}
        </div>
      </div>

      <div className="pie-chart-container">
        
        {DevicesStatisticsChartData !== null ? (
          <PieChart
            className="bar-chart"
            ChartData={DevicesStatisticsChartData}
            totalDevicesCount={totalDevicesCount}
          />
        ) : (
          <></>
        )}
      </div>

      <div className="monitor-reports-container">
        {filteredReports.map((Report) => (
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
            setshowAssignedAlert={setshowAssignedAlert}
            setshowNoTeamMemberAlert={setshowNoTeamMemberAlert}
            setshowReportHandledAlert={setshowReportHandledAlert}
            setshowNoActionTakenAlert={setshowNoActionTakenAlert}
            setmyReports={setReports}
            assignedToFirstName={Report.assignedToFirstName}
            assignedToLastName={Report.assignedToLastName}
            reportedByFirstName={Report.reportedByFirstName}
            reportedByLastName={Report.reportedByLastName}
          />
        ))}
      </div>

      <Footer />
    </>
  );
}

export default DashBoardPage;

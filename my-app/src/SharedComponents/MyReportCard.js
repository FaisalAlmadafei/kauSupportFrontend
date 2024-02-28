import React from "react";
import "../SharedCSS/MyReportCard.css";
import { Steps } from "antd";
import Sider from "antd/es/layout/Sider";
import { useState } from "react";
import { Select } from "antd";
import HandleReportForm from "../SharedComponents/HandleReportForm";

function MyReportCard({
  reportID,
  deviceNumber,
  deviceLocatedLab,
  problemDescription,
  actionTaken,
  reportDate,
  repairDate,
  reportStatus,
  problemType,
  serviceType,
  setmyReports,
  myReports
  
}) {
  const [userRole, setUserRole] = useState(
    localStorage.getItem("userRole") || ""
  );
  const [Team, setTeam] = useState([]);
  const [AssignedToId, setAssignedToId] = useState("");
  const [HandleButtonisClicked, setHandleButtonisClicked] = useState(false);
  function closeForm(){
    setHandleButtonisClicked(false) ; 
  }
  if (serviceType == "Supervisor reports") {
    getTeamMembers();
  }

  async function getTeamMembers() {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    try {
      const response = await fetch(
        `https://kausupportapi.azurewebsites.net/api/UserVerification_/GetTechnicalMembers`,
        requestOptions
      );

      if (response.ok) {
        const result = await response.json();
        setTeam(result);
      } else if (response.status === 400) {
        alert("No Team members found!");
      } else {
        alert("An error occurred. Please try again.");
      }
    } catch (error) {
      console.log("error", error);
    //  alert("An error occurred. Please check your connection and try again.");
    }
  }
  function getDate(DateAndTime) {
    const datePart = DateAndTime.split("T")[0];
    if (datePart == "0001-01-01") {
      return "Not Yet Completed";
    }
    return datePart;
  }

  function getStepNumber() {
    if (reportStatus === "Pending") {
      return 1;
    } else if (reportStatus === "in process") {
      return 2;
    } else {
      return 3;
    }
  }

    async function assignReport() {
   
    
    var requestOptions = {
      method: "PUT",
      redirect: "follow",
    };

    try {
      const response = await fetch(
        `https://kausupportapi.azurewebsites.net/api/TechnicalSupervisor_/AssignReport?User_Id=${AssignedToId}&Report_Id=${reportID}`,
        requestOptions
      );

      if (response.ok) {

       
        alert('Report assigned')
        const filteredReports = myReports.filter(report => report.reportID !== reportID);
        setmyReports(filteredReports);

      

      } else if (response.status === 400) {
        alert("Could not assign report")
      } else {
        alert("An error occurred. Please try again.");
      }
    } catch (error) {
      console.log("error", error);
      alert("An error occurred. Please check your connection and try again.");
    }
  
  }

  const Date = getDate(reportDate);
  const repair_Date = getDate(repairDate);
  const step = getStepNumber();

  return (
    <div>
      <div className="my-report-page">
        <div className="my-report-container">
          <span className="my-report-id">Report ID: {reportID}</span>
          <span className="my-report-date">Report Date: {Date}</span>

          <div className="my-report-device-number">
            <span>Device Number: {deviceNumber}</span>
          </div>

          <div className="my-lab-number">
            <span>LAB Number: {deviceLocatedLab}</span>
          </div>
          <div className="my-problem-type">
            <span>Problem Type: {problemType}</span>
          </div>
          <div className="my-problem">
            <span>
              <strong>Problem Description:</strong> {problemDescription}
            </span>
          </div>
          <div className="my-action-taken">
            <span>
              <strong>Action Taken:</strong> {actionTaken}
            </span>
          </div>

          <div className="my-repair-date">
            <span>Repair Date: {repair_Date}</span>
          </div>
          {serviceType == "Supervisor reports" ? (
            <>
            <div className="assign-part">
            <button className="assign-button" onClick={assignReport}>Assign Report</button>
              <Select
                style={{
                  width: 140,
                  height: 25,
                  margin: 10,
                }}
                onChange={(value) => {
                  setAssignedToId(value) ; 
                }}
                options={Team.map((TeamMember) => ({
                  label: `${TeamMember.firstName} ${TeamMember.lastName}`,
                  value: TeamMember.userId,
                }))}
              />
            </div>
            <button onClick={()=>{setHandleButtonisClicked(true)}} className="handle-button" >Handle Report</button>
            {HandleButtonisClicked &&(
            <HandleReportForm 
            closeForm={closeForm}
            reportID={reportID} />
          )}
       
            
              
            </>
          ) : (
            <></>
          )}
        </div>

        <div className="my-right-part">
          <Steps
            className="custom-steps"
            direction="vertical"
            current={step}
            items={[
              {
                title: "Pending",
                description: <p>Report is pending, soon will be processed</p>,
              },
              {
                title: "In Progress",
                description: <p>A Technical member is handling the report</p>,
              },
              {
                title: "Resolved",
                description: (
                  <p>Report is resolved, device is currently working</p>
                ),
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
}

export default MyReportCard;

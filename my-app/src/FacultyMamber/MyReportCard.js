import React from "react";
import "../FacultyMemberCSS/MyReportCard.css";
import { Steps } from 'antd';
import Sider from "antd/es/layout/Sider";
import { useState } from "react";
function MyReportCard({
  reportID,
  deviceNumber,
  deviceLocatedLab,
  problemDescription,
  actionTaken,
  reportDate,
  repairDate,
  reportStatus,
}) {

  const description = 'This is a description.';
  

 
  function getDate(DateAndTime) {
    const datePart = DateAndTime.split("T")[0];
    if (datePart == "0001-01-01") {
      return "Not Yet Completed";
    }
    return datePart;
  }

 function getStepNumber(){
  if(reportStatus === "Pending"){
   return 1 ; 
  }
  else if(reportStatus === "in process"){
  return 2 ;
  }

  else {
    return 3;
  }

 }
 


 

  const Date = getDate(reportDate);
  const repair_Date = getDate(repairDate);
  const step = getStepNumber() ; 
  return (
    <div>
      <div className="report-page">
      
          <div className="report-container">
            <span className="report-id">Report ID: {reportID}</span>
            <span className="report-date">Report Date: {Date}</span>

            <div className="report-device-number">
              <span>Device Number: {deviceNumber}</span>
            </div>

            <div className="lab-number">
              <span>LAB Number: {deviceLocatedLab}</span>
            </div>
            <div className="problem">
              <span>Problem Description: {problemDescription}</span>
            </div>
            <div className="action-taken">
              <span>Action Taken: {actionTaken}</span>
            </div>
            <div className="repair-date">
              <span>Repair Date: {repair_Date}</span>
            </div>
            
        
        </div>

        <div className="right-part">
        <Steps className="custom-steps"
    direction="vertical"
    current={step}
    items={[
      {
        title: 'Pending',
        description :(
        
            <p>Your report is pending, soon will be processed</p>
            
          
        )
      },
      {
        title: 'In Progress',
        description :(
          
            <p>A Technical member is handling your report</p>
            
         
        )
      },
      {
        title: 'Resolved',
        description :(
         
            <p>Your report is resolved and device is currently working</p>
            
          
        )
      },
    ]}
  />
        </div>
      </div>
    </div>
  );
}

export default MyReportCard;

import React, { useState } from "react";
import { Alert } from "antd";
import "../SharedCSS/HandleReportForm.css";
import { Spin } from 'antd';


function HandleReportForm({ closeForm, reportID, setmyReports, myReports , setshowReportHandledAlert , setshowNoActionTakenAlert }) {
  const [actionTaken, setActionTaken] = useState("");
  const [ShowSpinner, setShowSpinner] = useState(false);



  async function addActionTaken() {
    setShowSpinner(true) ; 
    var requestOptions = {
      method: "PUT",
      redirect: "follow",
    };

    try {
      const response = await fetch(
        `https://kausupportapi.azurewebsites.net/api/TechnicalMember_/handelReport?Report_Id=${reportID}&Action_Taken=${actionTaken}`,
        requestOptions
      );
      if (response.ok) {
        setShowSpinner(false) ; 
        setshowReportHandledAlert(true);
        closeForm();
        const filteredReports = myReports.filter(
          (report) => report.reportID !== reportID
        );
        setmyReports(filteredReports);

      } else if (response.status === 400) {
        alert("Action Taked Could not be updated!");
      } else {
        console.log(response);
        alert("An error occurred. Please try again.");
      }
    } catch (error) {
      console.log("error", error);
      alert("An error occurred. Please check your connection and try again.");
    }
  }
  function checkEmptyFields() {
    if (actionTaken.length > 0) {
      addActionTaken();
    } else {
      setshowNoActionTakenAlert(true) ;
    }
  }

  return (
    <div>
      {" "}

     

     
      <div className="report-handle-form">
     
      {ShowSpinner &&(
          <Spin className="handle-spin" size="large"/>
        )}

        <div onClick={closeForm} className="close-icon">
          x
        </div>
        <h4 className="handle-report-lable">
          Please enter a brief description of the action taken:{" "}
        </h4>
        <textarea
          required
          onChange={(e) => {
            setActionTaken(e.target.value);
          }}
          className="handel-report-input"
        ></textarea>
        <button onClick={checkEmptyFields} className="handle-report-button">
          Submit
        </button>
      </div>
    </div>
  );
}

export default HandleReportForm;

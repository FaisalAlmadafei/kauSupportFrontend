import React, { useState } from "react";
import { Alert } from "antd";
import "../SharedCSS/HandleReportForm.css";

function HandleReportForm({closeForm}, reportID) {
const [actionTaken, setActionTaken] = useState("");
const [ShowEmptyFieldAlert, setShowEmptyFieldAlert] = useState(false);
const [ShowSuccessAlert, setShowSuccessAlert] = useState(false);
const [ShowWarningAlert, setShowWarningAlert] = useState(false);

async function addActionTaken(){
  var requestOptions = {
      method: "POST",
      redirect: "follow",
    };

    try {
      const response = await fetch(
        `https://kausupportapi.azurewebsites.net/api/TechnicalMember_/handelReport?Report_Id=${reportID}&Action_Taken=${actionTaken}`,
        requestOptions
      );
      if (response.ok) {
        setShowSuccessAlert(true);
      } else if (response.status === 400) {
        setShowWarningAlert(true); 
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
    if (actionTaken.length > 0){
      addActionTaken();
    }else {
      setShowEmptyFieldAlert(true);
    }
  }
  
  return (

    <div>
        <div className="report-handle-form">
            <div onClick={closeForm} className="close-icon">x</div>
            <h4 className="handle-report-lable">Please enter a brief description of the action taken: </h4>
            <textarea
            required
            onChange={(e) => setActionTaken(e.target.value)}
            className="handel-report-input"           
          ></textarea>
          <button 
          onClick={checkEmptyFields}
          
          className="handle-report-button">
            Submit
            </button>
          
{ShowSuccessAlert && (
        <Alert
          className="handle-report-alert"
          message="The Action Taken added Successfully!"
          type="success"
          showIcon
          closable
          onClose={() => setShowSuccessAlert(false)}
        />
      )}
      {ShowWarningAlert && (
        <Alert
          className="handle-report-alert"
          message="An error occured"
          description="Please try again."
          type="warning"
          showIcon
          closable
          onClose={() => setShowWarningAlert(false)}
        />
      )}
       {ShowEmptyFieldAlert && (
        <Alert
          className="handle-report-alert"
          message="Please fill the action taken field"
          type="warning"
          showIcon
          closable
          onClose={() => setShowEmptyFieldAlert(false)}
        />
      )}
    
         </div>

    </div>
  );
}

export default HandleReportForm;

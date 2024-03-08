import React from "react";
import { useState } from "react";
import { Alert } from "antd";
import "../SharedCSS/HandleRequestForm.css";
import { Spin } from 'antd';


function HandleRequestForm({
  closeForm,
  requestID,
  setmyRequests,
  myRequests,
  setshowRequestHandledAlert,
  setshowNoResponseAlert
}) {
  const [Comment, setComment] = useState("");
  const [ShowSpinner, setShowSpinner] = useState(false);
  const [RequestStatus, setRequestStatus] = useState("");


  async function handleRequest() {
    setShowSpinner(true);
    var requestOptions = {
      method: "PUT",
      redirect: "follow",
    };

    try {
      const response = await fetch(
        `https://kausupportapi.azurewebsites.net/api/TechnicalMember_/handelRequest?Request_Id=${requestID}&Replay=${Comment}&Status=${RequestStatus}`,
        requestOptions
      );
      if (response.ok) {
        setShowSpinner(false);
        setshowRequestHandledAlert(true);

        closeForm();
        const filteredRequests = myRequests.filter(
          (request) => request.requestID !== requestID
        );
        setmyRequests(filteredRequests);
        setRequestStatus("");
        setComment("");


      } else if (response.status === 400) {
        alert("Request Could not be handled ");
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
    if (RequestStatus !== "" && Comment.length > 0) {
      handleRequest();

    } else {
      setshowNoResponseAlert(true);

    }


  }

  return (
    <div>
      {" "}

      <div className="request-handle-form">
        {ShowSpinner && (
          <Spin className="handle-request-spin" size="large" />
        )}

        <div onClick={closeForm} className="close-icon">
          x
        </div>
        <h3>Request Status</h3>
        <div className="status-choice-part">
          <label className="status-lable" >
            Approved
          </label>
          <input
            name="requestStatus"
            className="status-input"
            value="Approved"
            type="radio"
            onChange={(e) => { setRequestStatus(e.target.value) }}
          />
          <label className="status-lable" >
            Rejected
          </label>
          <input
            name="requestStatus"
            className="status-input"
            value="Rejected"
            type="radio"
            onChange={(e) => { setRequestStatus(e.target.value) }}
          />

        </div>

        <h4 className="handle-request-lable">
          Please include your comment on the request:
        </h4>
        <textarea
          required
          onChange={(e) => {
            setComment(e.target.value);
          }}
          className="handel-request-input"
        ></textarea>
        <button onClick={checkEmptyFields} className="handle-request-button">
          Submit
        </button>
      </div>
    </div>
  );
}
export default HandleRequestForm;

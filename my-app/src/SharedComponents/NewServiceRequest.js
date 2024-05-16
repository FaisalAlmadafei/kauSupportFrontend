import React, { useState } from "react";
import { useContext } from "react";
import { LoginContext } from "../App";
import { Alert } from "antd";
import NavigationBar from "./NavigationBar";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import "../SharedCSS/NewServiceRequest.css";

function NewServiceRequest() {
  const [search, setSearch] = useState("");
  const [requestType, setrequestType] = useState("");
  const [ReqDescription, setReqDescription] = useState("");
  const [userID] = useContext(LoginContext);
  const [ShowSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showChoseTypeAlert, setshowChoseTypeAlert] = useState(false);
  const [disable, setdisable] = useState(false);
  const [showEnterDiscriptionAlert, setshowEnterDiscriptionAlert] =
    useState(false);
  const navigate = useNavigate();

  async function addRequest() {
    if (requestType !== "") {
      if (ReqDescription.length > 0) {
        setdisable(true) ;
        var requestOptions = {
          method: "POST",
          redirect: "follow",
        };

        try {
          const response = await fetch(
            `https://kausupportapi.azurewebsites.net/api/FacultyMember_/RequestService?Request_=${ReqDescription}&Requested_By=${userID}&Request_Type=${requestType}`,
            requestOptions
          );
          if (response.status === 400) {
            alert("Somehting happened, try again");
          } else if (response.ok) {
            setShowSuccessAlert(true);
            setReqDescription("");
           
            setdisable(false) ;
          } else {
            alert("An error occurred. Please try again.");
          }
        } catch (error) {
          console.log("error", error);
          alert(
            "An error occurred. Please check your connection and try again."
          );
        }
      } else {
        setshowEnterDiscriptionAlert(true);
      }
    } else {
      setshowChoseTypeAlert(true);
    }
  }
  function handelServiceChoice(e) {
    setrequestType(e.target.value);
  }

  return (
    <div>
      <NavigationBar showSearchBar={"No"} />
      <div
        onClick={() => {
          navigate("/Home");
        }}
        className="back-icon"
      >
        <IoIosArrowBack />
      </div>

      {ShowSuccessAlert && (
        <Alert
          className="request-alert-success"
          message="Service requested Successfully!"
          description="Thank you!"
          type="success"
          showIcon
          closable
          onClose={() => setShowSuccessAlert(false)}
        />
      )}
      {showChoseTypeAlert && (
        <Alert
          className="warning-alert"
          message="Choose a Request Type"
          description="Please choose the request type."
          type="warning"
          showIcon
          closable
          onClose={() => setshowChoseTypeAlert(false)}
        />
      )}

      {showEnterDiscriptionAlert && (
        <Alert
          className="warning-alert"
          message="Enter Required Description"
          description="Please enter a description of your request. "
          type="warning"
          showIcon
          closable
          onClose={() => setshowEnterDiscriptionAlert(false)}
        />
      )}

      <div>
        <div className="request-form">
          <h3 style={{ color: "white" }}>Choose request type:</h3>
          <label className="request-lable" htmlFor="problemType">
            Software Installation
          </label>
          <input
            name="problemType"
            className="request-type-input"
            value="Software Installation"
            type="radio"
            onChange={handelServiceChoice}
          />
          <label className="request-lable" htmlFor="problemType">
            Software Licensing
          </label>
          <input
            name="problemType"
            className="request-type-input"
            value="Software Licensing"
            type="radio"
            onChange={handelServiceChoice}
          />

          <label className="request-lable" htmlFor="problemType">
            Unblock a website
          </label>
          <input
            name="problemType"
            className="request-type-input"
            value="Unblock a website"
            type="radio"
            onChange={handelServiceChoice}
          />
          <br />
          <label className="request-lable" htmlFor="problemType">
            Other
          </label>
          <input
            name="problemType"
            className="request-type-input"
            value="Other"
            type="radio"
            onChange={handelServiceChoice}
          />

          <h3 className="request-description" style={{ color: "white" }}>
            Please enter a brief description of the request
          </h3>
          <textarea
            value={ReqDescription}
            required
            className="request-input"
            onChange={(e) => {
              setReqDescription(e.target.value);
            }}
          ></textarea>
          <br></br>
          <button className="request-button" onClick={addRequest} disabled={disable}>
            Send Request
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default NewServiceRequest;

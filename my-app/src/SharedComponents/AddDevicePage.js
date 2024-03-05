import React from "react";
import NavigationBar from "./NavigationBar";
import "../SharedCSS/AddDevicePage.css";
import { Select } from "antd";
import { Alert } from "antd";
import { useState , useEffect } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
function AddDevicePage() {
  const types = ["PC", "Smart Board", "Projector"];
  const [Labs, setLabs] = useState([]);
  const [SerialNumber, setSerialNumber] = useState("");
  const [DeviceType, setDeviceType] = useState("");
  const [LabNumber, setLabNumber] = useState("");
  const [ShowSuccessAlert, setShowSuccessAlert] = useState(false);
  const [ShowWarningAlert, setShowWarningAlert] = useState(false);
  const [ShowEmptyFieldAlert, setShowEmptyFieldAlert] = useState(false);
  const [ShowNoCapacityAlert, setShowNoCapacityAlert] = useState(false);
  const navigate = useNavigate();

  const default_Lab = "1" ;

  useEffect(() => {
    getLabs();
  }, []);

  async function getLabs() {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    try {
      const response = await fetch(
        `https://kausupportapi.azurewebsites.net/api/FacultyMember_/GetLabs`,
        requestOptions
      );

      if (response.ok) {
        const result = await response.json();
       setLabs(result);
      } else if (response.status === 400) {
        alert("An error occurred. Please try again.");
      } 
      else {
        alert("An error occurred. Please try again.");
      }
    } catch (error) {
      console.log("error", error);
      alert("An error occurred. Please check your connection and try again.");
    }
  }

  async function addDevice(){
    var requestOptions = {
        method: "POST",
        redirect: "follow",
      };

      try {
        const response = await fetch(
          `https://kausupportapi.azurewebsites.net/api/TechnicalMember_/AddDevice?Serial_Number=${SerialNumber}&Device_Type=${DeviceType}&Device_LocatedLab=${LabNumber}`,
          requestOptions
        );
  
        if (response.ok) {
          setShowSuccessAlert(true);
       
        
      
        } else if (response.status === 400) {
          setShowWarningAlert(true); 
        } 
        
        else if (response.status === 409) {
          setShowNoCapacityAlert(true);
        }else {
          alert("An error occurred. Please try again.");
        }
      } catch (error) {
        console.log("error", error);
        alert("An error occurred. Please check your connection and try again.");
      }   
  }
  function checkEmptyFields() {
    if ((LabNumber.length > 0) && (DeviceType.length > 0) && (SerialNumber.length > 0)){
      addDevice();
    }else {
      setShowEmptyFieldAlert(true);
    }
  }
  return (
    <div>
      <NavigationBar showSearchBar={"No"} />
      
      <div onClick={()=>{navigate("/MangeDevicesPage")}} className="back-icon">
        <IoIosArrowBack/>
        </div>
      {ShowSuccessAlert && (
        <Alert
          className="success-alert"
          message="The device added Successfully!"
          type="success"
          showIcon
          closable
          onClose={() => setShowSuccessAlert(false)}
        />
      )}
      {ShowWarningAlert && (
        <Alert
          className="warning-alert"
          message="The device already exist"
          description="Please try again."
          type="warning"
          showIcon
          closable
          onClose={() => setShowWarningAlert(false)}
        />
      )}
      {ShowNoCapacityAlert && (
        <Alert
          className="capacity-alert"
          message="No enough capacity for the new device"
          description="Please try again."
          type="warning"
          showIcon
          closable
          onClose={() => setShowNoCapacityAlert(false)}
        />
      )}
      <div className="new-device-form">
        <div className="serial-number-section">
          <label className="serial-number-section-label" >Enter Device Serial Number:</label>
          <input  onChange={(e)=>{setSerialNumber(e.target.value)}} className="serial-number-section-input" type="text" />
        </div>
        <div className="device-type-section">
          <label className="device-section-label">Chose Device Type:</label>
          <Select
            
            onChange={(value)=>{setDeviceType(value)}}
            style={{
              width: 140,
              height: 25,
              margin: 10,
            }}
            options={types.map((type) => ({
              value: type,
            }))}
          />
        </div>

        <div className="Labs-section">
          <label className="lab-section-label">Chose Lab Number:</label>
          <Select
            
            onChange={(value)=>{setLabNumber(value)}}
            style={{
              width: 140,
              height: 25,
              margin: 10,
            }}
            options={Labs.map((Lab) => ({
              value: Lab.labNumber,
            }))}
          />
        </div>
        <button onClick={checkEmptyFields}  className="add-device-button">
             Add Device
            </button>
            {ShowEmptyFieldAlert && (
        <Alert
          className="empty-field-alert"
          message="Please fill the required fields"
          type="warning"
          showIcon
          closable
          onClose={() => setShowEmptyFieldAlert(false)}
        />
      )}
      </div>
      <Footer/>

    </div>
  );
}

export default AddDevicePage;

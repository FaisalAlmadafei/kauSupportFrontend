import React from "react";
import { useEffect, useState } from "react";
import "../SharedCSS/LabDevicesPage.css";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { NewReportContext } from "../App";
import DeviceCard from "./DeviceCard";
import { LoginContext } from "../App";
import { Alert } from 'antd';
import { Button, Result } from 'antd';

function LabDevicesPage() {
  const { LabNumber, setLabNumber } = useContext(NewReportContext);
  const [Devices, setDevices] = useState([]);
  const [isDeviceClicked, setisDeviceClicked] = useState(false);
  const [ReportedDeviceNumber, setReportedDeviceNumber] = useState("");
  const [SerialNumber, setSerialNumber] = useState("");
  const [ProblemDesription, setProblemDesription] = useState("");
  const [ShowAlert, setShowAlert] = useState(false);
  const [showNoDevices, setShowNoDevices] = useState(false);
  const [userID ] = useContext(LoginContext);
  const navigate = useNavigate();

  async function addReport() {
    if (ProblemDesription.length > 0) {
      var requestOptions = {
        method: "POST",
        redirect: "follow",
      };

      try {
        const response = await fetch(
          `https://kausupportapi.azurewebsites.net/api/FacultyMember_/AddReport?Device_Number=${ReportedDeviceNumber}&Serial_Number=${SerialNumber}&Device_LocatedLab=${LabNumber}&Problem_Description=${ProblemDesription}&Reported_By=${userID}`,
          requestOptions
        );

        if (response.status === 400) {
          // Handle the case where the device has already been reported
          alert("Device is reported ... try again later");
        } else if (response.ok) {
          // Handle successful report submission
          setShowAlert(true) ; 
        } else {
          // Handle other errors
          alert("An error occurred. Please try again.");
        }
      } catch (error) {
        console.log("error", error);
        alert("An error occurred. Please check your connection and try again.");
      }

      setisDeviceClicked(false);
      setProblemDesription("");
       
    } else {
      alert("Please Enter problem description ..");
    }
  }

  useEffect(() => {
    async function handel() {
      var requestOptions = {
        method: "GET",
        redirect: "follow",
      };

      try {
        const response = await fetch(
          `https://kausupportapi.azurewebsites.net/api/FacultyMember_/GetLabDevices/ID=${LabNumber}`,
          requestOptions
        );

        if (response.ok) {
          const result = await response.json();
         
          setDevices(result);
        } else if (response.status === 400) {
          setShowNoDevices(true) ; 

        } else {
          alert("An error occurred. Please try again.");
        }
      } catch (error) {
        console.log("error", error);
        alert("An error occurred. Please check your connection and try again.");
      }
    }
    handel();
  }, []);

  const [search, setSearch] = useState("");
  const filteredDevices = Devices.filter((Device) =>
    Device.deviceNumber.toString().toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="navBar">
        <input
          type="text"
          placeholder="Serach for a service"
          className="search-bar"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      {showNoDevices && (<Result className="no-device-picture"
    status="500"
    title="No devices found in this LAB"
    subTitle="Sorry, No Devices Found"
    extra={<Button on onClick= {()=>{navigate("/Home")}}type="primary">Back Home</Button>}
  />)}
      {ShowAlert &&(  <Alert className="report-alert"
      message="Device Reported Successfully!"
      description="Thank you for reporting"
      type="success"
      showIcon 
      closable
      onClose={() => setShowAlert(false)}
      
    />)}
      {isDeviceClicked && (
        <div className="report-form">
<div onClick={() => setisDeviceClicked(false)} className="x-icon">x</div>    
      <h2 className="reported-device-number">
            Devcie {ReportedDeviceNumber}
          </h2>
          <h3 style={{ color: "white" }}>
            Please Enter a brief description of the problem
          </h3>
          <textarea
            required
            className="report-input"
            onChange={(e) => setProblemDesription(e.target.value)}
          ></textarea>
          <button onClick={addReport} className="form-button">
            Report Device
          </button>
        </div>
      )}

      <div className="devices-card-container">
        {filteredDevices.map((Device) => (
          <div
            key={Device.deviceNumber}
            onClick={() => {
              setReportedDeviceNumber(Device.deviceNumber);
              setSerialNumber(Device.serialNumber);
              setisDeviceClicked(true);
            }}
          >
            <DeviceCard deviceNumber={Device.deviceNumber} />
          </div>
        ))}
      </div>
    </div>
  );
}
export default LabDevicesPage;

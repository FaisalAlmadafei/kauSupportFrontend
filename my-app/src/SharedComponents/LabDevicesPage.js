import React from "react";
import { useEffect, useState } from "react";
import "../SharedCSS/LabDevicesPage.css";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { NewReportContext } from "../App";
import DeviceCard from "./DeviceCard";
import { LoginContext } from "../App";
import { Alert } from "antd";
import { Button, Result } from "antd";
import { IoIosArrowBack } from "react-icons/io";

import FmNavigationBar from "./NavigationBar";

function LabDevicesPage() {
  const { LabNumber, setLabNumber } = useContext(NewReportContext);
  const [Devices, setDevices] = useState([]);
  const [ProblemType, setProblemType] = useState("");
  const [isDeviceClicked, setisDeviceClicked] = useState(false);
  const [ReportedDeviceNumber, setReportedDeviceNumber] = useState("");
  const [SerialNumber, setSerialNumber] = useState("");
  const [ProblemDesription, setProblemDesription] = useState("");
  const [DeviceStatus, setDeviceStatus] = useState("");
  const [ShowSuccessAlert, setShowSuccessAlert] = useState(false);
  const [ShowWarningAlert, setShowWarningAlert] = useState(false);
  const [showNoDevices, setShowNoDevices] = useState(false);
  const [userID] = useContext(LoginContext);
  const navigate = useNavigate();

  async function addReport() {
    if (ProblemType !== "") {
      if (ProblemDesription.length > 0) {
        if (DeviceStatus !== "reported") {
          var requestOptions = {
            method: "POST",
            redirect: "follow",
          };

          try {
            const response = await fetch(
              `https://kausupportapi.azurewebsites.net/api/FacultyMember_/AddReport?Device_Number=${ReportedDeviceNumber}&Serial_Number=${SerialNumber}&Device_LocatedLab=${LabNumber}&Problem_Description=${ProblemDesription}&Reported_By=${userID}&Problem_Type=${ProblemType}`,
              requestOptions
            );

            if (response.status === 400) {
              // Handle the case where the device has already been reported
              alert("Device is reported ... try again later");
            } else if (response.ok) {
              // Handle successful report submission

              setShowSuccessAlert(true);
              setProblemType("");
              getLabDevices();
            } else {
              // Handle other errors
              alert("An error occurred. Please try again.");
            }
          } catch (error) {
            console.log("error", error);
            alert(
              "An error occurred. Please check your connection and try again."
            );
          }

          setisDeviceClicked(false);
          setProblemDesription("");
        } else {
          setisDeviceClicked(false);
          setProblemDesription("");
          setShowWarningAlert(true);
        }
      } else {
        alert("Please Enter problem description ..");
      }
    } else {
      alert("Please chose problem");
    }
  }
  async function getLabDevices() {
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
        setShowNoDevices(true);
      } else {
        alert("An error occurred. Please try again.");
      }
    } catch (error) {
      console.log("error", error);
      alert("An error occurred. Please check your connection and try again.");
    }
  }
  useEffect(() => {
    getLabDevices();
  }, [LabNumber]);

  const [search, setSearch] = useState("");
  const filteredDevices = Devices.filter((Device) =>
    Device.deviceNumber.toString().toLowerCase().includes(search.toLowerCase())
  );

  function handelProblemChoice(e) {
    setProblemType(e.target.value);
  }

  return (
    <div>
      <FmNavigationBar setSearch={setSearch} />
      <div
        onClick={() => {
          navigate("/Home");
        }}
        className="back-icon"
      >
        <IoIosArrowBack />
      </div>

      {showNoDevices && (
        <Result
          className="no-device-picture"
          status="500"
          title="No devices found in this LAB"
          subTitle="Sorry, No Devices Found"
          extra={
            <Button
              on
              onClick={() => {
                navigate("/Home");
              }}
              type="primary"
            >
              Back Home
            </Button>
          }
        />
      )}
      {ShowSuccessAlert && (
        <Alert
          className="report-alert-success"
          message="Device Reported Successfully!"
          description="Thank you for reporting"
          type="success"
          showIcon
          closable
          onClose={() => setShowSuccessAlert(false)}
        />
      )}
      {ShowWarningAlert && (
        <Alert
          className="report-alert-warning"
          message="This Device is reported !"
          description="Please try again later."
          type="warning"
          showIcon
          closable
          onClose={() => setShowWarningAlert(false)}
        />
      )}

      {isDeviceClicked && (
        <div className="report-form">
          <div onClick={() => setisDeviceClicked(false)} className="x-icon">
            x
          </div>
          <h2 className="reported-device-number">
            Devcie {ReportedDeviceNumber}
          </h2>
          <h4 className="chose-lable" style={{ color: "white" }}>
            Chose problem type:
          </h4>
          <label className="problem-lable" htmlFor="problemType">
            Hardware
          </label>
          <input
            name="problemType"
            className="problem-lable"
            value="Hardware"
            type="radio"
            onChange={handelProblemChoice}
          />

          <label className="problem-lable" htmlFor="problemType">
            Software
          </label>
          <input
            name="problemType"
            className="problem-input"
            value="Software"
            type="radio"
            onChange={handelProblemChoice}
          />

          <label className="problem-lable" htmlFor="problemType">
            Connectivity
          </label>
          <input
            name="problemType"
            className="problem-input"
            value="Connectivity"
            type="radio"
            onChange={handelProblemChoice}
          />
          <br />
          <label className="problem-lable" htmlFor="problemType">
            Audio
          </label>
          <input
            name="problemType"
            className="problem-input"
            value="Audio"
            type="radio"
            onChange={handelProblemChoice}
          />

          <label className="problem-lable" htmlFor="problemType">
            Power
          </label>
          <input
            name="problemType"
            className="problem-lable"
            value="Power"
            type="radio"
            onChange={handelProblemChoice}
          />

          <label className="problem-lable" htmlFor="problemType">
            Graphics
          </label>
          <input
            name="problemType"
            className="problem-input"
            value="Graphics"
            type="radio"
            onChange={handelProblemChoice}
          />
          <h4 style={{ color: "white" }}>
            Please Enter a brief description of the problem
          </h4>
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
              if (Device.deviceStatus.toLowerCase() !== "reported") {
                setReportedDeviceNumber(Device.deviceNumber);
                setSerialNumber(Device.serialNumber);
                setDeviceStatus(Device.deviceStatus.toLowerCase());
                setisDeviceClicked(true);
              } else {
                setShowWarningAlert(true);
              }
            }}
          >
                   <DeviceCard deviceNumber={Device.deviceNumber } type= {Device.type} deviceStatus= {Device.deviceStatus} serialNumber= {Device.serialNumber} deviceLocatedLab= {Device.deviceLocatedLab} arrivalDate= {Device.arrivalDate} nextPeriodicDate= {Device.nextPeriodicDate} serviceType={"newReport"}/>

          </div>
        ))}
      </div>
    </div>
  );
}
export default LabDevicesPage;

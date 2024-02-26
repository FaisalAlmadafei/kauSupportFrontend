import React, { useEffect } from "react";
import FmNavigationBar from "./FmNavigationBar";
import "../SharedCSS/SearchDevicePage.css";
import DeviceCard from "./DeviceCard";
import { useState } from "react";
import MyReportCard from "../FacultyMamber/MyReportCard";
import { Alert } from "antd";

function SearchDevicePage() {
  const [SerialNumber, setSerialNumber] = useState("");
  const [device, setdevice] = useState("");
  const [Reports, setReports] = useState([]);
  const [ButtonisClicked, setButtonisClicked] = useState(true);
  const [ShowWarningAlert, setShowWarningAlert] = useState(false);
  async function searchDevice() {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    try {
      const response = await fetch(
        `https://kausupportapi.azurewebsites.net/api/TechnicalMember_/SearchForDevice?Serial_Number=${SerialNumber}`,
        requestOptions
      );

      if (response.ok) {
        const result = await response.json();
        setdevice(result["device"]);
        setReports(result["reports"]);

        setButtonisClicked(false);
      } else if (response.status === 400) {
      setShowWarningAlert(true);
      } else {
        alert("An error occurred. Please try again.");
      }
    } catch (error) {
      console.log("error", error);
      alert("An error occurred. Please check your connection and try again.");
    }
  }

  return (
    <div>
      <FmNavigationBar />
      {ShowWarningAlert && (
        <Alert
          className=".no-device-alert"
          message="No device found"
          description="Please try again."
          type="warning"
          showIcon
          closable
          onClose={() => setShowWarningAlert(false)}
        />
      )}

      {ButtonisClicked == false ? (
        <>
          <div className="result-container">
            <DeviceCard
              deviceNumber={device.deviceNumber}
              type={device.type}
              deviceStatus={device.deviceStatus}
              serialNumber={device.serialNumber}
              deviceLocatedLab={device.deviceLocatedLab}
              arrivalDate={device.arrivalDate}
              nextPeriodicDate={device.nextPeriodicDate}
              setButtonisClicked={setButtonisClicked}
            />
            {Reports.map((Report) => (
              <MyReportCard
                reportID={Report.reportID}
                deviceNumber={Report.deviceNumber}
                deviceLocatedLab={Report.deviceLocatedLab}
                problemDescription={Report.problemDescription}
                actionTaken={Report.actionTaken}
                reportDate={Report.reportDate}
                repairDate={Report.repairDate}
                reportStatus={Report.reportStatus}
                problemType={Report.problemType}
              />
            ))}
          </div>
        </>
      ) : (
        <>
          <div className="serach-form-container">
            <lable className="serial-number-lable">
              Enter deivce serial number:
            </lable>
            <input
              onChange={(e) => {
                setSerialNumber(e.target.value);
              }}
              type="text"
              className="serial-number-input"
            />
            <button onClick={searchDevice} className="search-button">
              Search Device
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default SearchDevicePage;

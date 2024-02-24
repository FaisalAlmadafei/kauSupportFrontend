import React, { useEffect } from "react";
import FmNavigationBar from "./FmNavigationBar";
import "../SharedCSS/SearchDevicePage.css";
import DeviceCard from "./DeviceCard";
import { useState  } from "react";

function SearchDevicePage() {
  const [SerialNumber, setSerialNumber] = useState("");
  const [device, setdevice] = useState("");
  const [Reports, setReports] = useState([]);
  const [ButtonisClicked, setButtonisClicked] = useState(true);

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
        setdevice(result["device"])
        setReports(result["reports"]);
       
        setButtonisClicked(false)
      } else if (response.status === 400) {
        alert("No device found");
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

      {

        ButtonisClicked && (
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

        )
      }

      {
        ButtonisClicked == false ? (
        <>
      <DeviceCard deviceNumber={device.deviceNumber } type= {device.type} deviceStatus= {device.deviceStatus} serialNumber= {device.serialNumber} deviceLocatedLab= {device.deviceLocatedLab} arrivalDate= {device.arrivalDate} nextPeriodicDate= {device.nextPeriodicDate}/>
        
        </>
        
        ) : (<></>)
      }




    </div>
  );
}

export default SearchDevicePage;

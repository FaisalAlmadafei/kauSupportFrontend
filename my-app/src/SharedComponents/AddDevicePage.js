import React from "react";
import FmNavigationBar from "./FmNavigationBar";
import "../SharedCSS/AddDevicePage.css";
import { Select } from "antd";
import { useState , useEffect } from "react";

function AddDevicePage() {
  const types = ["PC", "Smart Board", "Projector"];
  const [Labs, setLabs] = useState([]);
  const [SerialNumber, setSerialNumber] = useState("");
  const [DeviceType, setDeviceType] = useState("");
  const [LabNumber, setLabNumber] = useState("");
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
       setLabs(result) ;
      } else if (response.status === 400) {
        alert("No Labs found");
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
         alert("Device addedd");
       
        
      
        } else if (response.status === 400) {
            alert("Device exists")
        } 
        
        else if (response.status === 409) {
            alert("No enough capacity for the new device")
        }else {
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
        <button onClick={addDevice}  className="add-device-button">
             Add Device
            </button>
      </div>
    </div>
  );
}

export default AddDevicePage;

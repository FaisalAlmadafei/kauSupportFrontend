import React from "react";
import "../SharedCSS/DeviceCard.css";
import { PiDesktopTowerLight } from "react-icons/pi";
import { PiScreencastLight } from "react-icons/pi";
import { LuProjector } from "react-icons/lu";
import { BsProjector } from "react-icons/bs";
import { useState } from "react";

function DeviceCard({ deviceNumber, type, deviceStatus , serialNumber , arrivalDate , nextPeriodicDate , deviceLocatedLab}) {
  const [userRole, setuserRole] = useState(  localStorage.getItem("userRole") || "");

  function getIcon() {
    if (type.toLowerCase() == "pc") {
      return PiDesktopTowerLight;
    } else if (type.toLowerCase() == "board screen") {
      return PiScreencastLight;
    } else {
      return BsProjector;
    }
  }

  function getDate(DateAndTime) {
    const datePart = DateAndTime.split("T")[0];
    
    return datePart;
  }

  function getClassName() {
    if (deviceStatus.toLowerCase() == "working") {
      return "device-card-wroking";
    } else {
      return "device-card-reported";
    }
  }

  const Icon = getIcon();
  const arrival_Date = getDate(arrivalDate) ; 
  const nextPeriodic_Date = getDate(nextPeriodicDate) ; 
  const cardClassName = getClassName();
 
  

  return (
    <div>
      {
        userRole === "Faculty Member" ? (
            <div className={cardClassName}>
          <Icon className="react-icons-devices" />
          <br />
          <h3 className="device-number">Device {deviceNumber}</h3>
        </div> ) : (<>

          <div className="technical-role-device-card">
          <Icon className="react-icons-devices" />
          <br />
          <span className="technical-role-serial-number">Serial Number: {serialNumber}</span>
          <span className="technical-role-device-type">Device Type: {type}</span>
          <span className="technical-role-lab-number">Located Lab: {deviceLocatedLab}</span>
          <span className="technical-role-device-number">Device Number: {deviceNumber}</span>
          <span className="technical-role-device-status">Device Status: {deviceStatus}</span>
          <span className="device-arrival-date">Arrival Date: {arrival_Date}</span>
          <span className="device-next-periodic-date">Next Perodic Maintenance Date: {nextPeriodic_Date}</span>
        </div> 


        
        
        
        
        
        
        </>)
      }
    
    </div>
  );
}

export default DeviceCard;

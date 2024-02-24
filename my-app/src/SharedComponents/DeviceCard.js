import React from "react";
import "../SharedCSS/DeviceCard.css";
import { PiDesktopTowerLight } from "react-icons/pi";
import { PiScreencastLight } from "react-icons/pi";
import { LuProjector } from "react-icons/lu";
import { BsProjector } from "react-icons/bs";
import { useState } from "react";


function DeviceCard({
  deviceNumber,
  type,
  deviceStatus,
  serialNumber,
  arrivalDate,
  nextPeriodicDate,
  deviceLocatedLab,
  setButtonisClicked,
}) {
  const [userRole, setuserRole] = useState(
    localStorage.getItem("userRole") || ""
  );

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
  
  const arrival_Date = getDate(arrivalDate);
  const nextPeriodic_Date = getDate(nextPeriodicDate);
  const cardClassName = getClassName();

  return (
    <div>
      {userRole === "Faculty Member" ? (
        <div className={cardClassName}>
          <Icon className="react-icons-devices" />
          <br />
          <h3 className="device-number">Device {deviceNumber}</h3>
        </div>
      ) : (
        <>
          <div className="technical-role-device-card">
          <div onClick={() => setButtonisClicked(true)} className="continer-close-icon">x</div>            <Icon className="react-icons-devicess" />
            <br />
            <div className="flex-row">
              <div className="technical-role-serial-number">
                Serial Number: {serialNumber}
              </div>
              <div className="technical-role-device-type">
                Device Type: {type}
              </div>
            </div>

            <br />
            <div className="flex-row">
              <div className="technical-role-lab-number">
                Located Lab: {deviceLocatedLab}
              </div>
              <div className="technical-role-device-number">
                Device Number: {deviceNumber}
              </div>
            </div>
          
              <div className="technical-role-device-status">
                Device Status: {deviceStatus}
              </div>
              <div className="device-arrival-date">
                Arrival Date: {arrival_Date}
              </div>
           

            <div className="technical-role-flex-row">
              <div className="device-next-periodic-date">
                Next Periodic Maintenance Date: {nextPeriodic_Date}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default DeviceCard;

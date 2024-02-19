import React from "react";
import "../SharedCSS/DeviceCard.css";
import { PiDesktopTowerLight } from "react-icons/pi";
import { PiScreencastLight } from "react-icons/pi";
import { LuProjector } from "react-icons/lu";
import { BsProjector } from "react-icons/bs";

function DeviceCard({ deviceNumber, type ,deviceStatus }) {
  function getIcon() {
    if (type.toLowerCase() == "pc") {
      return PiDesktopTowerLight;
    } else if (type.toLowerCase() == "board screen") {
      return PiScreencastLight;
    } else {
      return BsProjector;
    }
  }

  function getClassName(){
    if(deviceStatus.toLowerCase() == "working"){
        return "device-card-wroking" ; 
    }

    else {return "device-card-reported"}

  }

  const Icon = getIcon();
  const cardClassName = getClassName() ; 

  return (
    <div>
      <div className={cardClassName}>
        <Icon className="react-icons-devices" />
        <br />
        <h3 className="device-number">Device {deviceNumber}</h3>
      </div>
    </div>
  );
}

export default DeviceCard;

import React from "react";
import "../SharedCSS/DeviceCard.css";

import { PiDesktopTowerLight } from "react-icons/pi";
function DeviceCard({deviceNumber}) {
    const Icon = PiDesktopTowerLight ; 
    return (<div>
  
        <div className="device-card">
        <Icon className="react-icons-devices" />
        <br />
        <h3 className="device-number">Device {deviceNumber}</h3>
    
       </div>
      
    </div>);}

export default DeviceCard;

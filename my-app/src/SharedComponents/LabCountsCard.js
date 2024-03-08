import React from "react";
import "../SharedCSS/LabCountsCard.css";
import { BsDoorOpen } from "react-icons/bs";
import { TbDeviceImacX } from "react-icons/tb";
import { TbDeviceImacCheck } from "react-icons/tb";



function LabCountsCard({ labNumber, reportedDevicesCount, workingDevicesCount, capacity }) {

  return (<div>

    <div className="counts-card">
      <div className="top-part">
        <BsDoorOpen className="react-icons" />
        <h3 className="counts-card-lab-number">Lab {labNumber}</h3>


      </div>

      <br />

      <div className="bottom-part">
        <span className="devices-capacity">Capacity: {capacity}</span>
        <span className="working-devices-count"><TbDeviceImacCheck className="react-icons-working" />{workingDevicesCount}</span>
        <span className="reported-devices-count"><TbDeviceImacX className="react-icons-reported" /> {reportedDevicesCount}</span>


      </div>



    </div>

  </div>);
}


export default LabCountsCard;

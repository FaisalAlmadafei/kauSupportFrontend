import React from "react";
import "../SharedCSS/DeviceCard.css";
import { PiDesktopTowerLight } from "react-icons/pi";
import { PiScreencastLight } from "react-icons/pi";
import { LuProjector } from "react-icons/lu";
import { BsProjector } from "react-icons/bs";
import { useState } from "react";
import { Alert } from "antd";



function DeviceCard({
  deviceNumber,
  type,
  deviceStatus,
  serialNumber,
  arrivalDate,
  nextPeriodicDate,
  deviceLocatedLab,
  setButtonisClicked,
  serviceType,
}) {
  const [ShowSuccessAlert, setShowSuccessAlert] = useState(false);



  function getIcon() {
    if (type.toLowerCase() == "pc") {
      return PiDesktopTowerLight;
    } else if (type.toLowerCase() == "smart board") {
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

  async function deleteDevice() {
    // Show confirmation dialog to the user
    if(window.confirm("Are you sure you want to delete this device?")) {
      var requestOptions = {
        method: "DELETE",
        redirect: "follow",
      };
  
      try {
        const response = await fetch(
          `https://kausupportapi.azurewebsites.net/api/TechnicalMember_/DeleteDeviceBySerialNumber?Serial_Number=${serialNumber}`,
          requestOptions
        );
  
        if (response.ok) {
          setShowSuccessAlert(true);
        } else if (response.status === 400) {
          alert("Problem happened");
        } else {
          alert("An error occurred. Please try again.");
        }
      } catch (error) {
        console.log("error", error);
        alert("An error occurred. Please check your connection and try again.");
      }
    } else {
      // User clicked 'Cancel', do nothing
      console.log("User canceled the deletion.");
    }
  }
  

  const Icon = getIcon();
  
  const arrival_Date = getDate(arrivalDate);
  const nextPeriodic_Date = getDate(nextPeriodicDate);
  const cardClassName = getClassName();

  return (
    <div>
      {serviceType === "newReport" ? (
        <div className={cardClassName}>
          <Icon className="react-icons-devices" />
          <br />
          <h3 className="device-number">Device {deviceNumber}</h3>
        </div>
      ) : serviceType === "searchDevice" ? (
        <>
          <div className="technical-role-device-card">
          <div onClick={() => setButtonisClicked(true)} className="continer-close-icon">x</div>     
                 <Icon className="react-icons-devicess" />
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
                Next Periodic Maintenance Date:  <br />{nextPeriodic_Date}
              </div>
            </div>
          </div>
        </>
      ):(<>
       <div className="technical-role-device-card">
                   <Icon className="react-icons-devicess" />
            <br />
            <div className="flex-row">
              <div className="technical-role-serial-number">
                Serial Number: <input className="delete-device-card-inputs" type="text" value={serialNumber} />
              </div>
              <div className="technical-role-device-type">
                Device Type:<input className="delete-device-card-inputs" type="text" value={type} />
              </div>
            </div>

            <br />
            <div className="flex-row">
              <div className="technical-role-lab-number">
                Located Lab: <input className="delete-device-card-inputs" type="text" value={deviceLocatedLab} />
              </div>
              <div className="technical-role-device-number">
                Device Number: <input className="delete-device-card-inputs" type="text" value={deviceNumber} />
              </div>
            </div>
          
              <div className="technical-role-device-status">
                Device Status: <br /><input  className="delete-device-card-inputs"type="text" value={deviceStatus} />
              </div>
              <div className="device-arrival-date">
                Arrival Date: {arrival_Date}
              </div>
           

            <div className="technical-role-flex-row">
              <div className="device-next-periodic-date">
                Next Periodic Maintenance Date: <br /> {nextPeriodic_Date}
              </div>
              <button onClick={deleteDevice} className="delete-button">Delete Device</button>
              {ShowSuccessAlert && (
        <Alert
          className="delete-alert-success"
          message="Device Deleted Successfully!"
          description=""
          type="success"
          showIcon
          closable
          onClose={() => setShowSuccessAlert(false)}
        />
      )}
            </div>
          </div></>)}

        
    </div>
  );
}

export default DeviceCard;

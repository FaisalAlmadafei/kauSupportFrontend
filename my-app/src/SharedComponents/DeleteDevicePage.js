import React from "react";
import FmNavigationBar from "./NavigationBar";
import { useState, useEffect } from "react";
import DeviceCard from "./DeviceCard";
import "../SharedCSS/DeleteDevicePage.css";
import { useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import Footer from "./Footer";

function DeleteDevicePage() {
  const [Devices, setDevices] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    getDevices();
  }, [Devices]);

  async function getDevices() {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    try {
      const response = await fetch(
        `https://kausupportapi.azurewebsites.net/api/TechnicalSupervisor_/GetDevices`,
        requestOptions
      );

      if (response.ok) {
        const result = await response.json();
        setDevices(result);
      } else if (response.status === 400) {
        alert("Problem");
      } else {
        alert("An error occurred. Please try again.");
      }
    } catch (error) {
      console.log("error", error);
      alert("An error occurred. Please check your connection and try again.");
    }
  }

  const filteredDevices = Devices.filter((device) =>
    device.serialNumber.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <FmNavigationBar
        setSearch={setSearch}
        placeholderValue={"Search by serial number"}
      />
      <div
        onClick={() => {
          navigate("/MangeDevicesPage");
        }}
        className="back-icon"
      >
        <IoIosArrowBack />
      </div>
      <div className="delete-devices-cards-container">
        {filteredDevices.map((device) => (
          <>
            <DeviceCard
              deviceNumber={device.deviceNumber}
              type={device.type}
              deviceStatus={device.deviceStatus}
              serialNumber={device.serialNumber}
              deviceLocatedLab={device.deviceLocatedLab}
              arrivalDate={device.arrivalDate}
              nextPeriodicDate={device.nextPeriodicDate}
              serviceType={"edit-device"}
            />
          </>
        ))}
      </div>
      <Footer />
    </div>
  );
}
export default DeleteDevicePage;

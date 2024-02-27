import React from "react";
import FmNavigationBar from "./NavigationBar";
import { TbDeviceDesktopPlus } from "react-icons/tb";
import { TbDeviceImacExclamation } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import Service from "./Service";
import "../SharedCSS/MangeDevicesPage.css";
import "../SharedCSS/Service.css";


function MangeDevicesPage() {
  const navigate = useNavigate();
  let services = [
    {
      serviceName: "New Device",
      icon: TbDeviceDesktopPlus,
      pageLink: "/AddDevicePage",
    },

    {
      serviceName: "Delete Device",
      icon: TbDeviceImacExclamation,
      pageLink: "/DeleteDevicePage",
    },
  ];
  return (
    <div>
      <FmNavigationBar />

      <div className="cards-Container">
        {services.map((service) => (
          <div
            key={service.serviceName}
            onClick={() => {
              navigate(service.pageLink);
            }}
          >
            <Service serviceName={service.serviceName} Icon={service.icon} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default MangeDevicesPage;

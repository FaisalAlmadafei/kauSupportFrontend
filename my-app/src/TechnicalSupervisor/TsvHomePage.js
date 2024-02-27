import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GrDocumentText } from "react-icons/gr";
import { TbDeviceDesktopSearch } from "react-icons/tb";
import { TbDeviceDesktopCheck } from "react-icons/tb";
import { TbDeviceDesktopCog } from "react-icons/tb";
import { MdHistoryEdu } from "react-icons/md";
import { RiTeamLine } from "react-icons/ri";
import Service from "../SharedComponents/Service";
import "../SharedCSS/HomePage.css";

function TsvHomePage() {
  const navigate = useNavigate();
  let services = [
    {
      serviceName: "Reports",
      icon: GrDocumentText,
      notification: "true",
      pageLink: "/SupervisorReportsPage",
    },

    {
      serviceName: "Requests",
      icon: MdHistoryEdu,
      notification: "true",
      pageLink: "/LabsPage",
    },
    {
      serviceName: "Team Progress",
      icon: RiTeamLine,
      notification: "false",
      pageLink: "/LabsPage",
    },
    {
      serviceName: "Search for a device",
      icon: TbDeviceDesktopSearch,
      notification: "false",
      pageLink: "/SearchDevicePage",
    },
    {
      serviceName: "Manage Devices",
      icon: TbDeviceDesktopCog,
      notification: "false",
      pageLink: "/MangeDevicesPage",
    },
    {
      serviceName: "Devices Availability",
      icon: TbDeviceDesktopCheck,
      notification: "false",
      pageLink: "/DevicesAvailabilityPage",
    },
  ];
  const [search, setSearch] = useState("");

  const filteredServices = services.filter((service) =>
    service.serviceName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="navBar">
        <input
          type="text"
          placeholder="Serach for a service"
          className="search-bar"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="pagee-container">
        <div className="card-Container">
          {filteredServices.map((service) => (
            <div
              key={service.serviceName}
              onClick={() => {
                navigate(service.pageLink);
              }}
            >
              <Service
                serviceName={service.serviceName}
                notification={service.notification}
                Icon={service.icon}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TsvHomePage;

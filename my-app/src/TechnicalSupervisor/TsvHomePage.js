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
import { useContext ,useEffect } from "react";
import { LoginContext } from "../App";
import Notifications from "../SharedComponents/Notifications";

function TsvHomePage() {
  const [reportsNotifications, setreportsNotifications] = useState("");
  const [requestsNotifications, setrequestsNotifications] = useState("");
 

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
      pageLink: "/SupervisorRequestsPage",
    },
    {
      serviceName: "Team Progress",
      icon: RiTeamLine,
      notification: "false",
      pageLink: "/SupervisorRequestsPage",
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
      <Notifications reportsNotifications={reportsNotifications} setreportsNotifications={setreportsNotifications} requestsNotifications={requestsNotifications} setrequestsNotifications = {setrequestsNotifications}/>
      
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
                reportsNotifications={reportsNotifications}
                requestsNotifications={requestsNotifications}
               
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

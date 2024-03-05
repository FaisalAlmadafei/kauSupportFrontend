import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GrDocumentText } from "react-icons/gr";
import { TbDeviceDesktopSearch } from "react-icons/tb";
import { TbDeviceDesktopCheck } from "react-icons/tb";
import { TbDeviceDesktopCog } from "react-icons/tb";
import { MdHistoryEdu } from "react-icons/md";
import { RiTeamLine } from "react-icons/ri";
import { IoStatsChart } from "react-icons/io5";

import Service from "../SharedComponents/Service";
import "../SharedCSS/HomePage.css";
import { useContext ,useEffect } from "react";
import { LoginContext } from "../App";
import Notifications from "../SharedComponents/Notifications";
import Footer from "../SharedComponents/Footer";
import NavigationBar from "../SharedComponents/NavigationBar";

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
      serviceName: "DashBoard",
      icon: IoStatsChart,
      notification: "false",
      pageLink: "/DashBoardPage",
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
      <NavigationBar  setSearch={setSearch} placeholderValue={"Search for a service"} />
      
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
        <Footer />
      </div>
    </div>
  );
}

export default TsvHomePage;

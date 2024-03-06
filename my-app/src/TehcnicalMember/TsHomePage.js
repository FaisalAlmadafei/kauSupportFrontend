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
import Footer from "../SharedComponents/Footer";
import NavigationBar from "../SharedComponents/NavigationBar";
import { ServicesContext } from "../App";

function TsHomePage() {
  const { services } = useContext(ServicesContext);
  const [reportsNotifications, setreportsNotifications] = useState("");
  const [requestsNotifications, setrequestsNotifications] = useState("");
 

  const navigate = useNavigate();


   
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
             service.serviceName !== "Home" ? ( <div
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
            </div>):(<></>)
           
          ))}
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default TsHomePage;

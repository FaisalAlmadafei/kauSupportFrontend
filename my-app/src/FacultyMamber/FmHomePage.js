import React from "react";
import { GoReport } from "react-icons/go";
import { FaHistory } from "react-icons/fa";
import { MdMiscellaneousServices } from "react-icons/md";
import { MdHistoryEdu } from "react-icons/md";
import { TbDeviceDesktopCheck } from "react-icons/tb";
import Service from "../SharedComponents/Service";
import "../FacultyMemberCSS/FmHomePage.css";

function FmHomePage() {
  let services = [
    { serviceName: "New Report", icon: GoReport },
    { serviceName: "Previous Reports", icon: FaHistory },
    { serviceName: "Request a Service", icon: MdMiscellaneousServices },
    { serviceName: "My Requests", icon: MdHistoryEdu },
    { serviceName: "Devices Availability", icon: TbDeviceDesktopCheck },
  ];
  return (
    <div>
      
      <div className="cardContainer">

      <Service serviceName={services[0].serviceName} Icon={services[0].icon} />



      </div>



    </div>


  );
}

export default FmHomePage;

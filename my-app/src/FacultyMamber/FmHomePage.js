import React from "react";
import { useNavigate } from "react-router-dom";
import { GoReport } from "react-icons/go";
import { FaHistory } from "react-icons/fa";
import { MdMiscellaneousServices } from "react-icons/md";
import { MdHistoryEdu } from "react-icons/md";
import { TbDeviceDesktopCheck } from "react-icons/tb";
import Service from "../SharedComponents/Service";
import "../FacultyMemberCSS/FmHomePage.css";

function FmHomePage() {
  const navigate = useNavigate();
  let services = [
    { serviceName: "New Report", icon: GoReport, pageLink: "/LabsPage" },
    { serviceName: "Previous Reports", icon: FaHistory, pageLink: "/LabsPage" },
    {
      serviceName: "Request a Service",
      icon: MdMiscellaneousServices,
      pageLink: "/LabsPage",
    },
    { serviceName: "My Requests", icon: MdHistoryEdu, pageLink: "/LabsPage" },
    {
      serviceName: "Devices Availability",
      icon: TbDeviceDesktopCheck,
      pageLink: "/LabsPage",
    },
  ];

  return (
    <div>
    
      <div className='navBar'>
        
        </div>
       <div className="card-Container">
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

export default FmHomePage;

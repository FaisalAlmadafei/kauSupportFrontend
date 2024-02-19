import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { NewReportContext } from "../App";
import { ServicesContext } from "../App";
import { GoReport } from "react-icons/go";
import { FaHistory } from "react-icons/fa";
import { MdMiscellaneousServices } from "react-icons/md";
import { MdHistoryEdu } from "react-icons/md";
import { TbDeviceDesktopCheck } from "react-icons/tb";
import DevicesAvailabilityPage from "../SharedComponents/DevicesAvailabilityPage";
import Service from "../SharedComponents/Service";
import "../SharedCSS/HomePage.css";
// this is a comment
function FmHomePage() {
  const navigate = useNavigate();
  const {LabNumber , setLabNumber} = useContext(NewReportContext);
 

  let services = [
   
    { serviceName: "New Report", icon: GoReport, pageLink: "/LabsPage" },
    { serviceName: "Previous Reports", icon: FaHistory, pageLink: "/PreviousReportsPage"},
    {
      serviceName: "Request a Service",
      icon: MdMiscellaneousServices,
      pageLink: "/LabsPage",
    },
    { serviceName: "My Requests", icon: MdHistoryEdu, pageLink: "/LabsPage" },
    {
      serviceName: "Devices Availability",
      icon: TbDeviceDesktopCheck,
      pageLink: "/DevicesAvailabilityPage",
    },
  ];

  


  const [search, setSearch] = useState("");
  
  const filteredServices = services.filter(service => service.serviceName.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
    
      <div className="navBar">
        <input type="text" placeholder="Serach for a service" className="search-bar" onChange={(e) => setSearch(e.target.value)}/>
        </div>
       <div className="card-Container">
         {filteredServices.map((service) => (
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

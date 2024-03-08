import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { NewReportContext } from "../App";
import { GoReport } from "react-icons/go";
import { FaHistory } from "react-icons/fa";
import { MdMiscellaneousServices } from "react-icons/md";
import { MdHistoryEdu } from "react-icons/md";
import { TbDeviceDesktopCheck } from "react-icons/tb";
import DevicesAvailabilityPage from "../SharedComponents/DevicesAvailabilityPage";
import Service from "../SharedComponents/Service";
import "../SharedCSS/HomePage.css";
import Footer from "../SharedComponents/Footer";
import NavigationBar from "../SharedComponents/NavigationBar";
import { ServicesContext } from "../App";

function FmHomePage() {
  const { services } = useContext(ServicesContext);

  const navigate = useNavigate();

  const [search, setSearch] = useState("");

  const filteredServices = services.filter((service) =>
    service.serviceName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <NavigationBar setSearch={setSearch} placeholderValue={"Search for a service"} />

      <div className="card-Container">
        {filteredServices.map((service) => (
          service.serviceName !== "Home" ? (<div
            key={service.serviceName}
            onClick={() => {
              navigate(service.pageLink);
            }}
          >
            <Service serviceName={service.serviceName} Icon={service.icon} />
          </div>) : (<></>)

        ))}
      </div>
      <Footer />
    </div>
  );
}

export default FmHomePage;

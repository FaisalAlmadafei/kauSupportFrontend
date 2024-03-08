import React from "react";
import { useEffect, useState } from "react";
import "../SharedCSS/LabsPage.css";
import { useNavigate } from "react-router-dom";
import LabCountsCard from "./LabCountsCard";
import { useContext } from "react";
import { NewReportContext } from "../App";
import FmNavigationBar from "./NavigationBar";
import { Spin } from "antd";
import { IoIosArrowBack } from "react-icons/io";
import Footer from "./Footer";
import "../SharedCSS/HomePage.css";
function DevicesAvailabilityPage() {
  const { LabNumber, setLabNumber } = useContext(NewReportContext);
  const [ShowSpinner, setShowSpinner] = useState(false);

  const [Labs, setLabs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function checkAvailability() {
      setShowSpinner(true);
      var requestOptions = {
        method: "GET",
        redirect: "follow",
      };

      try {
        const response = await fetch(
          `https://kausupportapi.azurewebsites.net/api/FacultyMember_/GetLabsWithDeviceCounts`,
          requestOptions
        );

        if (response.ok) {
          const result = await response.json();
          console.log(result);
          setLabs(result);
          setShowSpinner(false);
        } else if (response.status === 400) {
        } else {
          alert("An error occurred. Please try again.");
        }
      } catch (error) {
        console.log("error", error);
        alert("An error occurred. Please check your connection and try again.");
      }
    }
    checkAvailability();
  }, []);

  const [search, setSearch] = useState("");
  const filteredLabs = Labs.filter((Lab) =>
    Lab.labNumber.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <FmNavigationBar
        setSearch={setSearch}
        placeholderValue={"search for a lab"}
      />
      <div
        onClick={() => {
          navigate("/Home");
        }}
        className="back-icon"
      >
        <IoIosArrowBack />
      </div>
      {ShowSpinner && <Spin className="spin" size="large" />}




      <div className="card-Container">
        {filteredLabs.map((Lab) => (
          <div
            key={Lab.labNumber}
            onClick={() => {
              setLabNumber(Lab.labNumber);
              navigate("/LabDevicesPage");
            }}
          >
            <LabCountsCard
              labNumber={Lab.labNumber}
              reportedDevicesCount={Lab.reportedDevicesCount}
              workingDevicesCount={Lab.workingDevicesCount}
              capacity={Lab.capacity}
            />
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default DevicesAvailabilityPage;

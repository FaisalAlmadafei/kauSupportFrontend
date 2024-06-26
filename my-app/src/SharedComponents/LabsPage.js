import React from "react";
import { useEffect, useState } from "react";
import LabCard from "./LabCard";
import "../SharedCSS/LabsPage.css";
import { useNavigate } from "react-router-dom";
import { BsDoorOpen } from "react-icons/bs";
import { useContext } from "react";
import { NewReportContext, ServicesContext } from "../App";
import NavigationBar from "./NavigationBar";
import { IoIosArrowBack } from "react-icons/io";
import "../SharedCSS/HomePage.css";
import Footer from "./Footer";

function LabsPage() {
  const { LabNumber, setLabNumber } = useContext(NewReportContext);
  const { PreviousPage, setPreviousPage } = useContext(ServicesContext);
  const [Labs, setLabs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function getLabs() {
      setPreviousPage("LabsPage");
      var requestOptions = {
        method: "GET",
        redirect: "follow",
      };

      try {
        const response = await fetch(
          `https://kausupportapi.azurewebsites.net/api/FacultyMember_/GetLabs`,
          requestOptions
        );

        if (response.ok) {
          const result = await response.json();
          console.log(result);
          setLabs(result);
        } else if (response.status === 400) {
        } else {
          alert("An error occurred. Please try again.");
        }
      } catch (error) {
        console.log("error", error);
        alert("An error occurred. Please check your connection and try again.");
      }
    }
    getLabs();
  }, []);

  const [search, setSearch] = useState("");
  const filteredLabs = Labs.filter((Lab) =>
    Lab.labNumber.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <NavigationBar
        setSearch={setSearch}
        placeholderValue={"Search for a lab"}
      />
      <div
        onClick={() => {
          navigate("/Home");
        }}
        className="back-icon"
      >
        <IoIosArrowBack />
      </div>
      <div className="Labs-cards-container">
        <div className="card-Container">
          {filteredLabs.map((Lab) => (
            <div
              key={Lab.labNumber}
              onClick={() => {
                setLabNumber(Lab.labNumber);
                navigate("/LabDevicesPage");
              }}
            >
              <LabCard labNumber={Lab.labNumber} Icon={BsDoorOpen} />
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default LabsPage;

import React from "react";
import { useEffect, useState } from "react";
import LabCard from "./LabCard";
import "../SharedCSS/LabsPage.css";
import { useNavigate } from "react-router-dom";
import { BsDoorOpen } from "react-icons/bs";
import { useContext } from "react";
import { NewReportContext } from "../App";
import FmNavigationBar from "../FacultyMamber/FmNavigationBar";
import "../SharedCSS/HomePage.css";



function LabsPage() {
  const {LabNumber , setLabNumber} = useContext(NewReportContext);
  const [Labs, setLabs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function handel() {
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
    handel();
  }, []);

  const [search, setSearch] = useState("");
  const filteredLabs = Labs.filter(Lab => Lab.labNumber.toLowerCase().includes(search.toLowerCase()));


  return (
    <div>
    
   
        <FmNavigationBar setSearch={setSearch}/>
        
    
        
       <div className="card-Container">
         {filteredLabs.map((Lab) => (
           <div
             key={Lab.labNumber}
             onClick={() => {
              setLabNumber(Lab.labNumber)
               navigate("/LabDevicesPage");
             }}
           >
             <LabCard labNumber={Lab.labNumber} Icon={BsDoorOpen} />
           </div>
         ))}
        
       </div>
      </div>
  );
}

export default LabsPage;

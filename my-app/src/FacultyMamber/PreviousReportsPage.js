import React from "react";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { LoginContext } from "../App";
import MyReportCard from "./MyReportCard";
import FmNavigationBar from "./FmNavigationBar";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { Button, Result } from "antd";
import "../FacultyMemberCSS/MyReportCard.css";



function PreviousReportsPage() {
  const [userID] = useContext(LoginContext);
  const [myReports, setmyReports] = useState([]);
  const navigate = useNavigate();

  
  useEffect(() => {
    async function getMyReports() {
      var requestOptions = {
        method: "GET",
        redirect: "follow",
      };

      try {
        const response = await fetch(
          `https://kausupportapi.azurewebsites.net/api/FacultyMember_/GetMyReports?User_Id=${userID}`,
          requestOptions
        );

        if (response.ok) {
          const result = await response.json();
          setmyReports(result);
        } else if (response.status === 400) {
          <Result
          className="no-report-picture"
          status="500"
          title="No report found"
          subTitle="Sorry, No Report Found"
          extra={
            <Button
              on
              onClick={() => {
                navigate("/Home");
              }}
              type="primary"
            >
              Back Home
            </Button>
          }
        />
        } else {
          alert("An error occurred. Please try again.");
        }
      } catch (error) {
        console.log("error", error);
        alert("An error occurred. Please check your connection and try again.");
      }
    }
    getMyReports();
  }, []);
  const [search, setSearch] = useState("");
  const filteredReports = myReports.filter((Report) =>
    Report.reportID.toString().toLowerCase().includes(search.toLowerCase())
  );
  
  return (
    <div>
     
        <FmNavigationBar setSearch={setSearch}/>
      

        <div onClick={()=>{navigate("/Home")}} className="back-icon">
        <IoIosArrowBack/>


        </div>
        
      
      
        {filteredReports.map((Report) => (
          <MyReportCard
            reportID={Report.reportID}
            deviceNumber={Report.deviceNumber}
            deviceLocatedLab={Report.deviceLocatedLab}
            problemDescription={Report.problemDescription}
            actionTaken={Report.actionTaken}
            reportDate={Report.reportDate}
            repairDate={Report.repairDate} 
            reportStatus={Report.reportStatus}
          
          />
        ))}
    
    </div>
  );
}

export default PreviousReportsPage;

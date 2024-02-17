import React from "react";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { LoginContext } from "../App";
import MyReportCard from "./MyReportCard";
function PreviousReportsPage() {
  const [userID] = useContext(LoginContext);
  const [myReports, setmyReports] = useState([]);
  useEffect(() => {
    async function getMyReports() {
      var requestOptions = {
        method: "GET",
        redirect: "follow",
      };

      try {
        const response = await fetch(
          `https://kausupportapi.azurewebsites.net/api/FacultyMember_/GetMyReports?User_Id=1111111`,
          requestOptions
        );

        if (response.ok) {
          const result = await response.json();
          setmyReports(result);
        } else if (response.status === 400) {
          alert("Problem happend");
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
  return (
    <div>
      <div className="reports-card-container">
        {myReports.map((Report) => (
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
    </div>
  );
}

export default PreviousReportsPage;

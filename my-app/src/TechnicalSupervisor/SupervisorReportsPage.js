import React from "react";
import NavigationBar from "../SharedComponents/NavigationBar";
import { useEffect, useState } from "react";
import { Alert } from "antd";
import MyReportCard from "../SharedComponents/MyReportCard";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { Button, Result } from "antd";
import "../SharedCSS/MyReportCard.css";
import Footer from "../SharedComponents/Footer";

function SupervisorReportsPage() {
  const [myReports, setmyReports] = useState([]);
  const [ShowNoReports, setShowNoReports] = useState(false);
  const [showAssignedAlert, setshowAssignedAlert] = useState(false);
  const [showNoTeamMemberAlert, setshowNoTeamMemberAlert] = useState(false);
  const [showReportHandledAlert, setshowReportHandledAlert] = useState(false);
  const [showNoActionTakenAlert, setshowNoActionTakenAlert] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    getReports();
  }, []);
  async function getReports() {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    try {
      const response = await fetch(
        `https://kausupportapi.azurewebsites.net/api/TechnicalSupervisor_/GetNewReportsForSupervisor`,
        requestOptions
      );

      if (response.ok) {
        const result = await response.json();
        setmyReports(result);
      } else if (response.status === 400) {
        setShowNoReports(true);
      } else {
        alert("An error occurred. Please try again.");
      }
    } catch (error) {
      console.log("error", error);
      alert("An error occurred. Please check your connection and try again.");
    }
  }
  const [search, setSearch] = useState("");
  const filteredReports = myReports.filter((Report) =>
    Report.reportID.toString().toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <NavigationBar
        setSearch={setSearch}
        placeholderValue={"Search a report by ID"}
      />

      <div
        onClick={() => {
          navigate("/Home");
        }}
        className="back-icon"
      >
        <IoIosArrowBack />
      </div>

      {showAssignedAlert && (
        <Alert
          className="report-alert-success"
          message="Report Assigned Successfully!"
          type="success"
          showIcon
          closable
          onClose={() => setshowAssignedAlert(false)}
        />
      )}

      {showReportHandledAlert && (
        <Alert
          className="report-alert-success"
          message="Report Handled Successfully!"
          type="success"
          showIcon
          closable
          onClose={() => setshowAssignedAlert(false)}
        />
      )}

      {showNoTeamMemberAlert && (
        <Alert
          className="report-alert-warning"
          message="Please chose a team member to assign report"
          description="Please try again."
          type="warning"
          showIcon
          closable
          onClose={() => setshowNoTeamMemberAlert(false)}
        />
      )}

      {showNoActionTakenAlert && (
        <Alert
          className="report-alert-warning"
          message="Please add action taken on this report"
          description="Please try again."
          type="warning"
          showIcon
          closable
          onClose={() => setshowNoActionTakenAlert(false)}
        />
      )}
      
      {ShowNoReports && (
        <>
          <div className="no-reports-container">
            <Result
              className="no-reports-picture"
              status="500"
              title="No Reports found"
              subTitle="There are no new reports yet..."
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
          </div>
        </>

      )}
      <div className="supervisor-reports-container">
        {filteredReports.map((Report) => (
          <MyReportCard
            key={Report.reportID}
            {...Report}
            serviceType={"Supervisor reports"}
            setmyReports={setmyReports}
            myReports={myReports}
            setshowAssignedAlert={setshowAssignedAlert}
            setshowNoTeamMemberAlert={setshowNoTeamMemberAlert}
            setshowReportHandledAlert={setshowReportHandledAlert}
            setshowNoActionTakenAlert={setshowNoActionTakenAlert}
          />
        ))}
      </div>
      <Footer />
    </>
  );
}

export default SupervisorReportsPage;

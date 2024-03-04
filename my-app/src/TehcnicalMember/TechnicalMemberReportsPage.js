import React from "react";
import NavigationBar from "../SharedComponents/NavigationBar";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { LoginContext } from "../App";
import MyReportCard from "../SharedComponents/MyReportCard";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { Button, Result } from "antd";
import "../SharedCSS/MyReportCard.css";
import Footer from "../SharedComponents/Footer";

function TechnicalMemberReportsPage(){
    const [myReports, setmyReports] = useState([]);
    const [ShowNoReports, setShowNoReports] = useState(false);
    const [userID] = useContext(LoginContext);

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
          `https://kausupportapi.azurewebsites.net/api/TechnicalMember_/GetReportsByTechnicalMemberID?User_Id=${userID}`,
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
        <NavigationBar setSearch={setSearch} placeholderValue={"Search a report by ID"}/>
  
        <div
          onClick={() => {
            navigate("/Home");
          }}
          className="back-icon"
        >
          <IoIosArrowBack />
        </div>
  
        {ShowNoReports && (
          <Result
            className="no-reports-picture"
            status="500"
            title="No Reports found"
            subTitle="Sorry, You have not report any device yet..."
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
        )}
         <div className="supervisor-reports-container"> 
        {filteredReports.map((Report) => (
          <MyReportCard
            key={Report.reportID}
            {...Report}
            serviceType={"Technical member reports"}
            setmyReports={setmyReports}
            myReports={myReports}
          />
        ))}
          </div>
  <Footer/>
  
      </>
      
    );
  }

export default TechnicalMemberReportsPage;

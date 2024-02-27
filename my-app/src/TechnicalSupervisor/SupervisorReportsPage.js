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
import HandleReportForm from "../SharedComponents/HandleReportForm";

function SupervisorReportsPage() {
    const [userID] = useContext(LoginContext);
    const [myReports, setmyReports] = useState([]);
    const [ShowNoReports, setShowNoReports] = useState(false);
    const [HandleButtonisClicked, setHandleButtonisClicked] = useState(false);
    const navigate = useNavigate();

    function closeForm(){
      setHandleButtonisClicked(false) ; 
    }
  
    
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
           setShowNoReports(true) ; 
  
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
      <div>
       
          <NavigationBar setSearch={setSearch}/>
        
  
          <div onClick={()=>{navigate("/Home")}} className="back-icon">
          <IoIosArrowBack/>
  
  
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
          
          {HandleButtonisClicked &&(
            <HandleReportForm closeForm={closeForm} />
          )}
        
        
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
              problemType={Report.problemType}
              serviceType={"Supervisor reports"}
              setmyReports={setmyReports}
              myReports={myReports}
              setHandleButtonisClicked={setHandleButtonisClicked}
             
            
            />
          ))}
      
      </div>
    );
  }

export default SupervisorReportsPage;

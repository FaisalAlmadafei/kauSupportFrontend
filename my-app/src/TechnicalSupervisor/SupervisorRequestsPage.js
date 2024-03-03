import React from "react";
import NavigationBar from "../SharedComponents/NavigationBar";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { useContext } from "react";
import { LoginContext } from "../App";
import { Button, Result } from "antd";
import MyRequest from "../FacultyMember/MyRequestsPage";
import MyRequestsCard from "../SharedComponents/MyRequestsCard";
import { GoContainer } from "react-icons/go";
import "../SharedCSS/SupervisorRequestsPage.css";
import Footer from "../SharedComponents/Footer";

function SupervisorRequestsPage() {
  const [userID] = useContext(LoginContext);
  const [myRequests, setmyRequests] = useState([]);
  const [ShowNoRequests, setShowNoRequests] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getRequests();
  }, []);
  async function getRequests() {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    try {
      const response = await fetch(
        `https://kausupportapi.azurewebsites.net/api/TechnicalSupervisor_/GetNewRequestByUserId?User_Id=${userID}`,
        requestOptions
      );

      if (response.ok) {
        const result = await response.json();
        setmyRequests(result);
      } else if (response.status === 400) {
        setShowNoRequests(true);
      } else {
        alert("An error occurred. Please try again.");
      }
    } catch (error) {
      console.log("error", error);
      alert("An error occurred. Please check your connection and try again.");
    }
  }
  const [search, setSearch] = useState("");
  const filteredRequests = myRequests.filter((Request) =>
    Request.requestID.toString().toLowerCase().includes(search.toLowerCase())
  );
  return (
    <div>
      <NavigationBar setSearch={setSearch} placeholderValue={"search for a request by ID"}/>
      <div
        onClick={() => {
          navigate("/Home");
        }}
        className="back-icon"
      >
        <IoIosArrowBack />
      </div>
      {ShowNoRequests && (
        <Result
          
          className="no-reports"
          status="500"
          title="No Requests Found"
          subTitle="There are no new requests yet..."
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

<div className="my-request-container"> 
      {filteredRequests.map((Request) => (
        <MyRequestsCard
          key={Request.requestID}
          {...Request}
          serviceType={"Supervisor Requests"}
          setmyRequests={setmyRequests}
          myRequests={myRequests}
          
        />
      ))}
      </div>

      <Footer/>
     
    </div>
  );
}

export default SupervisorRequestsPage;

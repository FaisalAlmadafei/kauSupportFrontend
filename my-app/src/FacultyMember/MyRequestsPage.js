import React from "react";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { LoginContext } from "../App";
import { useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { Button, Result } from "antd";
import MyRequestsCard from "../SharedComponents/MyRequestsCard";
import FmNavigationBar from "../SharedComponents/NavigationBar";
import "../FacultyMemberCSS/MyRequest.css";



function MyRequest() {
  const [userID] = useContext(LoginContext);
  const [myRequests, setmyRequests] = useState([]);
  const [ShowNoRequests, setShowNoRequests] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function getMyRequests() {
      var requestOptions = {
        method: "GET",
        redirect: "follow",
      };

      try {  
        const response = await fetch(
          `https://kausupportapi.azurewebsites.net/api/FacultyMember_/GetMyRequests?User_Id=${userID}`,
          requestOptions
        );

        if (response.ok) {
          const result = await response.json();
          setmyRequests(result);
        } else if (response.status === 400) {
         setShowNoRequests(true)
        } else {
          alert("An error occurred. Please try again.");
        }
      } catch (error) {
        console.log("error", error);
        alert("An error occurred. Please check your connection and try again.");
      }
    }
    getMyRequests();
  }, []);
  const [search, setSearch] = useState("");
  const filteredRequests = myRequests.filter((Request) =>
    Request.requestID.toString().toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>

      
        <FmNavigationBar setSearch={setSearch} placeholderValue={"search for a request by ID"}/>
        
      {ShowNoRequests && (
        <Result
          className="no-requests-picture"
          status="500"
          title="No Requests found"
          subTitle="Sorry, You have not sent any requests yet..."
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
        
      
      <div
        onClick={() => {
          navigate("/Home");
        }}
        className="back-icon"
      >
        <IoIosArrowBack  />
      </div>
     
      <div className="my-request-container"> 
        {filteredRequests.map((Request) => (
          <MyRequestsCard
            requestID={Request.requestID}
            requestStatus={Request.requestStatus}
            technicalSupportReply={Request.technicalSupportReply}
            request={Request.request}
          />
        ))}
      </div>
    </div>
  );
}

export default MyRequest;

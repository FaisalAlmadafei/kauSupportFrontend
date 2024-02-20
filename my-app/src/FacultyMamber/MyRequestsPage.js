import React from "react";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { LoginContext } from "../App";
import { useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import MyRequestsCard from "./MyRequestsCard";
import FmNavigationBar from "./FmNavigationBar";

function MyRequest() {
  const [userID] = useContext(LoginContext);
  const [myRequests, setmyRequests] = useState([]);
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
          alert("Problem happend");
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
      <div className="navBar">
        <input
          type="text"
          placeholder="Serach for a service"
          className="search-bar"
        />
        <FmNavigationBar setSearch={setSearch} />
      </div>
      <div
        onClick={() => {
          navigate("/Home");
        }}
        className="back-icon"
      >
        <IoIosArrowBack />
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

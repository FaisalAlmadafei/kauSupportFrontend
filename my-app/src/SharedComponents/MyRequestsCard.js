import React from "react";
import "../FacultyMemberCSS/MyRequest.css";
import { Select } from "antd";
import { useState } from "react";
import HandleRequestForm from "./HandleRequestForm";


function MyRequestsCard({
  requestID,
  requestStatus,
  technicalSupportReply,
  request,
  serviceType,
  setmyRequests,
  myRequests
}) {

  const [Team, setTeam] = useState([]);
  const [AssignedToId, setAssignedToId] = useState("");
  const [HandleButtonisClicked, setHandleButtonisClicked] = useState(false);

  
  function closeForm() {
    setHandleButtonisClicked(false);
  }


  if (serviceType == "Supervisor Requests") {
    getTeamMembers();
  }

  async function getTeamMembers() {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    try {
      const response = await fetch(
        `https://kausupportapi.azurewebsites.net/api/UserVerification_/GetTechnicalMembers`,
        requestOptions
      );

      if (response.ok) {
        const result = await response.json();
        setTeam(result);
      } else if (response.status === 400) {
        alert("No Team members found!");
      } else {
        alert("An error occurred. Please try again.");
      }
    } catch (error) {
      console.log("error", error);
      //  alert("An error occurred. Please check your connection and try again.");
    }
  }

  async function assignRequest() {
    if(AssignedToId !==""){
      //setShowSpinner(true) ; 
      var requestOptions = {
        method: "PUT",
        redirect: "follow",
      };
  
      try {
        const response = await fetch(
          `https://kausupportapi.azurewebsites.net/api/TechnicalSupervisor_/AssignRequest?User_Id=${AssignedToId}&Request_Id=${requestID}`,
          requestOptions
        );
  
        if (response.ok) {
          
          alert("Request assigned successfully");
  
         const filteredRequests = myRequests.filter(
            (request) => request.requestID !== requestID
          );
          setmyRequests(filteredRequests);
          setAssignedToId("");
        } else if (response.status === 400) {
          alert("Could not assign Request");
        } else {
          alert("An error occurred. Please try again.");
        }
      } catch (error) {
        console.log("error", error);
        alert("An error occurred. Please check your connection and try again.");
      }

    }
    else{
      alert("Please chose a team member to assign request")
    }
   
  }


  function getClassName() {
    if (requestStatus.toLowerCase() === "pending") {
      return "my-request-status-pending";
    } else if (requestStatus.toLowerCase() === "approved") {
      return "my-request-status-approved";
    } else {
      return "my-request-status-rejected";
    }
  }
  const statusClass = getClassName();

  return (
    <div>
      <div className="my-request-card">
        <span className={statusClass}> {requestStatus}</span>
        <br />
        <br />

        <span className="my-request-id">Request ID: {requestID}</span>
        <div style={{ fontSize: "18px" }}>Request</div>
        <div className="request-description-container">{request}</div>
        {technicalSupportReply != null ? (
          <>
            <div style={{ fontSize: "18px" }}>Technical Support Response</div>
            <div className="request-description-container">
              {technicalSupportReply}
            </div>
          </>
        ) : (
          <></>
        )}

        {serviceType == "Supervisor Requests" ? (
          <>
            <div className="assign-part">
                <button onClick={assignRequest} className="assign-button" >
                  Assign Request
                </button>
                <Select
                  style={{
                    width: 140,
                    height: 25,
                    margin: 10,
                  }}
                  onChange={(value) => {
                    setAssignedToId(value);
                  }}
                  options={Team.map((TeamMember) => ({
                    label: `${TeamMember.firstName} ${TeamMember.lastName}`,
                    value: TeamMember.userId,
                  }))}
                />
              </div>
            
          </>
        ) : (
          <></>
        )}

{serviceType == "Supervisor Requests" || serviceType == "Technical member requests" ? (
          <>
             <button
               onClick={() => {
                setHandleButtonisClicked(true);
              }}
               
                className="handle-button"
              >
                Handle Request
              </button>
              {HandleButtonisClicked && (
                <HandleRequestForm closeForm={closeForm} requestID={requestID} setmyRequests={setmyRequests} myRequests={myRequests} />
              )}
          </>
        ) : (
          <></>
        )}

      </div>
    </div>
  );
}

export default MyRequestsCard;

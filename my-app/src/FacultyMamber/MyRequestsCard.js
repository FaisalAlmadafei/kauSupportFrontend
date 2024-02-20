import React from "react";
import "../FacultyMemberCSS/MyRequest.css";


function MyRequestsCard({
  requestID,
  requestStatus,
  technicalSupportReply,
  request
}) {
     function getStepNumber(){
    if(requestStatus === "Pending"){
     return 1 ; 
    }
    // TODO:
    // complete based on the datebase
    else if(requestStatus === "in process"){
    return 2 ;
    }
  
    else {
      return 3;
    }
  
   }
   const step = getStepNumber() ; 
   
  return (
    <div className="my-request-page">
      <div className="my-request-container">
      <span className="my-request-id">Request ID: {requestID}</span>
      </div>
      <div className="my-request-description">
        <span>Request Description: {request}</span>
      </div>
      <div className="ts-reply"> 
      <span>Technical Support Reply: {technicalSupportReply}</span>
      </div>
      <div className="my-request-status">
        <span>Request Status: {requestStatus}</span>
      </div>
    </div>
  )
}

export default MyRequestsCard
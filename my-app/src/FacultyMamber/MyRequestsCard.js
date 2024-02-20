import React from "react";
import "../FacultyMemberCSS/MyRequest.css";

function MyRequestsCard({
  requestID,
  requestStatus,
  technicalSupportReply,
  request,
}) {
  function getClassName() {

    if (requestStatus.toLowerCase() === "pending") {
      return "my-request-status-pending" ; 
    }
    // TODO:
    // complete based on the datebase
    else if (requestStatus.toLowerCase() === "approved") {
      return "my-request-status-approved" ;
    } else {
      return "my-request-status-rejected" ;
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
      </div>
    </div>
  );
}

export default MyRequestsCard;

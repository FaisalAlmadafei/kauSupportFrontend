import React from "react";
import "../FacultyMemberCSS/FmHomePage.css";

function FmService({serviceName, Icon}) {
  return (
   <div>

    <div className="card">
     <Icon/>
     <h3>{serviceName}</h3>

    </div>





   </div>


  );
}

export default FmService;

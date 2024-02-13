import React from "react";
import "../FacultyMemberCSS/FmHomePage.css";

function Service({serviceName, Icon}) {
  return (
   <div>

    <div className="card">
     <Icon/>
     <h3>{serviceName}</h3>

    </div>





   </div>


  );
}

export default Service;

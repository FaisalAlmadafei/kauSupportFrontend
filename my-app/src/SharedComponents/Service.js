import React from "react";
import "../SharedCSS/Service.css";

function Service({serviceName, Icon}) {
  return (
   <div >

    <div className="card">
     <Icon className="react-icons" />
     <br />
     <h3>{serviceName}</h3>

    </div>





   </div>


  );
}

export default Service;

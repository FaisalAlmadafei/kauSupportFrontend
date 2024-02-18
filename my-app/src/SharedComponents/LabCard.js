import React from "react";
import "../SharedCSS/LabCard.css";

function LabCard({ labNumber , Icon }) {
    
  return (<div>
  
    <div className="lab-card">
    <Icon className="react-icons" />
    <br />
    <h3 className="lab-card-number">Lab {labNumber}</h3>

   </div>
  
</div>);
}

export default LabCard;

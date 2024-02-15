import React from "react";
import "../SharedCSS/Service.css";

function Service({ serviceName, notification, Icon }) {
  let reportsNotifications = 3 ; 
  let requsetsNotifications = 2;
  let Notifications ; 
  if (notification === "true") {
    Notifications = serviceName === "Reports" ? reportsNotifications : requsetsNotifications; 
  }
  return (
    <div>
      {notification == "true" ? (
        <div className="card">
        <div className="notification">{Notifications}</div>
        <Icon className="react-icons" />
        <br />
        <h3 className="service-name">{serviceName}</h3>
   
       </div>
      ) : (
        <div className="card">
          <Icon className="react-icons" />
          <br />
          <h3 className="service-name">{serviceName}</h3>
        </div>
      )}
    </div>
  );
}

export default Service;

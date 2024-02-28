import React from "react";
import "../SharedCSS/Service.css";
import { useEffect, useState } from "react";

function Service({ serviceName, notification, Icon }) {
  const [reportsNotifications, setreportsNotifications] = useState("");

  useEffect(() => {
   
    getReportsNotifications();
  }, [reportsNotifications]);

  async function getReportsNotifications() {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    try {
      const response = await fetch(
        `https://kausupportapi.azurewebsites.net/api/TechnicalMember_/GetReportsNotificationsByUserId?User_Id=3333333`,
        requestOptions
      );

      if (response.ok) {
        const result = await response.json();
        setreportsNotifications(result) ; 
       
        
      } else if (response.status === 400) {
      } else {
        alert("An error occurred. Please try again.");
      }
    } catch (error) {
      console.log("error", error);
      alert("An error occurred. Please check your connection and try again.");
    }
  }

  

  let requsetsNotifications = 2;
  let Notifications=  serviceName === "Reports" ? reportsNotifications : requsetsNotifications; ; 

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

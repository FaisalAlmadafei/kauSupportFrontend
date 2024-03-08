import React from "react";
import "../SharedCSS/Service.css";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { LoginContext } from "../App";

function Service({ serviceName, notification, Icon, reportsNotifications, requestsNotifications }) {






  let Notifications = serviceName === "Reports" ? reportsNotifications : requestsNotifications;;

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

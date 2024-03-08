import React from "react";
import { useContext, useEffect, useState } from "react";
import { LoginContext } from "../App";

function Notifications({ setreportsNotifications, reportsNotifications, requestsNotifications, setrequestsNotifications }) {
  const [userID] = useContext(LoginContext);

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
        `https://kausupportapi.azurewebsites.net/api/TechnicalMember_/GetReportsNotificationsByUserId?User_Id=${userID}`,
        requestOptions
      );

      if (response.ok) {
        const result = await response.json();
        setreportsNotifications(result);
      } else if (response.status === 400) {
      } else {
        alert("An error occurred. Please try again.");
      }
    } catch (error) {
      console.log("error", error);
      alert("An error occurred. Please check your connection and try again.");
    }
  }

  useEffect(() => {
    getRequestsNotifications();
  }, [requestsNotifications]);

  async function getRequestsNotifications() {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    try {
      const response = await fetch(
        `https://kausupportapi.azurewebsites.net/api/TechnicalMember_/GetRequestsNotificationsByUserId?User_Id=${userID}`,
        requestOptions
      );

      if (response.ok) {
        const result = await response.json();
        setrequestsNotifications(result);
      } else if (response.status === 400) {
      } else {
        alert("An error occurred. Please try again.");
      }
    } catch (error) {
      console.log("error", error);
      alert("An error occurred. Please check your connection and try again.");
    }
  }
  return <div></div>;
}

export default Notifications;
